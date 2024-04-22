import { getDb } from "src-electron/database/db-provider";

export const save = async (_event, data, isUpsert) => {
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
    data.edition,
    data.volume,
    data.year,
    data.num_pages,
    data.publisher?.trim().capitalize({ eachWord: true }),
    data.isbn?.trim(),
    data.cdd?.trim(),
    data.cdu?.trim(),
    data.class?.trim().toUpperCase(),
  ];

  const upsertBinds = [];

  if (data.id && isUpsert) {
    upsertBinds.push(...binds.slice(1), data.id);
  }

  const query = `
    INSERT INTO books (
      ${keys.join(", ")}
    )
    VALUES (${binds.map(() => "?").join()})
    ${
      isUpsert
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
