import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("storeApi", {
  async setStoreData(fileName, key, value) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(
        "set-store-data",
        fileName,
        key,
        value
      );
      return success;
    }
    return false;
  },
  async getStoreData(fileName, key) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke("get-store-data", fileName, key);
      return success;
    }
    return false;
  },
});
