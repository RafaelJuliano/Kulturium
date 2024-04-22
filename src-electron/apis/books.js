import CHANNELS from "src-electron/channels";
import { safeIpcInvoke } from "src-electron/electron-utils";

export default {
  async saveBook(data, isUpsert) {
    return safeIpcInvoke(CHANNELS.BOOKS.SAVE, data, isUpsert);
  },
  async searchAuthors(author) {
    return safeIpcInvoke(CHANNELS.BOOKS.SEARCH_AUTHORS, author);
  },

  async searchPublishers(publisher) {
    return safeIpcInvoke(CHANNELS.BOOKS.SEARCH_PUBLISHER, publisher);
  },
  async searchClasses(className) {
    return safeIpcInvoke(CHANNELS.BOOKS.SEARCH_CLASSES, className);
  },
  async getSequence() {
    return safeIpcInvoke(CHANNELS.BOOKS.GET_SEQUENCE);
  },
  async checkSequence(id) {
    return safeIpcInvoke(CHANNELS.BOOKS.CHECK_SEQUENCE, id);
  },
  async searchBooks(filters) {
    return safeIpcInvoke(CHANNELS.BOOKS.SEARCH, filters);
  },
  async lookupBook(id) {
    return safeIpcInvoke(CHANNELS.BOOKS.LOOKUP, id);
  },
  async deleteBook(id) {
    return safeIpcInvoke(CHANNELS.BOOKS.DELETE, id);
  },
  async importBook(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      return safeIpcInvoke(CHANNELS.BOOKS.IMPORT, fileContent);
    };
    reader.readAsText(file);
  },
};
