import { MuseDB } from "./db";

let db;

export const getDb = () => {
  if (!db) {
    db = new MuseDB();
  }
  return db;
};
