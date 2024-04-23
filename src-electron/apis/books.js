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
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result;
      const decoder = new TextDecoder("utf-8");
      const fileContent = decoder.decode(buffer);
      return safeIpcInvoke(CHANNELS.BOOKS.IMPORT, fileContent);
    };
    reader.readAsArrayBuffer(file);
  },
  async downloadCsvExample() {
    return safeIpcInvoke(CHANNELS.BOOKS.DOWNLOAD_CSV_EXAMPLE);
  },
  async downloadBooks(type = "xlsx") {
    return safeIpcInvoke(CHANNELS.BOOKS.DOWNLOAD, type);
  },
};
