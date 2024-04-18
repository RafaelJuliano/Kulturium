<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Pesquisar Livros</h6>
    </div>
    <q-separator color="primary"></q-separator>
  </q-page>
</template>

<script>
export default {
  name: "BooksList",

  data() {
    this.books = [];
  },

  async created() {
    this.books = await window.booksApi.searchBooks({});
    console.log(this.books);
  },
};
</script>
