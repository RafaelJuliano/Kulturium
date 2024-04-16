<template>
  <q-select
    filled
    :selected="value"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="options"
    emit-value
    map-options
    label="Editora"
    labelColor="primary"
    @filter="filterFn"
    @input-value="onInput"
  >
  </q-select>
</template>

<script>
export default {
  name: "PublisherSelect",

  data() {
    return {
      options: [],
      publishers: [],
    };
  },

  async created() {
    this.publishers = await window.booksApi.searchPublishers();
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInput(val) {
      this.$emit("update:modelValue", val);
    },
    filterFn(val, update) {
      update(() => {
        const needle = val.toLocaleLowerCase();
        this.options = this.publishers.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
