<template>
  <Carousel
      :images="images"
      :show-navigation-arrows="false"
      :autoplay="false"
      :interval="5000"
      @slide-changed="slideChanged"
  >
    <template v-slot:dots="{changeImage,currentIndex}">
      <!--PIGINATION-->
      <div
          class="absolute bottom-0 flex items-center justify-center space-x-6 transform translate-x-1/2 right-1/2"
          @click="changeImage"
      >
        <button
            v-for="(img, i) in images"
            :key="i"
            class="w-4 h-4 rounded-full mb-5"
            :class="[currentIndex === i ? 'bg-white' : 'bg-black']"
            :data-index="i"
        ></button>
      </div>
    </template>
  </Carousel>
  <Carousel
      :images="images"
      :show-navigation-arrows="true"
      :slides="6"
      :space-x="2"
      class="mt-5"
  />
</template>
<script setup>
import Carousel from '@/components/Carousel.vue';
import { ref, defineProps } from 'vue';

const activeIndex = ref(0);

defineProps({
  images: {
    type: Array,
    required: true
  }
});

const slideChanged = (currentIndex) => {
  console.log(currentIndex);
}
</script>
