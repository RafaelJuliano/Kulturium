import sqlite3 from "sqlite3";
import { getSystemFolderPath } from "../electron-utils";

export class MuseDB {
  constructor() {
    this.runMigrations();
  }

  async runMigrations() {
    await this.execute(`
      CREATE TABLE IF NOT EXISTS test_table (
        value INTEGER
      );
   `);
  }

  getConnection() {
    const db = new sqlite3.Database(
      getSystemFolderPath("database.db"),
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Connected to the database.");
        }
      }
    );
    return db;
  }

  execute(query) {
    return new Promise((resolve, reject) => {
      const connection = this.getConnection();
      connection.all(query, (err, row) => {
        if (err) {
          console.error("Failed to execute query", query, err.message);
          reject(err);
        }
        connection.close;
        resolve(row);
      });
    });
  }
}
