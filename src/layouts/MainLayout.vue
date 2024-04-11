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

        <q-toolbar-title> MuseVE </q-toolbar-title>

        <div>v{{ appVersion }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { version } from "../../package.json";

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
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
