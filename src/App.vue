<template>
  <main>
    <Carousel
        :images="images"
        :show-navigation-arrows="false"
        :autoplay="true"
        :interval="5000"
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
  </main>
</template>

<script setup>
import './assets/app.css'; // Here
import Carousel from './components/Carousel.vue'
import { computed } from 'vue';


const images = computed(() => {
  return [
    'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=518&q=80',
    'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1578104177486-db0478ff6306?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1613255801169-570ff8a29586?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1528140304883-f8d39a02fc7a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGZ1bm55fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=600'
  ]
})

</script>

