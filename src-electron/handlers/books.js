import CHANNELS from "src-electron/channels";
import { getDb } from "src-electron/database/db-provider";

const save = async (_event, data) => {
  const keys = [
    "id",
    "title",
    "author",
    "edition",
    "volume",
    "year",
    "num_pages",
    "publisher",
    "isbn",
    "cdd",
    "cdu",
    "class",
  ];
  const binds = [
    data.id,
    data.title,
    data.author,
    data.edition,
    data.volume,
    data.year,
    data.numPages,
    data.publisher,
    data.isbn,
    data.cdd,
    data.cdu,
    data.class,
  ];

  const upsertBinds = [];

  if (data.id) {
    upsertBinds.push(...binds.slice(1), data.id);
  }

  const query = `
    INSERT INTO books (
      ${keys.join(", ")}
    )
    VALUES (${binds.map(() => "?").join()})
    ON CONFLICT(id) DO UPDATE SET
    ${keys
      .slice(1)
      .map((key) => `${key}=?`)
      .join(", ")}
    WHERE id = ?;
  `;

  await getDb().execute(query, [...binds, ...upsertBinds]);
};

const searchAuthors = async (_event, author = "") => {
  const query = `
    SELECT DISTINCT author FROM books WHERE author LIKE '%' || ? || '%' ORDER BY author;
  `;
  const rows = await getDb().execute(query, author);
  return rows.map((row) => row.author);
};

export default {
  [CHANNELS.BOOKS.SAVE]: save,
  [CHANNELS.BOOKS.SEARCH_AUTHORS]: searchAuthors,
};
