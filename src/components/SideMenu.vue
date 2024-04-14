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
        <q-item
          v-for="link in group.pages"
          :key="link.title"
          v-bind="link"
          clickable
          @click="onClick(link.routeName)"
        >
          <q-item-section v-if="icon" avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list></q-expansion-item
    >
  </q-list>
</template>

<script>
export default {
  name: "SideMenu",

  data() {
    return {
      groups: [
        {
          title: "Biblioteca",
          icon: "menu_book",
          pages: [
            {
              title: "Novo",
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
    onClick(routeName) {
      this.$router.push({ name: routeName });
    },
    toggleLeftDrawer() {
      this.$emit("toggle-left-drawer");
    },
  },
};
</script>
