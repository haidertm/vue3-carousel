<template>
  <main>
    <Carousel :images="images" :slides="1" />
    <Carousel2 :images="images" :slides="4" :show-navigation-arrows="false" />
  </main>
</template>

<script setup>
import './assets/app.css'; // Here
import Carousel from './components/Carousel.vue'
import Carousel2 from './components/Carousel2.vue'
import CarouselOld from './components/CarouselOld.vue'
import { computed } from 'vue';


const images = computed(() => {
  return [
    'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=518&q=80',
    'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1578104177486-db0478ff6306?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1613255801169-570ff8a29586?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1528140304883-f8d39a02fc7a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGZ1bm55fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
  ]
})

</script>

