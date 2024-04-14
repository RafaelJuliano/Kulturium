<template>
  <q-page padding>
    <div class="w-full flex justify-end">
      <h6 class="text-primary font-bold q-my-none">Cadastrar Livro</h6>
    </div>
    <q-separator color="primary"></q-separator>
    <q-btn color="primary" @click="saveBook"> saveBook </q-btn>
  </q-page>
</template>

<script>
export default {
  name: "BooksCreate",

  methods: {
    saveBook() {
      console.log("vue create book");
      window.booksApi.createBook({ title: "vue" });
    },
  },
};
</script>
