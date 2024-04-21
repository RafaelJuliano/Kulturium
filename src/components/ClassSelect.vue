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
    label="Classe"
    labelColor="primary"
    @filter="filterFn"
    @input-value="onInput"
  >
  </q-select>
</template>

<script>
export default {
  name: "ClassSelect",

  data() {
    return {
      options: [],
      classes: [],
    };
  },

  async created() {
    this.classes = (await window.booksApi.searchClasses()).filter(
      (value) => !!value
    );
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
        this.options = this.classes.filter(
          (v) => v.toLocaleLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>
