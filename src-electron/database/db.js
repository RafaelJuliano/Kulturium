import sqlite3 from "sqlite3";
import { getSystemFolderPath } from "src-electron/electron-utils";
import { Migrator } from "./migrator";

export class MuseDB {
  async initialize() {
    this.connection = this.getConnection();
    this.connection.run('PRAGMA encoding = "UTF-8";');
    await this.runMigrations();
  }

  async runMigrations() {
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

  run(command) {
    if (!this.connection) {
      throw new Error("Database should be initialized");
    }
    return new Promise((resolve, reject) => {
      this.connection.run(command, (err, row) => {
        if (err) {
          console.error("Failed to execute command", command, err.message);
          reject(err);
        }
        this.connection.close;
        resolve(row);
      });
    });
  }

  async batchExecute(operationsList) {
    try {
      await this.run("BEGIN TRANSACTION");

      for (const [query, binds] of operationsList) {
        await this.execute(query, binds);
      }
      await this.run("COMMIT");
    } catch (error) {
      await this.run("ROLLBACK");
      console.log("Unable to finish batch operation", error.message);
      throw new Error("Unable to finish batch operation.");
    }
  }
}
