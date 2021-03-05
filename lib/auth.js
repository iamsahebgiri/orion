import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';

import firebase from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({
    email: false,
    google: false,
    facebook: false,
    github: false,
    user: false
  });

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      setLoading({ ...loading, user: false });
      return user;
    } else {
      setUser(false);

      setLoading({ ...loading, user: false });
      return false;
    }
  };

  const signinWithEmail = (email, password) => {
    setLoading({ ...loading, email: true });
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push('/dashboard');
        setLoading({ ...loading, email: false });
      });
  };

  const signinWithGitHub = (redirect) => {
    setLoading({ ...loading, github: true });
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
        setLoading({ ...loading, github: false });
      });
  };

  const signinWithFacebook = (redirect) => {
    setLoading({ ...loading, facebook: true });
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
        setLoading({ ...loading, github: false });
      });
  };

  const signinWithGoogle = (redirect) => {
    setLoading({ ...loading, google: true });
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
        setLoading({ ...loading, github: false });
      });
  };

  const signout = () => {
    Router.push('/');

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGitHub,
    signinWithGoogle,
    signinWithFacebook,
    signout
  };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    username: user.email.split("@")[0],
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};
