<template>
    <div style="z-index: 997;position: fixed;bottom: 70px;left: 30px;">
      <v-btn 
       v-if="showButton" 
       fab  
       dark
       size="large"
       class="op5"
       icon="mdi-chevron-up"
       text="Top"
       @click="scrollToTop"
       >
      </v-btn>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  export default {
    setup() {
      const showButton = ref(false);
  
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        showButton.value = scrollTop > 250; // Show button after scrolling 200px
      };
  
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  
      onMounted(() => {
        window.addEventListener('scroll', handleScroll);
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
      });
  
      return {
        showButton,
        scrollToTop,
      };
    },
  };
  </script>
  