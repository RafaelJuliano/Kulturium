import { parse } from "csv-parse";
import { sendToRenderer } from "app/src-electron/electron-window";
import CHANNELS from "app/src-electron/channels";
import { getDb } from "src-electron/database/db-provider";

export const importBook = async (_event, fileContent) => {
  parse(fileContent, async (err, data) => {
    if (err) {
      console.error("Error processing the CSV:", err);
      sendToRenderer(CHANNELS.MAIN.MESSAGES, {
        message: "Não foi possível concluir a importação dos dados!",
        type: "negative",
      });
      return;
    }
    sendToRenderer(
      CHANNELS.MAIN.MESSAGES,
      `
      Iniciando o processamento de ${data.length - 1} itens.\n
      Você será notificado quando finalizado.
      `
    );
    batchCreate(data.slice(1));
  });
};

const batchCreate = async (data) => {
  const cleanedData = clearData(data);
  const chunkedData = chunkArray(cleanedData, 100);
  const operationsList = [];

  chunkedData.forEach((chunk) => {
    const { query, binds } = buildInsertQuery(chunk);

    operationsList.push([query, binds.flat()]);
  });

  try {
    await getDb().batchExecute(operationsList);
    sendToRenderer(
      CHANNELS.MAIN.MESSAGES,
      `
      Importação de livros concluída com sucesso!
      `
    );
  } catch {
    sendToRenderer(CHANNELS.MAIN.MESSAGES, {
      message: "Não foi possível concluir a importação dos dados!",
      type: "negative",
    });
  }
};

const clearData = (data) => {
  return data
    .filter((row) => row.length >= 12 && !!row[0] && !!row[1])
    .map((row) => row.slice(0, 12));
};

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

const buildInsertQuery = (data) => {
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
  const rows = data.map(() => `(${keys.map(() => "?").join()})\n`).join();
  const query = `
    INSERT INTO books
      (${keys.join(", ")})
    VALUES
      ${rows}
    ON CONFLICT(id) DO UPDATE SET
      ${keys
        .slice(1)
        .map((key) => `${key}=excluded.${key}`)
        .join(", ")}
    WHERE id = excluded.id;
    `;
  const binds = data.flat();

  return { query, binds };
};
