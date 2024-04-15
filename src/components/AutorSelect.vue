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
    label="Autor"
    labelColor="primary"
    @filter="filterFn"
    @input-value="onInput"
  >
  </q-select>
</template>

<script>
export default {
  name: "AutorSelect",

  data() {
    return {
      options: [],
      authors: [],
    };
  },

  async created() {
    this.authors = await window.booksApi.searchAuthors();
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
        this.options = this.authors.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
