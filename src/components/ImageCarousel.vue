<template>
  <q-expansion-item label="Fotos" header-class="text-primary text-h6">
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
              @click="addImages = true"
            ></q-btn>
            <q-btn
              push
              round
              dense
              color="red"
              text-color="white"
              icon="delete_forever"
              @click="onDelete(slide)"
            ></q-btn>
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
  </q-expansion-item>

  <q-dialog v-model="addImages" persistent>
    <q-card>
      <q-card-section class="row items-center justfy-center">
        <q-avatar icon="upload" color="primary" text-color="white"></q-avatar>
        <q-text class="q-ml-sm text-primary text-h6"
          >Selecione uma ou mais imagens!</q-text
        >
        <q-uploader
          class="q-my-sm"
          :factory="factory"
          multiple
          batch
          style="width: 100%"
        ></q-uploader>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { Image } from "src/domain/Image";
export default {
  name: "ImageCarousel",

  props: {
    images: {
      type: [Image],
      required: true,
    },
    onAdd: {
      type: Function,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      slide: "1",
      fullscreen: false,
      addImages: false,
    };
  },

  methods: {
    factory(files) {
      this.addImages = false;
      this.onAdd(files);
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
