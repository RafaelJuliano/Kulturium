import path from "path";
import { app } from "electron";
import fs from "fs";

function getFile(fileName, defaults = {}) {
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
  const userDataPath = app.getPath("appData");

  const filePath = path.join(userDataPath, fileName + ".json");

  const data = parseDataFile(filePath, defaults);

  return {
    get(key) {
      return data[key];
    },
    set(key, value) {
      data[key] = value;
      fs.writeFileSync(filePath, JSON.stringify(data));
    },
  };
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return defaults;
  }
}

export default {
  getFile,
};
