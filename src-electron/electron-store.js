import path from "path";
import { app, remote } from "electron";
import fs from "fs";

function getFile(fileName, defaults = {}) {
  const userDataPath = (app || remote.app).getPath("userData");
  const filePath = path.join(userDataPath, fileName + ".json");

  console.log({
    userDataPath,
    filePath,
  });

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
