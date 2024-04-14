import sqlite3 from "sqlite3";
import { getSystemFolderPath } from "../electron-utils";
import { Migrator } from "./migrator";

export class MuseDB {
  async initialize() {
    this.connection = this.getConnection();
    await this.runMigrations();
  }

  async runMigrations(connection) {
    const migrator = await new Migrator(this.connection).build();
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

  execute(query, binds) {
    if (!this.connection) {
      throw new Error("Database should be initialized");
    }
    return new Promise((resolve, reject) => {
      this.connection.all(query, binds, (err, row) => {
        if (err) {
          console.error("Failed to execute query", query, err.message);
          reject(err);
        }
        this.connection.close;
        resolve(row);
      });
    });
  }
}
