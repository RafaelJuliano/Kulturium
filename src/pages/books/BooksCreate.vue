<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Cadastrar Livro</h6>
    </div>
    <q-separator color="primary" spaced="sm"></q-separator>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-sm">
      <div class="row q-gutter-sm q-my-sm justify-between">
        <q-input
          class="col"
          filled
          v-model="title"
          label="Título"
          labelColor="primary"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Título é obrigatório.']"
        ></q-input>

        <q-select
          filled
          v-model="author"
          use-input
          hide-selected
          fill-input
          @filter="filterFn"
          input-debounce="0"
          :options="authorsOptions"
          style="width: 250px; padding-bottom: 32px"
          emit-value
          map-options
          label="Autor"
          labelColor="primary"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="row q-gutter-sm q-my-sm justify-between">
        <q-input
          class="col"
          filled
          v-model="publisher"
          label="Editora"
          labelColor="primary"
          lazy-rules
        ></q-input>

        <q-input
          class="col"
          filled
          v-model="category"
          label="Classe"
          labelColor="primary"
          lazy-rules
        ></q-input>
      </div>

      <div class="row q-gutter-sm q-my-sm">
        <q-input
          class="col"
          filled
          type="number"
          v-model="edition"
          label="Edição"
          lazy-rules
          labelColor="primary"
        ></q-input>

        <q-input
          class="col"
          filled
          type="number"
          v-model="volume"
          label="Volume"
          lazy-rules
          labelColor="primary"
        ></q-input>

        <q-input
          class="col"
          filled
          type="number"
          v-model="year"
          label="Ano"
          labelColor="primary"
          lazy-rules
          :rules="[
            (val) =>
              !val || (val >= 0 && String(val).length === 4) || 'Ano inválido.',
          ]"
        ></q-input>

        <q-input
          class="col-4"
          filled
          type="number"
          v-model="numPages"
          label="Número de páginas"
          lazy-rules
          labelColor="primary"
        ></q-input>
      </div>

      <div class="row q-gutter-sm q-my-sm">
        <q-input
          class="col"
          filled
          type="text"
          v-model="isbn"
          label="ISBN"
          lazy-rules
          labelColor="primary"
        ></q-input>

        <q-input
          class="col"
          filled
          type="text"
          v-model="cdd"
          label="CDD"
          lazy-rules
          labelColor="primary"
        ></q-input>

        <q-input
          class="col"
          filled
          type="text"
          v-model="cdu"
          label="CDU"
          labelColor="primary"
        ></q-input>
      </div>

      <div>
        <q-btn label="Salvar" type="submit" color="primary"></q-btn>
        <q-btn
          label="Limpar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "BooksCreate",

  data() {
    return {
      title: null,
      author: null,
      publisher: null,
      edition: null,
      volume: null,
      numPages: null,
      year: null,
      category: null,
      isbn: null,
      cdd: null,
      cdu: null,
      like: "",
      existingAuthors: [],
      authorFilter: null,
    };
  },

  async created() {
    const authors = await window.booksApi.searchAuthors("");
    this.existingAuthors = authors;
  },

  computed: {
    authorsOptions() {
      return this.existingAuthors
        .filter((author) => author.toLowerCase().includes(this.authorFilter))
        .map((author) => ({
          label: author,
          value: author,
        }));
    },
  },

  methods: {
    saveBook() {
      console.log("vue create book");
      window.booksApi.createBook({ title: "vue" });
    },
    onSubmit() {
      window.booksApi.createBook({
        title: this.title,
        author: this.author,
        publisher: this.publisher,
        edition: this.edition,
        volume: this.volume,
        numPages: this.numPages,
        year: this.year,
        class: this.category,
        isbn: this.isbn,
        cdd: this.cdd,
        cdu: this.cdu,
      });
    },
    onReset() {
      this.title = null;
      this.author = null;
      this.publisher = null;
      this.edition = null;
      this.volume = null;
      this.numPages = null;
      this.year = null;
      this.category = null;
      this.isbn = null;
      this.cdd = null;
      this.cdu = null;
    },
    filterFn(val, update, _abort) {
      update(() => {
        this.authorFilter = val.toLowerCase().trim();
      });
    },
  },
};
</script>
