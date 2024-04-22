import { getDb } from "src-electron/database/db-provider";

export const deleteBook = async (_event, id) => {
  const query = `
      DELETE FROM books WHERE id = ?
    `;

  await getDb().execute(query, id);
};
