<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">
        Importar / Exportar Livros
      </h6>
    </div>
    <q-separator color="primary"></q-separator>
    <div class="q-pa-md">
      <q-card flat bordered class="my-card q-pa-md">
        <text-h5 class="text-h5 text-primary" color="primary">Importar</text-h5>
        <q-form @submit="sendFileToElectron" class="flex column q-mt-md">
          <q-file
            v-model="uploadedFile"
            accept=".csv"
            max-file-size="2097152"
            @rejected="onRejected"
            label="Carregar planilha"
            filled
            class="q-my-sm"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" class="cursor-pointer" />
            </template>
            <template v-slot:label>
              <div class="text-center">
                Arraste e solte seu arquivo aqui ou clique para selecionar
              </div>
            </template>
          </q-file>
          <q-btn
            :disable="!uploadedFile"
            type="submit"
            color="primary"
            class="q-my-sm"
            >Iniciar importação</q-btn
          >
          <q-btn class="q-my-sm" @click="downloadExample">Baixar Exemplo</q-btn>
          <q-banner class="q-my-none text-grey-6" dense inline-actions>
            Certifique-se de que o arquivo importado siga o mesmo formato
            fornecido no exemplo.
          </q-banner>
        </q-form>
      </q-card>

      <q-separator class="q-my-md"></q-separator>

      <q-card flat bordered class="my-card q-pa-md">
        <text-h5 class="text-h5 text-primary" color="primary">Exportar</text-h5>
        <div class="flex column q-mt-md">
          <q-select
            v-model="selectedBookType"
            :options="bookTypeOptions"
            label="Escolha o formato de arquivo"
            outlined
            dense
          />
          <q-btn class="q-my-sm" color="primary" @click="download"
            >Baixar Livros</q-btn
          >
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "BooksBackup",
  data() {
    return {
      uploadedFile: null,
      selectedBookType: { label: "Planilha do Excel - XLSX", value: "xlsx" },
      bookTypeOptions: [
        { label: "Planilha do Excel - XLSX", value: "xlsx" },
        { label: "Valores separados por vírgula - CSV", value: "csv" },
      ],
    };
  },
  methods: {
    async sendFileToElectron() {
      if (this.uploadedFile) {
        window.booksApi.importBook(this.uploadedFile);
      }
    },
    onRejected() {
      this.$q.notify({
        message: "O arquivo deve ser do tipo CSV e não deve ultrapassar 2Mb!",
        type: "negative",
      });
    },
    async downloadExample() {
      const doc = await window.booksApi.downloadCsvExample();
      this.createDownloadFileLink(doc, "exemplo-importacao-livros.csv");
    },
    async download() {
      const type = this.selectedBookType.value;
      const doc = await window.booksApi.downloadBooks(type);
      this.createDownloadFileLink(
        doc,
        `backup-livros-${new Date().getTime()}.${type.toLowerCase()}`
      );
    },
    createDownloadFileLink(file, name) {
      const blob = new Blob([file], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>
