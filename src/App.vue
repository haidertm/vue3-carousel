<template>
  <main>
    <Gallery :images="images" />
  </main>
</template>

<script setup>
import './assets/app.css'; // Here
import { computed } from 'vue';
import Gallery from '@/components/Gallery.vue';

const images = computed(() => {
  // return Object.keys(imageModules).map(path => imageModules[path]());
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

