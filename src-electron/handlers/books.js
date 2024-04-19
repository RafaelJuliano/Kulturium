import CHANNELS from "src-electron/channels";
import { getDb } from "src-electron/database/db-provider";

const save = async (_event, data, upsert) => {
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
    data.title?.trim(),
    data.author?.trim().capitalize({ eachWord: true }),
    data.edition?.trim(),
    data.volume?.trim(),
    data.year?.trim(),
    data.numPages?.trim(),
    data.publisher?.trim().capitalize({ eachWord: true }),
    data.isbn?.trim(),
    data.cdd?.trim(),
    data.cdu?.trim(),
    data.class?.trim().toUpperCase(),
  ];

  const upsertBinds = [];

  if (data.id && upsert) {
    upsertBinds.push(...binds.slice(1), data.id);
  }

  const query = `
    INSERT INTO books (
      ${keys.join(", ")}
    )
    VALUES (${binds.map(() => "?").join()})
    ${
      upsert
        ? `
      ON CONFLICT(id) DO UPDATE SET
      ${keys
        .slice(1)
        .map((key) => `${key}=?`)
        .join(", ")}
      WHERE id = ?;
    `
        : ""
    }
  `;

  await getDb().execute(query, [...binds, ...upsertBinds]);
};

const searchAuthors = async (_event, author = "") => {
  const query = `
    SELECT DISTINCT author FROM books WHERE LOWER(author) LIKE '%' || LOWER(?) || '%' ORDER BY author;
  `;
  const rows = await getDb().execute(query, author);
  return rows.map((row) => row.author);
};

const searchPublisher = async (_event, publisher = "") => {
  const query = `
    SELECT DISTINCT publisher FROM books WHERE LOWER(publisher) LIKE '%' || LOWER(?) || '%' ORDER BY publisher;
    `;
  const rows = await getDb().execute(query, publisher);
  return rows.map((row) => row.publisher);
};

const serchClasses = async (_event, className = "") => {
  const query = `
    SELECT DISTINCT class FROM books WHERE LOWER(class) LIKE '%' || LOWER(?) || '%' ORDER BY class;
    `;
  const rows = await getDb().execute(query, className);
  return rows.map((row) => row.class);
};

const getSequence = async () => {
  const query = `
  SELECT id FROM books ORDER BY id DESC LIMIT 1;
  `;
  const rows = await getDb().execute(query);
  return rows?.at(0)?.id || 0;
};

const checkSequence = async (_event, id) => {
  const query = `
  SELECT id FROM books WHERE id = ?
  `;
  const rows = await getDb().execute(query, id);
  return rows.at(0)?.id;
};

const search = async (_event, params) => {
  const whereClauses = [];
  const binds = [];

  if (params?.title) {
    where.push(`LOWER(title) LIKE '%' || LOWER(?) || '%'`);
    binds.push(params.title);
  }

  const where = whereClauses.length > 0 ? ` WHERE ${where.join(" AND ")}` : "";

  const query = `
      SELECT * FROM books
      ${where}
    `;

  const withPaginationQuery = `
    SELECT * FROM
    (${query})
    ORDER BY ${params?.sort || "id"} ${params?.descending ? "DESC" : "ASC"}
    LIMIT ${params?.limit || 10}
    OFFSET ${params?.offset || 0}
  `;

  return getDb().execute(withPaginationQuery, binds);
};

export default {
  [CHANNELS.BOOKS.SAVE]: save,
  [CHANNELS.BOOKS.SEARCH_AUTHORS]: searchAuthors,
  [CHANNELS.BOOKS.SEARCH_PUBLISHER]: searchPublisher,
  [CHANNELS.BOOKS.SEARCH_CLASSES]: serchClasses,
  [CHANNELS.BOOKS.GET_SEQUENCE]: getSequence,
  [CHANNELS.BOOKS.CHECK_SEQUENCE]: checkSequence,
  [CHANNELS.BOOKS.SEARCH]: search,
};
