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
        .map((key) => `${key}=excluded.${key}`)
        .join(", ")}
      WHERE id = excluded.id;
    `
        : ""
    }
  `;

  await getDb().execute(query, binds);
};
