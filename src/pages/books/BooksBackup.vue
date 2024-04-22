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
        <q-form @submit="sendFileToElectron" class="flex column">
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
    </div>
  </q-page>
</template>

<script>
export default {
  name: "BooksBackup",
  data() {
    return {
      uploadedFile: null,
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
      const blob = new Blob([doc], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exemplo-livros.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>
