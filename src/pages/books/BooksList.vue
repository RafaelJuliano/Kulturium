<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Pesquisar Livros</h6>
    </div>
    <q-separator color="primary"></q-separator>
    <div class="q-pa-md">
      <q-table
        :rows="books"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        flat
        bordered
        rows-per-page-label="itens por pagina:"
        no-data-label="Nenhum livro encontrado com os critérios de busca."
        :visible-columns="visibleColumns"
        @request="onRequest"
      >
        <template v-slot:top>
          <q-input
            class="col-4"
            v-model="searchFilter"
            label="Pesquisar"
            debounce="500"
          ></q-input>

          <q-space></q-space>

          <q-select
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            display-value="Colunas"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            options-cover
            style="min-width: 150px"
          ></q-select>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "BooksList",

  data() {
    return {
      books: [],
      columns: [
        {
          name: "id",
          label: "Registro",
          field: "id",
          sortable: true,
          align: "left",
          style: "width: 10%;",
        },
        {
          name: "title",
          label: "Título",
          field: "title",
          sortable: true,
          align: "left",
          style: "width: 30%;",
        },
        {
          name: "author",
          label: "Autor",
          field: "author",
          sortable: true,
          align: "left",
          style: "width: 20%; ",
        },
        {
          name: "publisher",
          label: "Editora",
          field: "publisher",
          sortable: true,
          align: "left",
          style: "width: 20%;",
        },
        {
          name: "class",
          label: "Classe",
          field: "class",
          sortable: true,
          align: "left",
          style: "width: 20%;",
        },
        {
          name: "edition",
          label: "Edição",
          field: "edition",
          sortable: true,
          align: "left",
          style: "width: 10%",
        },
        {
          name: "volume",
          label: "Volumne",
          field: "volume",
          sortable: true,
          align: "left",
          style: "width: 10%",
        },
        {
          name: "num_pages",
          label: "N° de páginas",
          field: "num_pages",
          sortable: true,
          align: "left",
          style: "width: 20%",
        },
        {
          name: "year",
          label: "Ano",
          field: "year",
          sortable: true,
          align: "left",
          style: "width: 20%",
        },
        {
          name: "isbn",
          label: "ISBN",
          field: "isbn",
          sortable: true,
          align: "left",
          style: "width: 20%",
        },
        {
          name: "cdd",
          label: "CDD",
          field: "cdd",
          sortable: true,
          align: "left",
          style: "width: 20%",
        },
        {
          name: "cdu",
          label: "CDU",
          field: "cdu",
          sortable: true,
          align: "left",
          style: "width: 20%",
        },
      ],
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 73,
      },
      visibleColumns: ["id", "title", "author", "publisher", "class"],
      searchFilter: "",
    };
  },

  async created() {
    await this.fetchBooks();
  },

  methods: {
    async onRequest(props) {
      this.fetchBooks(props.pagination);
    },
    async fetchBooks(paginationParams = this.pagination) {
      const { data, totalItems } = await window.booksApi.searchBooks({
        sort: paginationParams.sortBy,
        limit: paginationParams.rowsPerPage,
        offset: paginationParams.rowsPerPage * (paginationParams.page - 1),
        descending: paginationParams.descending,
        like: this.searchFilter,
      });

      this.books = data;
      this.pagination = {
        ...paginationParams,
        rowsNumber: totalItems,
      };
    },
  },
  watch: {
    searchFilter() {
      this.fetchBooks();
    },
  },
};
</script>
