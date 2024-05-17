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
        filled
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
        filled
        class="col"
        v-model="book.title"
        label="Título"
        labelColor="primary"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Título é obrigatório.']"
        :readonly="readonly"
      ></q-input>

      <AutorSelect
        filled
        class="col-5"
        v-model="book.author"
        :readonly="readonly"
      />
    </div>

    <div class="row q-gutter-sm q-my-sm justify-between">
      <PublisherSelect
        filled
        class="col-5"
        v-model="book.publisher"
        :readonly="readonly"
      />

      <ClassSelect
        filled
        class="col"
        v-model="book.class"
        :readonly="readonly"
      />
    </div>

    <div class="row q-gutter-sm q-my-sm">
      <q-input
        filled
        class="col"
        type="number"
        v-model="book.edition"
        label="Edição"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        filled
        class="col"
        type="number"
        v-model="book.volume"
        label="Volume"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        filled
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
        filled
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
        filled
        class="col"
        type="text"
        v-model="book.isbn"
        label="ISBN"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        filled
        class="col"
        type="text"
        v-model="book.cdd"
        label="CDD"
        lazy-rules
        labelColor="primary"
        :readonly="readonly"
      ></q-input>

      <q-input
        filled
        class="col"
        type="text"
        v-model="book.cdu"
        label="CDU"
        labelColor="primary"
        :readonly="readonly"
      ></q-input>
    </div>

    <q-expansion-item
      v-if="isUpdate"
      label="Fotos"
      header-class="text-primary text-h6"
    >
      <div class="q-px-xl q-py-sm">
        <q-carousel
          swipeable
          animated
          arrows
          v-model="slide"
          v-model:fullscreen="fullscreen"
          control-color="primary"
          infinite
        >
          <q-carousel-slide
            class="uncropped-image"
            v-for="image in images"
            :key="image.id"
            :name="image.id"
            :img-src="image.path"
          >
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn
                push
                round
                dense
                color="white"
                text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              ></q-btn>
            </q-carousel-control>
            <q-carousel-control
              v-if="!fullscreen && !readonly"
              position="bottom-left"
              :offset="[18, 18]"
            >
              <q-btn
                class="q-mr-sm"
                push
                round
                dense
                color="white"
                text-color="primary"
                icon="add"
                @click="console.log(slide)"
              ></q-btn>
              <q-btn
                push
                round
                dense
                color="red"
                text-color="white"
                icon="delete_forever"
                @click="console.log(slide)"
              ></q-btn>
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
    </q-expansion-item>
    <q-separator color="primary" spaced="sm"></q-separator>

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
      images: [
        { id: "1", path: "src/assets/mountains.jpg" },
        { id: "2", path: "src/assets/parallax1.jpg" },
        { id: "3", path: "src/assets/home.png" },
      ],
      slide: "1",
      fullscreen: false,
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

<style>
.uncropped-image {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
}
</style>
