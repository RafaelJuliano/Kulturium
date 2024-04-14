exports.up = function (db) {
  return new Promise((resolve, reject) => {
    db.run(
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
    );`,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

exports.down = function (db) {
  return new Promise((resolve, reject) => {
    db.run(`DROP TABLE books`, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
