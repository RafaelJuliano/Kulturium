import { getDb } from "src-electron/database/db-provider";

export const searchAuthors = async (_event, author = "") => {
  const query = `
    SELECT DISTINCT author FROM books WHERE LOWER(author) LIKE '%' || LOWER(?) || '%' ORDER BY author;
  `;
  const rows = await getDb().execute(query, author);
  return rows.map((row) => row.author);
};
