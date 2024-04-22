import { parse } from "csv-parse";
import { sendToRenderer } from "app/src-electron/electron-window";
import CHANNELS from "app/src-electron/channels";

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
  });
};
