import { app } from "electron";

import os from "os";
import "src-electron/handlers";
import { getDb } from "src-electron/database/db-provider";
import { createWindow } from "src-electron/electron-window";

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

const db = getDb();

app
  .whenReady()
  .then(() => {
    db.initialize();
  })
  .then(createWindow);

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
