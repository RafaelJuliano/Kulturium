<template>
  <q-item clickable @click="onClick()">
    <q-item-section v-if="icon" avatar>
      <q-icon color="primary" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "MenuItem",

  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    routeName: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },

  methods: {
    onClick() {
      this.$router.push({ name: this.routeName });
    },
  },
};
</script>
