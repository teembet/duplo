/* eslint-disable @typescript-eslint/no-explicit-any */
import * as localforage from "localforage";

import { IuseAppStorage } from ".";

// Create Config
localforage.config({
  name: "mss",
  storeName: "mss_app", // Should be alphanumeric, with underscores.
  description: "Storage site for mss app",
});

/** Use IndexDB for storage */
const useAppStorage = (): IuseAppStorage => {
  // Add Item to store
  const addToStore = async (key: string, value: unknown) => {
    try {
      const result = await localforage.setItem(key, value);
      // This code runs once the value has been loaded from the offline store.
      return !!result;
    } catch (err) {
      // This code runs if there were any errors.
      return null;
    }
  };

  // Get item from store
  const getFromStore = async (key: string) => {
    try {
      const result = await localforage.getItem(key);
      // This code runs once the value has been loaded
      // from the offline store.
      return result;
    } catch (err) {
      // This code runs if there were any errors.
      return null;
    }
  };

  // Remove item from store
  const removeFromStore = async (key: string) => {
    try {
      await localforage.removeItem(key);
      // This code runs once the value has been loaded
      // from the offline store.
      return true;
    } catch (err) {
      // This code runs if there were any errors.
      return null;
    }
  };

  const getStore = async () => {
    try {
      const keys = await localforage.keys();

      // Construct store states
      const storeData = keys?.reduce((acc, key) => {
        acc[key] = getFromStore(key);
        return acc;
      }, {});

      return storeData;
    } catch (err) {
      // This code runs if there were any errors.
      return null;
    }
  };

  // Empty store
  const clearStore = async () => {
    try {
      await localforage.clear();
    } catch (error) {
      return null;
    }
  };

  return {
    addToStore,
    getFromStore,
    clearStore,
    removeFromStore,
    getStore,
  };
};

export default useAppStorage;
