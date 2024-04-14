import fs from "fs";
import path from "path";

export class Migrator {
  constructor(db) {
    this.db = db;
    this.migrationsPath = path.resolve("./src-electron/database/migrations/");
  }

  async build() {
    await this.createMigrationsTableIfNotExists();
    return this;
  }

  async up() {
    const files = fs.readdirSync(this.migrationsPath).sort();
    for (const file of files) {
      const migrationName = file.split(".")[0];
      const exists = await this.isMigrationExecuted(migrationName);
      if (!exists) {
        console.log(`Applying migration: ${file}`);
        const filePath = path.resolve(this.migrationsPath, file);
        await this.executeMigrationFile(filePath, "up");
        const query = `INSERT INTO migrations (migration) VALUES (?)`;
        this.db.run(query, [migrationName]);
      }
    }
  }

  async createMigrationsTableIfNotExists() {
    const query = `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        migration CHAR(255) NOT NULL,
        timestamp DATE NOT NULL DEFAULT CURRENT_DATE
      );
    `;
    return new Promise((resolve, reject) => {
      this.db.run(query, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  isMigrationExecuted(migrationName) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM migrations WHERE migration = ?`;
      this.db.get(query, [migrationName], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!row);
        }
      });
    });
  }

  executeMigrationFile(filePath, operation) {
    const migration = require(filePath);
    return migration[operation](this.db);
  }
}
