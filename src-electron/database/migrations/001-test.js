exports.up = function (db) {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS test_table (
        value INTEGER
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
    db.run(`DROP TABLE test_table`, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
