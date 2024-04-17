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

  async searchPublishers(publisher) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(
        CHANNELS.BOOKS.SEARCH_PUBLISHER,
        publisher
      );
      return success;
    }
    return false;
  },
  async searchClasses(className) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(
        CHANNELS.BOOKS.SEARCH_CLASSES,
        className
      );
      return success;
    }
    return false;
  },
};
