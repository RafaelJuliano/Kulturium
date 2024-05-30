import path from "path";
import fs from "fs";
import { v4 as uuidV4 } from "uuid";
import { compressImage } from "src-electron/services/shared/compressImage";
import { getSystemFolderPath } from "src-electron/electron-utils";

export const saveImages = async (_event, bookId, imagesPaths) => {
  const bookFolder = path.join(getSystemFolderPath(), String(bookId));

  for (const imagePath of imagesPaths) {
    const outputPath = path.join(getBookFolder(bookId), `${uuidV4()}.jpg`);
    await compressImage(imagePath, outputPath, 50);
  }
};

const getBookFolder = (bookId) => {
  const booksFolder = path.join(getSystemFolderPath(), "books");
  if (!fs.existsSync(booksFolder)) {
    fs.mkdirSync(booksFolder, { recursive: true });
  }

  const bookIdFolder = path.join(booksFolder, String(bookId));
  if (!fs.existsSync(bookIdFolder)) {
    fs.mkdirSync(bookIdFolder, { recursive: true });
  }

  return bookIdFolder;
};
