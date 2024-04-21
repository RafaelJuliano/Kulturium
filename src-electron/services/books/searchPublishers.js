import { getDb } from "src-electron/database/db-provider";

export const searchPublishers = async (_event, publisher = "") => {
  const query = `
    SELECT DISTINCT publisher FROM books WHERE LOWER(publisher) LIKE '%' || LOWER(?) || '%' ORDER BY publisher;
    `;
  const rows = await getDb().execute(query, publisher);
  return rows.map((row) => row.publisher);
};
