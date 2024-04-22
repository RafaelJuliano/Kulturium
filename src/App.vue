<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  mounted() {
    window.mainAPI.messages((_event, message) => {
      this.$q.notify(message);
    });
  },
};
</script>
