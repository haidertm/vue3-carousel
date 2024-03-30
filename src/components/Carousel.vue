<template>
  <div class="mx-auto w-full h-full">
    <div ref="wrapper" class="relative overflow-hidden mt-24"
         style="padding-bottom: 100%">
      <ul
          ref="container"
          class="absolute inset-0 flex items-center w-full"
          @pointerdown="dragStart"
          @pointerup="dragStop"
          @pointermove="dragMove"
          @mousedown.prevent
      >
        <li
            v-for="(img, i) in images"
            :key="i"
            class="w-full h-full min-w-full"
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
          v-if="currentIndex > 0"
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
          v-if="currentIndex < images.length - 1"
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
    </pre>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { ref, computed } from 'vue';

//Defining Data Variables
const currentIndex = ref(0);
const animationPlaying = ref(false);
const xDown = ref(null);
const yDown = ref(null);
const xMove = ref(0);
const currentX = ref(0);
const container = ref(null);

const images = computed(() => {
  return [
    'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=518&q=80',
    'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1578104177486-db0478ff6306?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1613255801169-570ff8a29586?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1528140304883-f8d39a02fc7a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGZ1bm55fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  ]
})
const xDiff = computed(() => {
  return xDown.value - xMove.value;
})
const clientWidth = computed(() => {
  return container.value.clientWidth;
})
const scrollWidth = computed(() => {
  return container.value.scrollWidth;
})

const dragStart = (e) => {
  if (animationPlaying.value) return false;
  container.value.setPointerCapture(e.pointerId);
  xDown.value = e.clientX;
  yDown.value = e.clientY;
  xMove.value = e.clientX;
}

const dragStop = (e) => {
  currentX.value += xDiff.value;
  xDown.value = null;
  yDown.value = null;
  xMove.value = 0;
  container.value.releasePointerCapture(e.pointerId);

  let index = currentX.value / clientWidth.value;
  currentIndex.value = Math.round(index);
  if (currentIndex.value > images.value.length - 1) {
    currentIndex.value = images.value.length - 1;
  } else if (currentIndex.value < 0) {
    currentIndex.value = 0;
  }
  animationPlaying.value = true;
  gsap.to(container.value, {
    x: -(currentIndex.value * clientWidth.value),
    duration: 0.2,
    onComplete: () => {
      animationPlaying.value = false;
      currentX.value = currentIndex.value * clientWidth.value;
    }
  });
}

const dragMove = (e) => {
  if (!xDown.value || !yDown.value || !e.target.hasPointerCapture(e.pointerId)) return;

  let xUp = e.clientX;
  xMove.value = xUp;
  let xDiff = xDown.value - xUp;

  if (Math.abs(xDiff) !== 0) {
    gsap.to(container.value, {
      x: -(currentX.value + (xDown.value - xUp)),
      duration: 0,
    });
  }
};

const changeImage = (e) => {
  if (e.target.tagName === 'BUTTON' && animationPlaying.value === false) {
    animationPlaying.value = true;
    currentIndex.value = e.target.dataset.index;
    gsap.to(container.value, {
      x: -(currentIndex.value * clientWidth.value),
      duration: 0.2,
      onComplete: () => {
        animationPlaying.value = false;
        currentX.value = currentIndex.value * clientWidth.value;
      }
    });
  }
}
const next = () => {
  if (
      currentIndex.value == images.value.length - 1 ||
      animationPlaying.value === true
  ) {
    return;
  }
  // GSAP
  animationPlaying.value = true;
  gsap.to(container.value, {
    x: `+= ${ -clientWidth.value }`,
    duration: 0.2,
    onComplete: () => {
      currentIndex.value++;
      animationPlaying.value = false;
      currentX.value = currentIndex.value * clientWidth.value;
    }
  });
}
const prev = () => {
  if (currentIndex.value === 0 || animationPlaying.value === true) {
    return;
  }
  animationPlaying.value = true;
  gsap.to(container.value, {
    x: `+= ${ clientWidth.value }`,
    duration: 0.2,
    onComplete: () => {
      currentIndex.value--;
      animationPlaying.value = false;
      currentX.value = currentIndex.value * clientWidth.value;
    }
  });
}

const updateSliderPosition = () => {
  if (!container.value) return false;
  animationPlaying.value = true;
  gsap.to(container.value, {
    x: -(currentIndex.value * clientWidth.value),
    duration: 0.2,
    onComplete: () => {
      animationPlaying.value = false;
    },
  });
};

</script>
