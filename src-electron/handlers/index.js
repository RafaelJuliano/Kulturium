import { ipcMain } from "electron";
import channels from "src-electron/channels";
import booksHandler from "./books";

const handlers = {
  ...booksHandler,
};

Object.values(channels).forEach((module) => {
  Object.values(module).forEach((channel) => {
    handlers[channel] && ipcMain.handle(channel, handlers[channel]);
  });
});
