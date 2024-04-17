<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Cadastrar Livro</h6>
    </div>
    <q-separator color="primary" spaced="sm"></q-separator>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-pa-sm"
      ref="myForm"
    >
      <div class="row q-gutter-sm q-my-sm justify-end items-center">
        <q-btn flat round color="grey" :icon="lockIcon" @click="handleLock" />
        <q-input
          class="col-2"
          filled
          v-model="id"
          label="Registro"
          labelColor="primary"
          type="number"
          :disable="isIdDisabled"
        ></q-input>
      </div>
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

        <AutorSelect class="col-5" v-model="author" />
      </div>

      <div class="row q-gutter-sm q-my-sm justify-between">
        <PublisherSelect class="col-5" v-model="publisher" />

        <ClassSelect class="col" v-model="className" />
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
import AutorSelect from "src/components/AutorSelect.vue";
import PublisherSelect from "src/components/PublisherSelect.vue";
import ClassSelect from "src/components/ClassSelect.vue";

export default {
  name: "BooksCreate",

  components: {
    AutorSelect,
    PublisherSelect,
    ClassSelect,
  },

  data() {
    return {
      id: null,
      title: null,
      author: null,
      publisher: null,
      edition: null,
      volume: null,
      numPages: null,
      year: null,
      className: null,
      isbn: null,
      cdd: null,
      cdu: null,
      myForm: null,
      isIdDisabled: true,
    };
  },

  mounted() {
    this.myForm = this.$refs.myForm;
  },
  computed: {
    lockIcon() {
      return this.isIdDisabled ? "lock" : "lock_open";
    },
  },

  methods: {
    onSubmit() {
      window.booksApi
        .createBook({
          id: this.id,
          title: this.title,
          author: this.author,
          publisher: this.publisher,
          edition: this.edition,
          volume: this.volume,
          numPages: this.numPages,
          year: this.year,
          class: this.className,
          isbn: this.isbn,
          cdd: this.cdd,
          cdu: this.cdu,
        })
        .then(() => {
          this.$q.notify("Livro cadastrado com sucesso!");
          this.myForm.reset();
        })
        .catch(() => {
          this.$q.notify({
            message: "Ops, algo deu errado!",
            type: "negative",
          });
        });
    },
    onReset() {
      this.id = null;
      this.title = null;
      this.author = null;
      this.publisher = null;
      this.edition = null;
      this.volume = null;
      this.numPages = null;
      this.year = null;
      this.className = null;
      this.isbn = null;
      this.cdd = null;
      this.cdu = null;
    },
    handleLock() {
      this.isIdDisabled = !this.isIdDisabled;
    },
  },
};
</script>
