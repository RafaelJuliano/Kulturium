import { utils, write } from "xlsx";

export const downloadCsvExample = async (_event) => {
  const worksheet = utils.json_to_sheet([
    {
      REGISTRO: 1,
      TITULO: "Livro Exemplo",
      AUTOR: "A.D Exemplo",
      EDICAO: 1,
      VOLUME: 1,
      ANO: 2024,
      NUM_PAGINAS: 200,
      EDITORA: "Editora Exemplo",
      ISBN: "111222",
      CDD: "222.33",
      CDU: "222:333",
      CLASSE: "EXP",
    },
  ]);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "example");

  return write(workbook, { bookType: "csv", type: "string" });
};
