import { utils, write } from "xlsx";
import { getDb } from "src-electron/database/db-provider";

export const downloadBooks = async (_event, type) => {
  const query = "SELECT * FROM BOOKS";
  const data = await getDb().execute(query);
  const mappedData = data.map((row) => ({
    REGISTRO: row.id,
    TITULO: row.title,
    AUTOR: row.author,
    EDICAO: row.edition,
    VOLUME: row.volume,
    ANO: row.year,
    NUM_PAGINAS: row.num_pages,
    EDITORA: row.publisher,
    ISBN: row.isbn,
    CDD: row.cdd,
    CDU: row.cdu,
    CLASSE: row.class,
  }));

  const worksheet = utils.json_to_sheet(mappedData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "books");

  return write(workbook, {
    bookType: type === "csv" ? "csv" : "xlsx",
    type: type === "csv" ? "string" : "buffer",
  });
};
