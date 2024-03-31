<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="mx-auto w-full h-full">
    <div ref="wrapper" class="relative overflow-hidden h-full">
      <ul
          ref="container"
          class="flex inset-0 justify-around items-stretch w-full h-full"
          :class="`${spacingString}`"
          :style="{width: `${images.length > slides ? images.length * (100 / slides) : 100}%`}"
          @pointerdown="dragStart"
          @pointerup="dragStop"
          @pointermove="dragMove"
          @mousedown.prevent
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
      >
        <slot name="default">
          <li
              v-for="(img, i) in images"
              :key="i"
              class="w-full h-full min-w-1/3 align-stretch"
              style="touch-action: none"
              @dragstart.prevent
          >
            <div class="w-full h-full pb-[100%] relative">
              <img
                  :src="img"
                  class="object-cover object-center absolute inset-0 w-full h-full"
                  @mousedown.prevent
                  :loading="i===0?'eager':'lazy'"
              />
            </div>
          </li>
        </slot>
      </ul>
      <slot name="dots" :changeImage="changeImage" :currentIndex="currentIndex">
        <!--PIGINATION-->
        <div
            class="absolute bottom-0 flex items-center justify-center space-x-6 transform translate-x-1/2 right-1/2"
            @click="changeImage"
            v-if="showNavigationBullets"
        >
          <button
              v-for="(img, i) in images"
              :key="i"
              class="w-4 h-4 rounded-full"
              :class="[currentIndex == i ? 'bg-white' : 'bg-black']"
              :data-index="i"
          ></button>
        </div>
      </slot>
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, onMounted } from 'vue';
import useCarousel from '@/composables/useCarousel';

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true
  },
  slides: {
    type: Number,
    default: 1
  },
  showNavigationArrows: {
    type: Boolean,
    default: true
  },
  spaceX: {
    type: Number,
    default: 4
  },
  dots: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 5000
  },
  speed: {
    type: Number,
    default: 0.3
  }
});


//Preload the First Image
if (props.images && props.images.length > 0) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = props.images[0];
  document.head.appendChild(link);
}

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
  showNavigationBullets,
  // Methods
  next,
  prev,
  changeImage,
  dragStart,
  dragStop,
  dragMove,
  pauseAutoplay,
  resumeAutoplay
} = useCarousel(props);

const spacingString = computed(() => {
  const { slides, images } = props;
  console.log('slides.value', slides, 'images.length', images.length, `space-x-${spacing.value}`)
  return slides > 1 ? `space-x-${spacing.value}` : '';
});

</script>
