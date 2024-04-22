import { ipcRenderer } from "electron";
import CHANNELS from "src-electron/channels";

export default {
  messages: (callback) => ipcRenderer.on(CHANNELS.MAIN.MESSAGES, callback),
};
