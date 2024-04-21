<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Detalhes do Livro</h6>
    </div>
    <q-separator color="primary" spaced="sm"></q-separator>
    <BookForm :initialData="selectedBook" readonly blockId />
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
  },
};
</script>
