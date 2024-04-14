import sqlite3 from "sqlite3";
import { getSystemFolderPath } from "../electron-utils";
import { Migrator } from "./migrator";

export class MuseDB {
  constructor() {
    this.runMigrations().then(() => {
      console.log("Migrations executed successfully.");
    });
  }

  async runMigrations() {
    const migrator = await new Migrator(this.getConnection()).build();
    await migrator.up();
  }

  getConnection() {
    const db = new sqlite3.Database(
      getSystemFolderPath("database.sqlite"),
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
