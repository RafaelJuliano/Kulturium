import { getDb } from "src-electron/database/db-provider";

export const searchClasses = async (_event, className = "") => {
  const query = `
    SELECT DISTINCT class FROM books WHERE LOWER(class) LIKE '%' || LOWER(?) || '%' ORDER BY class;
    `;
  const rows = await getDb().execute(query, className);
  return rows.map((row) => row.class);
};
