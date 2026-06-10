<template>
    <div class="language-switcher">
      <v-btn
        class="phone-link"
        @click="toggleLocale"
      >
        {{ currentLocale.toUpperCase() }}
      </v-btn>
    </div>
  </template>
  

  <script>
  export default {
    name: 'SwitchLocale',
    data() {
      return {
        currentLocale: this.$i18n.locale
      };
    },
    methods: {
      toggleLocale() {
      this.currentLocale = this.currentLocale === 'ua' ? 'en' : 'ua'; // переключаем язык
      this.$i18n.locale = this.currentLocale; // изменяем локаль приложения
    }
    }
  };
  </script>
  
 
  