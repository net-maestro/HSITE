<template>
 <v-container v-if="$vuetify.display.mdAndDown">

    <v-bottom-navigation
        
          background="white"
          color="brown"
        >
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
            <span class="f-menu">Домашня</span>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-grid</v-icon>
            <span class="f-menu">Тарифи</span>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-phone</v-icon>
            <span class="f-menu">Контакти</span>
          </v-btn>
          <v-btn icon  @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
            <span class="f-menu">Інше</span>
          </v-btn>
          <div
        variant="text"
        @click.stop="drawer = !drawer"
       
        class="custom-icon-button"
      >
        <div :class="{ 'icon-line': true, line1: true, open: drawer }"></div>
        <div :class="{ 'icon-line': true, line2: true, open: drawer }"></div>
        <div :class="{ 'icon-line': true, line3: true, open: drawer }"></div>
      </div>
        </v-bottom-navigation>
 </v-container>
  
  </template>
  

<script>
export default {
  name: "MobileFooter",
  data: () => ({
    isMobile: false,
    drawer: false,
    groupPhone: false,
    open: ["Тарифи"],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    this.checkScreenWidth();
    window.addEventListener("resize", this.checkScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isMobile = window.innerWidth < 600;
    },
  },
};
</script>
  
  <style scoped>
  /* Добавьте стили для текста под иконками */
  .f-menu {
    font-size: 12px;
    color: brown;
  }
  </style>
  