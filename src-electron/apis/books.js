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
  async getSequence() {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(CHANNELS.BOOKS.GET_SEQUENCE);
      return success;
    }
    return false;
  },
  async checkSequence(id) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(
        CHANNELS.BOOKS.CHECK_SEQUENCE,
        id
      );
      return success;
    }
    return false;
  },
  async searchBooks(filters) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(CHANNELS.BOOKS.SEARCH, filters);
      return success;
    }
    return false;
  },
  async lookupBook(id) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(CHANNELS.BOOKS.LOOKUP, id);
      return success;
    }
    return false;
  },
};
