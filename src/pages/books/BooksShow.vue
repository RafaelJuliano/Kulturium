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
          <q-btn label="Deletar" color="negative" class="q-ml-sm"></q-btn>
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
  },
};
</script>
