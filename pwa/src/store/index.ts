import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import { ISettingsState } from "./modules/settings";

Vue.use(Vuex);

export const storageKey = "qrrw";

export const secureStorage = new SecureLS({ isCompression: false });

const initialStoreContent = secureStorage.get(storageKey);
export const initialUnencryptedStorage = initialStoreContent
  ? JSON.parse(initialStoreContent)
  : {};

export interface IRootState {
  settings: ISettingsState;
}

export default new Vuex.Store<IRootState>({
  plugins: [
    createPersistedState({
      key: storageKey,
      storage: {
        getItem: (key) => secureStorage.get(key),
        setItem: (key, value) => secureStorage.set(key, value),
        removeItem: (key) => secureStorage.remove(key),
      },
    }),
  ],
});
