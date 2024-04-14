import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import path from "path";
import os from "os";
import store from "./electron-store";
import { MuseDB } from "./database/db";
import booksApi from "./apis/books";
import { getDb } from "./database/db-provider";

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow;
const db = getDb();

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
      nodeIntegration: true,
      sandbox: false,
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle(
  booksApi.channels.SAVE,
  booksApi.handlers[booksApi.channels.SAVE]
);

ipcMain.handle(
  booksApi.channels.SEARCH_AUTHORS,
  booksApi.handlers[booksApi.channels.SEARCH_AUTHORS]
);

db.initialize().then(() => {
  console.log("Database Initialized");
});
