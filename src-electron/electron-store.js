import fs from "fs";
import { getSystemFolderPath } from "./electron-utils";

function getFile(fileName, defaults = {}) {
  const filePath = getSystemFolderPath(fileName + ".json");

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
