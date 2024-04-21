import { getDb } from "src-electron/database/db-provider";

export const search = async (_event, params) => {
  const whereClauses = [];
  const binds = [];

  if (params?.like) {
    whereClauses.push(`(
    id LIKE '%' || ? || '%'
    OR LOWER(title) LIKE '%' || LOWER(?) || '%'
    OR LOWER(isbn) LIKE '%' || LOWER(?) || '%'
    OR LOWER(cdd) LIKE '%' || LOWER(?) || '%'
    OR LOWER(cdu) LIKE '%' || LOWER(?) || '%'
    )`);
    binds.push(...Array(5).fill(params.like));
  }

  const where =
    whereClauses.length > 0 ? ` WHERE ${whereClauses.join(" AND ")}` : "";

  const query = `
      SELECT * FROM books
      ${where}
    `;

  const countQuery = `
      SELECT count(id) as count FROM
      (${query})
    `;

  const withPaginationQuery = `
    SELECT * FROM
    (${query})
    ORDER BY ${params?.sort || "id"} ${params?.descending ? "DESC" : "ASC"}
    LIMIT ${params?.limit || 10}
    OFFSET ${params?.offset || 0}
  `;

  return {
    totalItems: (await getDb().execute(countQuery, binds))[0].count,
    data: await getDb().execute(withPaginationQuery, binds),
  };
};
