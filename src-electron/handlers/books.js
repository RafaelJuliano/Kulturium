import CHANNELS from "src-electron/channels";
import {
  save,
  search,
  get,
  searchAuthors,
  searchClasses,
  searchPublishers,
  getSequence,
  checkSequence,
} from "src-electron/services/books";

export default {
  [CHANNELS.BOOKS.SAVE]: save,
  [CHANNELS.BOOKS.SEARCH]: search,
  [CHANNELS.BOOKS.LOOKUP]: get,
  [CHANNELS.BOOKS.SEARCH_AUTHORS]: searchAuthors,
  [CHANNELS.BOOKS.SEARCH_PUBLISHER]: searchPublishers,
  [CHANNELS.BOOKS.SEARCH_CLASSES]: searchClasses,
  [CHANNELS.BOOKS.GET_SEQUENCE]: getSequence,
  [CHANNELS.BOOKS.CHECK_SEQUENCE]: checkSequence,
};
