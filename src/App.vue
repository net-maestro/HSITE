<template>
  <v-app>
    <v-main>
      <TwoLevelFixedToolbar />
      <v-layout>
        <v-main>
          <RouterView />
          <Breadcrumbs />
        </v-main>
      </v-layout>
      <BinotelWidget/>
      <ScrollButton />
      <Footer />
      <PreloaderLink2 />
      <CartDrawer />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadFromStorage()
})
</script>

<style>

/* media */
@media (max-width: 600px) {
  .v-navigation-drawer {
    top: 0 !important;
    z-index: 950 !important;
    height: 100vh !important;
    overflow-y: auto;
    opacity: 0.98;
  }
  .v-navigation-drawer__scrim {
    z-index: 930 !important;
    height: 300%;
  }
  .v-main {
    margin-top: -5px !important;
    --v-layout-bottom: 0 !important;
  }
}

/* all */
.v-container {
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
}
/* .v-card-subtitle{
  opacity:unset;
} */

.test-link {
  font-size: 17;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

.phone-link {
  text-decoration: none;
  font-size: 15;
  font-weight: 400;
  /* color: #1976d2; */
  color: #00796B;
}
.connect_link {
  text-decoration: none;
  font-weight: 400;
  color: #ffffff;
}
.connect_head {
  color: #7e7e7e;
}
.subtitle-slider {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
  text-align: center;
  color: black;
  font-weight: bold;
}

.subtitle-slider::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(1);
  background-color: #49cbd6;
  transform-origin: center;
  transition: transform 0.25s ease-out;
}

/* paralax */
.parallax-container {
  background-image: url("@/assets/about-company/service-provider.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* card-price card-product */
.op {
  opacity: 0.93 !important;
}
.op5 {
  opacity: 0.5 !important;
}
.price-card {
  padding: 0;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.price-card:hover {
  transform: scale(1.05);
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
}

.price {
  font-size: 1.5rem;
  color: #ff5722;
}

.currency {
  font-size: 1.2rem;
  vertical-align: top;
}

.amount {
  font-weight: bold;
}

.frequency {
  font-size: 1rem;
  color: #888;
  margin-left: 0.25rem;
}

.speed,
.data-limit {
  font-size: 1.3rem;
  color: #4caf50;
  font-weight: 500;
  font-family: Roboto-Medium;
}

.rounded-pill {
  border-radius: 50px;
}

/* card-animate-X */
.card-animate-left,
.card-animate-right {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

.card-animate-left {
  transform: translateX(-110px);
  animation-name: slideInLeft;
}

.card-animate-right {
  transform: translateX(110px);
  animation-name: slideInRight;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* card-animate-Y*/

.card-animate {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(110px);
  animation: slideUp 1s forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.card-animate-out {
  opacity: 1;
  transform: translateY(0);
  animation: slideDown 0.7s forwards;
}
@keyframes slideDown {
  to {
    opacity: 0;
    transform: translateY(110px);
    display: none;
  }
}

.v-main {
    background-color:#f8f9fa; /* #f8f9fa #f5f5dc #e6f7ff  #f3f4f8 #42A5F5*/
}


/* Цвета для разных тарифов */
.standard-tariff {
  background-color: #e3f2fd; /* Голубой для Стандарта */
  border: 1px solid #90caf9;
 }
 .lux-tariff {
  background-color: #fff8e1; /* Светло-золотистый для Люкса */
  border: 1px solid #ffecb3; /* Немного более насыщенный золотистый для границы */
 }
 .economy-tariff {
  background-color: #e8f5e9; /* Зеленый для Эконома */
  border: 1px solid #a5d6a7;
 }

 .rounded-card {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.rounded-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
