<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="mx-auto w-full h-full">
    <div ref="wrapper" class="relative overflow-hidden mt-24"
         style="padding-bottom: 100%">
      <ul
          ref="container"
          :class="`absolute inset-0 flex justify-between items-center ${images.length > slides ? `space-x-${spacing}` : ''}`"
          :style="{width: `${images.length > slides ? images.length * (100 / slides) : 100}%`}"
          @pointerdown="dragStart"
          @pointerup="dragStop"
          @pointermove="dragMove"
          @mousedown.prevent
      >
        <li
            v-for="(img, i) in images"
            :key="i"
            class="w-full h-full min-w-1/3"
            style="touch-action: none"
            @dragstart.prevent
        >
          <img
              :src="img"
              class="object-cover object-center w-full h-full"
              @mousedown.prevent
          />
        </li>
      </ul>
      <!--PIGINATION-->
      <div
          class="absolute bottom-0 flex items-center justify-center space-x-6 transform translate-x-1/2 right-1/2"
          @click="changeImage"
          v-if="showBullets"
      >
        <button
            v-for="(img, i) in images"
            :key="i"
            class="w-4 h-4 rounded-full"
            :class="[currentIndex == i ? 'bg-white' : 'bg-black']"
            :data-index="i"
        ></button>
      </div>

      <button
          v-if="showNavigationArrows && currentIndex > 0"
          class="absolute transform -translate-y-1/2 top-1/2"
          @click="prev"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-labelledby="arrowLeft"
            class="w-8 h-8"
        >
          <title id="arrowLeft">Previous Image</title>
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
          v-if="showNavigationArrows && currentIndex < images.length - 1"
          class="absolute right-0 transform -translate-y-1/2 top-1/2"
          @click="next"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-labelledby="arrowRight"
            class="w-8 h-8"
        >
          <title id="arrowRight">Next Image</title>
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

    </div>
    <pre class="">
        xDown: {{ xDown }}
        xDiff: {{ xDiff }}
        xCurrent: {{ currentX }}
        imageIndex: {{ currentIndex }}
        slides Per View: {{ slides }}
        totalImages: {{ images.length }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import useCarousel from '@/composables/useCarousel';

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true
  },
  slides: {
    type: Number,
    required: true
  },
  showNavigationArrows: {
    type: Boolean,
    default: true
  }
});

const {
  currentIndex,
  animationPlaying,
  xDown,
  yDown,
  xMove,
  currentX,
  container,
  spacing,
  // Add your computed properties and methods here
  xDiff,
  showBullets,
  // Methods
  next,
  prev,
  changeImage,
  dragStart,
  dragStop,
  dragMove
} = useCarousel(props);

</script>
