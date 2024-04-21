<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Pesquisar Livros</h6>
    </div>
    <q-separator color="primary"></q-separator>

    <div class="q-pa-md">
      <q-card flat bordered class="my-card q-pa-md">
        <div class="row q-gutter-sm q-my-sm q-mx-none">
          <q-input
            class="col"
            v-model="searchFilter"
            label="Pesquisar"
            label-color="primary"
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
        </div>
        <div class="row q-gutter-sm q-my-sm q-mx-none">
          <AutorSelect class="col" v-model="authorFilter" />
          <PublisherSelect class="col" v-model="publisherFilter" />
          <ClassSelect class="col" v-model="classFilter" />
        </div>
      </q-card>
    </div>
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
        loading-label="Carregando..."
        :visible-columns="visibleColumns"
        :loading="isLoading"
        @request="onRequest"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary"></q-inner-loading>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import AutorSelect from "src/components/AutorSelect.vue";
import PublisherSelect from "src/components/PublisherSelect.vue";
import ClassSelect from "src/components/ClassSelect.vue";

export default {
  name: "BooksList",

  components: {
    AutorSelect,
    PublisherSelect,
    ClassSelect,
  },

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
      authorFilter: "",
      publisherFilter: "",
      classFilter: "",
      isLoading: false,
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
      this.isLoading = true;
      const { data, totalItems } = await window.booksApi.searchBooks({
        sort: paginationParams.sortBy,
        limit: paginationParams.rowsPerPage,
        offset: paginationParams.rowsPerPage * (paginationParams.page - 1),
        descending: paginationParams.descending,
        like: this.searchFilter,
        author: this.authorFilter,
        publisher: this.publisherFilter,
        class: this.classFilter,
      });

      this.books = data;
      this.pagination = {
        ...paginationParams,
        rowsNumber: totalItems,
      };
      this.isLoading = false;
    },
  },
  watch: {
    searchFilter() {
      this.fetchBooks();
    },
    authorFilter() {
      this.fetchBooks();
    },
    publisherFilter() {
      this.fetchBooks();
    },
    classFilter() {
      this.fetchBooks();
    },
  },
};
</script>
