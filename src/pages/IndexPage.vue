<template>
  <q-page class="flex flex-center flex-column">
    <q-icon name="museum" size="10rem" color="primary" />

    <q-btn color="primary" @click="increment"> Incrementar </q-btn>
    <q-chip>{{ count }}</q-chip>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      count: 0,
    };
  },
  created() {
    window.storeApi
      .getStoreData("count", "value")
      .then((result) => (this.count = result || 0));
  },
  methods: {
    increment() {
      this.count++;
      this.storeCount();
    },
    storeCount() {
      window.storeApi.setStoreData("count", "value", this.count);
    },
    getCount() {
      return window.storeApi.getStoreData("count", "value");
    },
  },
};
</script>
