import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createVault(data) {
  const vaultRef = firestore.collection('vault').doc();
  const vid = vaultRef.id;
  const newVault = { ...data, vid };
  vaultRef.set(newVault);
  return vid;
}

export function getVaultByUserId(userId = '') {
  return firestore.collection('vault').where('userId', '==', userId).get();
}

export function getVaultById(vid) {
  return firestore.collection('vault').doc(vid).get();
}

export function deleteVaultById(vid) {
  return firestore.collection('cities').doc(vid).delete();
}
