<template>
  <q-select
    :filled="filled"
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
    :readonly="readonly"
    @filter="filterFn"
    @input-value="onInput"
  >
    <template v-slot:append>
      <q-icon
        v-if="showClearButton && !readonly"
        name="close"
        @click.stop.prevent="onInput('')"
        class="cursor-pointer"
      ></q-icon>
    </template>
  </q-select>
</template>

<script>
export default {
  name: "ClassSelect",

  data() {
    return {
      options: [],
      classes: [],
      showClearButton: false,
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
    readonly: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(val) {
      this.$emit("update:modelValue", val);
      this.showClearButton = val !== "";
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
