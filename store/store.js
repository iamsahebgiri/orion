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

  updateVault: action((state, payload) => {
    const index = state.vaults.findIndex((vault) => vault.vid === payload.vid);
    state.vaults[index] = payload;
  }),

  deleteVault: action((state, vid) => {
    state.vaults = state.vaults.filter((vault) => vault.vid !== vid);
  }),

  getAllVaults: thunk(async (actions, userId) => {
    actions.flushVaults();
    actions.setLoadingVault(true);
    getVaultByUserId(userId)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          actions.addVault(doc.data());
          actions.addVaultCopy(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      })
      .finally(() => {
        actions.setLoadingVault(false);
      });
  })
});

export default store;
