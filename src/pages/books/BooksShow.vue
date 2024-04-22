<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Detalhes do Livro</h6>
    </div>
    <q-separator color="primary" spaced="sm"></q-separator>
    <BookForm
      :initialData="selectedBook"
      :readonly="readonly"
      isUpdate
      @reset="changeState"
      @bookUpdated="onBookUpdated"
    >
      <div v-if="readonly" id="teste" class="row">
        <div>
          <q-btn label="Editar" color="primary" @click="changeState"></q-btn>
          <q-btn
            label="Deletar"
            color="negative"
            class="q-ml-sm"
            @click="deleteBook = true"
          ></q-btn>
        </div>
        <q-btn
          label="Voltar"
          color="primary"
          flat
          class="q-ml-auto"
          @click="goBack"
        ></q-btn>
      </div>
      <div v-else>
        <q-btn label="Salvar" type="submit" color="primary"></q-btn>
        <q-btn
          label="Cancelar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        ></q-btn>
      </div>
    </BookForm>
    <q-dialog v-model="deleteBook" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white"></q-avatar>
          <span class="q-ml-sm"
            >Tem certeza que deseja apagar o livro:
            <strong>{{ selectedBook.title }}</strong>
            ?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup></q-btn>
          <q-btn
            flat
            label="Sim"
            color="primary"
            v-close-popup
            @click="onDelete"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import BookForm from "src/components/BookForm.vue";

export default {
  components: {
    BookForm,
  },

  data() {
    return {
      selectedBook: {},
      readonly: true,
      deleteBook: false,
    };
  },
  async mounted() {
    await this.fetchBookData();
  },

  methods: {
    async fetchBookData() {
      this.selectedBook = await window.booksApi.lookupBook(
        this.$route.params.id
      );
    },
    changeState() {
      this.readonly = !this.readonly;
    },
    goBack() {
      this.$router.go(-1);
    },
    onBookUpdated() {
      this.fetchBookData();
    },
    async onDelete() {
      try {
        await window.booksApi.deleteBook(this.selectedBook.id);
        this.$q.notify(`Livro deletado com sucesso!`);
        this.goBack();
      } catch {
        this.$q.notify({
          message: "Ops, algo deu errado!",
          type: "negative",
        });
      }
    },
  },
};
</script>
