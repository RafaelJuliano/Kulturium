import { contextBridge, ipcRenderer } from "electron";
import { getDb } from "../database/db-provider";

const channels = {
  SAVE: "books-save",
};

const api = {
  async createBook(data) {
    if (ipcRenderer) {
      const success = await ipcRenderer.invoke(channels.SAVE, data);
      return success;
    }
    return false;
  },
};

const handlers = {
  [channels.SAVE]: async (_event, data) => {
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
      data.title,
      data.author,
      data.edition,
      data.volume,
      data.year,
      data.bumPages,
      data.publisher,
      data.isbn,
      data.cdd,
      data.cdu,
      data.class,
    ];

    const upsertBinds = [];

    if (data.id) {
      upsertBinds.push(...binds.slice(1), data.id);
    }

    const query = `
      INSERT INTO books (
        ${keys.join(", ")}
      )
      VALUES (${binds.map(() => "?").join()})
      ON CONFLICT(id) DO UPDATE SET
      ${keys
        .slice(1)
        .map((key) => `${key}=?`)
        .join(", ")}
      WHERE id = ?;
    `;

    await getDb().execute(query, [...binds, ...upsertBinds]);
  },
};

export default {
  handlers,
  api,
  channels,
};