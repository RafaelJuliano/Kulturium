export default {
  name: "1713105626703-create-books-table",
  operations: {
    up: async (db) => {
      return db.run(
        `CREATE TABLE books (
          id INTEGER PRIMARY KEY,
          title TEXT NOT NULL,
          author TEXT,
          edition INTEGER,
          volume INTEGER,
          year INTEGER,
          num_pages INTEGER,
          publisher TEXT,
          isbn TEXT,
          cdd TEXT,
          cdu TEXT,
          class TEXT
      );`
      );
    },
    down: async (db) => {
      return db.run(`DROP TABLE books`, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    },
  },
};
