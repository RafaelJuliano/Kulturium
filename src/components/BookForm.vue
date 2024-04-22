<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md q-pa-sm"
    ref="myForm"
  >
    <div class="row q-gutter-sm q-my-sm justify-end items-center">
      <q-btn
        v-if="!isUpdate"
        flat
        round
        color="grey"
        :icon="lockIcon"
        @click="handleLock"
      />
      <q-input
        class="col-2"
        v-model="book.id"
        label="Registro"
        labelColor="primary"
        type="number"
        :disable="isIdDisabled"
        :readonly="readonly"
      ></q-input>
    </div>
    <div class="row q-gutter-sm q-my-sm justify-between">
      <q-input
        class="col"
        v-model="book.title"
        label="Título"
        labelColor="primary"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Título é obrigatório.']"
        :readonly="readonly"
      ></q-input>

      <AutorSelect class="col-5" v-model="book.author" :readonly="readonly" />
    </div>

    <div class="row q-gutter-sm q-my-sm justify-between">
      <PublisherSelect
        class="col-5"
        v-model="book.publisher"
        :readonly="readonly"
      />

      <ClassSelect class="col" v-model="book.class" :readonly="readonly" />
    </div>

    <div class="row q-gutter-sm q-my-sm">
      <q-input
        class="col"
        type="number"
        v-model="book.edition"
        label="Edição"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        class="col"
        type="number"
        v-model="book.volume"
        label="Volume"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        class="col"
        type="number"
        v-model="book.year"
        label="Ano"
        labelColor="primary"
        lazy-rules
        :rules="[
          (val) =>
            !val || (val >= 0 && String(val).length === 4) || 'Ano inválido.',
        ]"
        :readonly="readonly"
      ></q-input>

      <q-input
        class="col-4"
        type="number"
        v-model="book.num_pages"
        label="Número de páginas"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>
    </div>

    <div class="row q-gutter-sm q-my-sm">
      <q-input
        class="col"
        type="text"
        v-model="book.isbn"
        label="ISBN"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        class="col"
        type="text"
        v-model="book.cdd"
        label="CDD"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        class="col"
        type="text"
        v-model="book.cdu"
        label="CDU"
        labelColor="primary"
        :readonly="readonly"
      ></q-input>
    </div>

    <div>
      <slot></slot>
    </div>
  </q-form>
</template>

<script>
import AutorSelect from "src/components/AutorSelect.vue";
import PublisherSelect from "src/components/PublisherSelect.vue";
import ClassSelect from "src/components/ClassSelect.vue";

export default {
  name: "BookForm",

  components: {
    AutorSelect,
    PublisherSelect,
    ClassSelect,
  },

  props: {
    initialData: {
      id: {
        type: Number,
        default: null,
      },
      title: {
        type: String,
        default: null,
      },
      author: {
        type: String,
        default: null,
      },
      publisher: {
        type: String,
        default: null,
      },
      edition: {
        type: String,
        default: null,
      },
      volume: {
        type: String,
        default: null,
      },
      num_pages: {
        type: String,
        default: null,
      },
      year: {
        type: String,
        default: null,
      },
      class: {
        type: String,
        default: null,
      },
      isbn: {
        type: String,
        default: null,
      },
      cdd: {
        type: String,
        default: null,
      },
      cdu: {
        type: String,
        default: null,
      },
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      book: {
        ...this.initialData,
      },
      myForm: null,
      isIdDisabled: true,
    };
  },

  async mounted() {
    this.myForm = this.$refs.myForm;
    this.book.id = await this.getId();
  },

  computed: {
    lockIcon() {
      return this.isIdDisabled ? "lock" : "lock_open";
    },
  },

  methods: {
    async onSubmit() {
      const idExists = await this.checkSequence();
      if (idExists && !this.isUpdate) {
        return this.$q.notify({
          message: `Um livro com registro ${this.book.id}, já existe no sistema.`,
          type: "negative",
        });
      }
      try {
        await window.booksApi.saveBook({ ...this.book }, this.isUpdate);
        this.$q.notify(
          `Livro ${this.isUpdate ? "atualizado" : "cadastrado"} com sucesso!`
        );
        this.myForm.reset();
        if (this.isUpdate) this.$emit("bookUpdated", { ...this.book });
      } catch {
        this.$q.notify({
          message: "Ops, algo deu errado!",
          type: "negative",
        });
      }
    },
    async onReset() {
      this.book = {
        ...this.initialData,
        id: await this.getId(),
      };
    },
    handleLock() {
      this.isIdDisabled = !this.isIdDisabled;
    },
    getSequence() {
      return window.booksApi.getSequence();
    },
    async getId() {
      return this.initialData?.id || (await window.booksApi.getSequence()) + 1;
    },
    checkSequence(id) {
      return window.booksApi.checkSequence(this.book.id);
    },
  },

  watch: {
    initialData() {
      this.book = { ...this.initialData };
    },
  },
};
</script>
