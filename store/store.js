import { createStore, action, computed, thunk } from 'easy-peasy';
import { getVaultByUserId } from '@/lib/db';

const store = createStore({
  loadingVault: true,
  setLoadingVault: action((state, payload) => {
    state.loadingVault = payload;
  }),

  vaults: [],
  vaultsCopy: [],

  addVaultCopy: action((state, payload) => {
    state.vaultsCopy.push(payload);
  }),

  addVault: action((state, payload) => {
    state.vaults.push(payload);
  }),

  setVault: action((state, payload) => {
    state.vaults = payload;
  }),

  flushVaults: action((state) => {
    state.vaults = [];
  }),

  deleteVault: computed((state, id) => {
    state.vaults = state.vaults.filter((vault) => vault.vid !== id);
  }),

  getAllVaults: thunk(async (actions, userId) => {
    actions.flushVaults();
    getVaultByUserId(userId)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          actions.addVault(doc.data());
          actions.addVaultCopy(doc.data());
        });
        actions.setLoadingVault(false);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  })
});

export default store;
