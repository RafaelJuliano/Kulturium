import { getDb } from "src-electron/database/db-provider";

export const checkSequence = async (_event, id) => {
  const query = `
  SELECT id FROM books WHERE id = ?
  `;
  const rows = await getDb().execute(query, id);
  return rows.at(0)?.id;
};
