<template>
  <q-list>
    <div class="w-full flex justify-between items-center">
      <q-item-label header> Menu </q-item-label>
      <q-btn
        flat
        dense
        round
        icon="close"
        aria-label="close"
        @click="toggleLeftDrawer"
      />
    </div>

    <q-expansion-item
      v-for="group in groups"
      :key="group.title"
      v-bind="group"
      :icon="group.icon"
      :label="group.title"
      expand-separator
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
      ><q-list>
        <MenuIntem
          v-for="page in group.pages"
          :key="page.title"
          v-bind="page"
        /> </q-list
    ></q-expansion-item>
  </q-list>
</template>

<script>
import MenuIntem from "./MenuIntem.vue";

export default {
  name: "SideMenu",

  components: {
    MenuIntem,
  },

  data() {
    return {
      groups: [
        {
          title: "Biblioteca",
          icon: "menu_book",
          pages: [
            {
              title: "Cadastrar",
              caption: "Cadastrar novo livro",
              icon: "add_circle_outline",
              routeName: "books_create",
            },
            {
              title: "Pesquisar",
              caption: "Pesquisar na biblioteca",
              icon: "manage_search",
              routeName: "books_list",
            },
            {
              title: "Importar / Exportar",
              caption: "Gerenciar backups",
              icon: "upload_file",
              routeName: "books_backup",
            },
          ],
        },
      ],
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.$emit("toggle-left-drawer");
    },
  },
};
</script>
