import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createVault(data) {
  const vault = firestore.collection('vault').doc();
  vault.set(data);
  return vault;
}