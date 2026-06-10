<template lang="">
    <div>
        <Shop :devices="devices"/>
    </div>
</template>
<script>
import Shop from '@/views/Shop.vue';
export default {
    components: {
        Shop
    },
    data() {
        return {
            devices: [
      {
        name: 'TP-LINK Archer C54',
        category: 'WI-FI Роутери',
        img: `http://happylink.net.ua/static/shop/archerc54.jpg`, 
        rating: 5,
        price: 1150,
        Info: `<div class="spec">
            <span class="spec-title">Тип:</span>
            <span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span>
        </div>
        <div class="spec">
            <span class="spec-title">Стандарт бездротового зв’язку:</span>
            <span class="spec-value">Wi-Fi 802.11 b / g / n / a / ac</span>
        </div>
        <div class="spec">
            <span class="spec-title">Інтерфейс підключення (LAN-порт):</span>
            <span class="spec-value">4x 10/100 Ethernet</span>
        </div>
        <div class="spec">
            <span class="spec-title">Вхід (WAN-порт):</span>
            <span class="spec-value">1x 10/100 Ethernet</span>
        </div>`,
      },
      {
        name: 'TP-LINK Archer C64',
        category: 'WI-FI Роутери',
        img: `http://happylink.net.ua/static/shop/archerc64.jpg`, 
        rating: 5,
        price: 1600,
        Info: `<div class="spec">
            <span class="spec-title">Тип:</span>
            <span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span>
        </div>
        <div class="spec">
            <span class="spec-title">Стандарт бездротового зв’язку:</span>
            <span class="spec-value">Wi-Fi 802.11 b / g / n / a / ac</span>
        </div>
        <div class="spec">
            <span class="spec-title">Інтерфейс підключення (LAN-порт):</span>
            <span class="spec-value">4x 10/100/1000 Ethernet</span>
        </div>
        <div class="spec">
            <span class="spec-title">Вхід (WAN-порт):</span>
            <span class="spec-value">1x 10/100/1000 Ethernet</span>
        </div>`,
      },
      {
        name: 'TP-LINK Archer AX20',
        category: 'WI-FI Роутери',
        img: `http://happylink.net.ua/static/shop/ax20.jpg`, 
        rating: 4,
        price: 2999,
        Info: `<div class="spec">
            <span class="spec-title">Тип:</span>
            <span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span>
        </div>
        <div class="spec">
            <span class="spec-title">Стандарт бездротового зв’язку:</span>
            <span class="spec-value">WiFi 6 (802.11 g/n/ac/ax)</span>
        </div>
        <div class="spec">
            <span class="spec-title">Інтерфейс підключення (LAN-порт):</span>
            <span class="spec-value">4x 10/100/1000 Ethernet</span>
        </div>
        <div class="spec">
            <span class="spec-title">Вхід (WAN-порт):</span>
            <span class="spec-value">1x 10/100/1000 Ethernet</span>
        </div>`,
      },
      {
        name: 'Mikrotik hAP ac²',
        category: 'WI-FI Роутери',
        img: `http://happylink.net.ua/static/shop/mikrotik.jpg`, 
        rating: 3,
        price: 2975,
        Info: `<div class="spec">
          <span class="spec-title">Тип:</span>
          <span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span>  
          </div>
          <div class="spec">
          <span class="spec-title">Стандарт бездротового зв’язку</span>
          <span class="spec-value">Wi-Fi 802.11 b / g / n / a / ac</span>  
          </div>
          <div class="spec">
          <span class="spec-title">Інтерфейс підключення (LAN-порт)</span>
          <span class="spec-value">5x 10/100/1000 Ethernet</span>  
          </div>
          <div class="spec">
          <span class="spec-title">Процесор</span>
          <span class="spec-value">частотою 716 MHz</span>  
          </div>
           <div class="spec">
          <span class="spec-title">ОЗУ</span>
          <span class="spec-value">частотою 716 MHz</span>  
          </div>
           <div class="spec">
          <span class="spec-title">USB порт</span>
          <span class="spec-value">наявний</span>  
          </div>
          `
        },
    ]
        }
    },
    
}
</script>
<style scoped>
.v-card-title{white-space: none;}
</style>