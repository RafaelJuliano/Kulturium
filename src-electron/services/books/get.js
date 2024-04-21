import { getDb } from "src-electron/database/db-provider";

export const get = async (_event, id) => {
  const query = `
      SELECT * FROM books WHERE id = ?
    `;

  const rows = await getDb().execute(query, id);
  if (rows.length > 0) {
    return rows[0];
  }
};
