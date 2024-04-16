import { ipcRenderer } from "electron";
import CHANNELS from "src-electron/channels";

export default {
  async createBook(data) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(CHANNELS.BOOKS.SAVE, data);
      return success;
    }
    return false;
  },
  async searchAuthors(author) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(
        CHANNELS.BOOKS.SEARCH_AUTHORS,
        author
      );
      return success;
    }
    return false;
  },
};
