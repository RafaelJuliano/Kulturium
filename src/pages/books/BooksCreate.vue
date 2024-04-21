<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Cadastrar Livro</h6>
    </div>
    <q-separator color="primary" spaced="sm"></q-separator>
    <BookForm />
  </q-page>
</template>

<script>
import BookForm from "src/components/BookForm.vue";

export default {
  name: "BooksCreate",

  components: {
    BookForm,
  },

  data() {
    return {
      id: null,
      title: null,
      author: null,
      publisher: null,
      edition: null,
      volume: null,
      num_pages: null,
      year: null,
      className: null,
      isbn: null,
      cdd: null,
      cdu: null,
      myForm: null,
      isIdDisabled: true,
    };
  },
};
</script>
