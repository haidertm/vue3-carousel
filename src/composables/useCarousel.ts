/**
 * Developed by Syed Haider Hassan
 * This is a composable function that can be used to create
 * a carousel in Vue 3 in combination with Carousel.vue component
 */

import { ref, computed, toRefs, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

export default function useCarousel (props: Prettify<Readonly<{
  slides: InferPropType<{ default: number; type: NumberConstructor }>;
  interval: InferPropType<{ default: number; type: NumberConstructor }>;
  dots: InferPropType<{ default: boolean; type: BooleanConstructor }>;
  autoplay: InferPropType<{ default: boolean; type: BooleanConstructor }>;
  spaceX: InferPropType<{ default: number; type: NumberConstructor }>;
  showNavigationArrows: InferPropType<{ default: boolean; type: BooleanConstructor }>
} & { images?: InferPropType<{ type: () => string[]; required: boolean }> }>>) {
  // Defining Data Variables
  const currentIndex = ref(0);
  const animationPlaying = ref(false);
  const xDown = ref(null);
  const yDown = ref(null);
  const xMove = ref(0);
  const currentX = ref(0);
  const container = ref(null);
  const autoplayIntervalId = ref(null);
  const { images, slides } = toRefs(props);



  const spacing = computed(() => {
    const space = props.spaceX ?? 4;
    return props.slides > 1 ? space : 0;
  });

  const xDiff = computed(() => {
    return xDown.value - xMove.value;
  })
  const clientWidth = computed(() => {
    return slideWidth.value * images.value.length;
  })

  const slideWidth = computed(() => {
    return container.value.children[0].clientWidth + spacing.value * 4;
  });

  const showNavigationBullets = computed(() => {
    return props.dots && slides.value === 1 && images.value.length > slides.value
  });

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

    let index = currentX.value / slideWidth.value;
    currentIndex.value = Math.round(index);
    if (currentIndex.value > images.value.length - 1) {
      currentIndex.value = images.value.length - 1;
    } else if (currentIndex.value < 0) {
      currentIndex.value = 0;
    }
    animationPlaying.value = true;
    gsap.to(container.value, {
      x: -(currentIndex.value * slideWidth.value),
      duration: 0.2,
      onComplete: () => {
        animationPlaying.value = false;
        currentX.value = currentIndex.value * slideWidth.value;
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
        duration: 0
      });
    }
  };

  const changeImage = (e) => {
    if (e.target.tagName === 'BUTTON' && animationPlaying.value === false) {
      animationPlaying.value = true;
      currentIndex.value = +e.target.dataset.index;
      gsap.to(container.value, {
        x: -(currentIndex.value * slideWidth.value),
        duration: 0.2,
        onComplete: () => {
          animationPlaying.value = false;
          currentX.value = currentIndex.value * slideWidth.value;
        }
      });
    }
  }
  const next = () => {
    if (
      currentIndex.value === images.value.length - 1 ||
      animationPlaying.value === true
    ) {
      return;
    }
    // GSAP
    animationPlaying.value = true;
    gsap.to(container.value, {
      x: `+= ${-slideWidth.value}`,
      duration: 0.2,
      onComplete: () => {
        currentIndex.value++;
        animationPlaying.value = false;
        currentX.value = currentIndex.value * slideWidth.value;
      }
    });
  }
  const prev = () => {
    if (currentIndex.value === 0 || animationPlaying.value === true) {
      return;
    }
    animationPlaying.value = true;
    gsap.to(container.value, {
      x: `+= ${slideWidth.value}`,
      duration: 0.2,
      onComplete: () => {
        currentIndex.value--;
        animationPlaying.value = false;
        currentX.value = currentIndex.value * slideWidth.value;
      }
    });
  }

  const updateSliderPosition = () => {
    if (!container.value) return false;
    animationPlaying.value = true;
    gsap.to(container.value, {
      x: -(currentIndex.value * slideWidth.value),
      duration: 0.2,
      onComplete: () => {
        animationPlaying.value = false;
      }
    });
  };

  const startAutoplay = () => {
    stopAutoplay(); // Stop existing autoplay to avoid multiple intervals
    autoplayIntervalId.value = setInterval(() => {
      console.log('performing autoplay');
      if (props.images && currentIndex.value < props.images.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0; // Reset to first slide when reaching the end
      }
      updateSliderPosition();
    }, props.interval); // Change slide every 3 seconds
  };

  const stopAutoplay = () => {
    if (autoplayIntervalId.value) {
      clearInterval(autoplayIntervalId.value);
      autoplayIntervalId.value = null;
    }
  };

  onMounted((): void => {
    console.log('props.autoplay', props.autoplay);
    if (props.autoplay) {
      startAutoplay();
    }
  });
  onUnmounted(() => {
    stopAutoplay();
  });
  return {
    // Return all the reactive variables and methods
    // that your components need
    currentIndex,
    animationPlaying,
    xDown,
    yDown,
    xMove,
    currentX,
    container,
    spacing,
    xDiff,
    clientWidth,
    slideWidth,
    showNavigationBullets,
    scrollWidth,
    dragStart,
    dragStop,
    dragMove,
    changeImage,
    next,
    prev,
    updateSliderPosition
  };
}
