import { getDb } from "src-electron/database/db-provider";

export const getSequence = async () => {
  const query = `
  SELECT id FROM books ORDER BY id DESC LIMIT 1;
  `;
  const rows = await getDb().execute(query);
  return rows?.at(0)?.id || 0;
};
