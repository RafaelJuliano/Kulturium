<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Kulturium </q-toolbar-title>

        <div>v{{ appVersion }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <SideMenu @toggle-left-drawer="toggleLeftDrawer" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { version } from "../../package.json";
import SideMenu from "components/SideMenu.vue";

export default {
  name: "MainLayout",
  components: {
    SideMenu,
  },

  data() {
    return {
      linksList: [
        {
          title: "Test",
          caption: "Go to the test page",
          icon: "code",
          name: "test",
        },
      ],
      leftDrawerOpen: false,
      appVersion: version,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
