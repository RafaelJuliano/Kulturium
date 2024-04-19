<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Pesquisar Livros</h6>
    </div>
    <q-separator color="primary"></q-separator>
    <div class="q-pa-md">
      <q-table
        :rows="books"
        row-key="name"
        v-model:pagination="pagination"
        flat
        bordered
        @request="onRequest"
      ></q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "BooksList",

  data() {
    return {
      books: [],
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 73,
      },
    };
  },

  async created() {
    this.books = await window.booksApi.searchBooks({
      sort: this.pagination.sortBy,
      limit: this.pagination.rowsPerPage,
      offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
    });
  },

  methods: {
    async onRequest(props) {
      this.pagination = props.pagination;

      this.books = await window.booksApi.searchBooks({
        sort: props.pagination.sortBy,
        limit: props.pagination.rowsPerPage,
        offset: props.pagination.rowsPerPage * (props.pagination.page - 1),
        descending: props.pagination.descending,
      });
    },
  },
};
</script>
