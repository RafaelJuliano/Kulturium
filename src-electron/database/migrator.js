import migrations from "./migrations";

export class Migrator {
  constructor(db) {
    this.db = db;
    this.migrations = migrations.sort((a, b) => a.name.localeCompare(b.name));
  }

  async build() {
    await this.createMigrationsTableIfNotExists();
    return this;
  }

  async up() {
    for (const { name, operations } of this.migrations) {
      const migrationName = name.split(".")[0];
      const exists = await this.isMigrationExecuted(migrationName);
      if (!exists) {
        console.log(`Applying migration: ${migrationName}`);
        await this.executeMigrationOperations(operations, "up");
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

  executeMigrationOperations(operations, operation) {
    return operations[operation](this.db);
  }
}
