import path from "path";
import { app } from "electron";
import fs from "fs";

export const getSystemFolderPath = (fileName) => {
  if (process.platform === "win32") {
    const globalStoreDirPath = path.resolve(
      process.env.APP_WINDOWS_DATA_FOLDER,
      app.getName()
    );
    if (fs.existsSync(globalStoreDirPath)) {
      app.setPath("appData", globalStoreDirPath);
    } else {
      try {
        fs.mkdirSync(globalStoreDirPath, { recursive: true });
        console.log("Folder created successfully!");
      } catch (err) {
        console.error("Error creating folder:", err);
        app.setPath("appData", app.getPath("appData"));
      }
    }
  }
  const systemFolder = app.getPath("appData");
  console.log({ systemFolder });
  return path.join(systemFolder, fileName || ".");
};

Object.defineProperty(String.prototype, "capitalize", {
  value: function ({ eachWord }) {
    if (eachWord) {
      return this.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});
