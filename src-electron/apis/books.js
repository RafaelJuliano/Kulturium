import { ipcRenderer } from "electron";
import CHANNELS from "src-electron/channels";

async function safeIpcInvoke(invokefn) {
  if (ipcRenderer) {
    const success = await invokefn();
    return success;
  }
  return false;
}

export default {
  async saveBook(data, isUpsert) {
    return safeIpcInvoke(() =>
      ipcRenderer.invoke(CHANNELS.BOOKS.SAVE, data, isUpsert)
    );
  },
  async searchAuthors(author) {
    return safeIpcInvoke(() =>
      ipcRenderer.invoke(CHANNELS.BOOKS.SEARCH_AUTHORS, author)
    );
  },

  async searchPublishers(publisher) {
    return safeIpcInvoke(() =>
      ipcRenderer.invoke(CHANNELS.BOOKS.SEARCH_PUBLISHER, publisher)
    );
  },
  async searchClasses(className) {
    return safeIpcInvoke(() =>
      ipcRenderer.invoke(CHANNELS.BOOKS.SEARCH_CLASSES, className)
    );
  },
  async getSequence() {
    return safeIpcInvoke(() => ipcRenderer.invoke(CHANNELS.BOOKS.GET_SEQUENCE));
  },
  async checkSequence(id) {
    return safeIpcInvoke(() =>
      ipcRenderer.invoke(CHANNELS.BOOKS.CHECK_SEQUENCE, id)
    );
  },
  async searchBooks(filters) {
    return safeIpcInvoke(() =>
      ipcRenderer.invoke(CHANNELS.BOOKS.SEARCH, filters)
    );
  },
  async lookupBook(id) {
    return safeIpcInvoke(() => ipcRenderer.invoke(CHANNELS.BOOKS.LOOKUP, id));
  },
  async deleteBook(id) {
    return safeIpcInvoke(() => ipcRenderer.invoke(CHANNELS.BOOKS.DELETE, id));
  },
};
