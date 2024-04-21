import { getDb } from "src-electron/database/db-provider";

export const save = async (_event, data, upsert) => {
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
    data.num_pages?.trim(),
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
