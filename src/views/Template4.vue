<template>
  <v-container v-if="$vuetify.display.mdAndDown">
  <!-- Тарифи -->
  <v-col cols="12">
    <v-card-subtitle class="subtitle-slider text-center text-h6 text-uppercase my-2">
      {{ $t("menu.rates") }}
    </v-card-subtitle>

    <v-row hover data-aos="zoom-in" data-aos-easing="ease">
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/price/internet-price"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-microsoft-internet-explorer</v-icon>
          <div class="test-link">
            {{ $t('menu.internet') }}
          </div>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/price/intercom-price"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-doorbell-video</v-icon>
          <div class="test-link">
            {{ $t('menu.intercom') }}
          </div>
        </v-card>
      </v-col>
      
      <v-col cols="12">
        <v-card
          class="pa-3 text-center"
          to="/price/tv-list"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-youtube-tv</v-icon>
          <div class="test-link">
            {{ $t('menu.tv-list') }}
          </div>
        </v-card>
      </v-col>
     
    </v-row>
  </v-col>
  
  <!-- Послуги -->
  <v-col cols="12">
    <v-card-subtitle class="subtitle-slider text-center text-h6 text-uppercase my-2">
      {{ $t("menu.service") }}
    </v-card-subtitle>

    <v-row hover data-aos="zoom-in" data-aos-easing="ease">
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/service/test"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-account-wrench-outline</v-icon>
          <div class="test-link">
            {{ $t('menu.service') }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/shop"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-router-wireless</v-icon>
          <div class="test-link">
            {{ $t('menu.device') }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-col>

  <!-- Інше -->
  <v-col cols="12">
    <v-card-subtitle class="subtitle-slider text-center text-h6 text-uppercase my-2">
      {{ $t("menu.other") }}
    </v-card-subtitle>

    <v-row hover data-aos="zoom-in" data-aos-easing="ease">
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/promo"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-bullhorn-outline</v-icon>
          <div class="test-link">
            {{ $t('menu.promo') }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/blog"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-newspaper-variant-outline</v-icon>
          <div class="test-link">
            {{ $t('menu.news') }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/about"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-script-text-outline</v-icon>
          <div class="test-link">
            {{ $t('menu.about-company') }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-3 text-center"
          to="/contact"
          rounded="lg"
          hover
          elevation="3"
          style="background-color: #FED100;"
        >
          <v-icon size="36" color="white">mdi-contacts-outline</v-icon>
          <div class="test-link">
            {{ $t('menu.contact') }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</v-container>


  <div  v-else >
  <AllInternetPrice/>
     <Slider />
    <Promo />
    <TestService />
    <Shop :devices="firstThreeItems" />
    <Blog />
  </div>
<PreloaderLink/>
</template>

<script>
import Blog from "@/views/Blog.vue";
import Shop from "@/views/Shop.vue";
import Promo from "@/views/Promo.vue";
import TestService from "@/views/services/TestService.vue";
import PreloaderLink from "@/components/PreloaderLink.vue";
import AllInternetPrice from "./prices/AllInternetPrice.vue";
export default {
  name: "MenuTiles",
  components: {
    AllInternetPrice,
    Blog,
    Promo,
    Shop,
    TestService,
    PreloaderLink
  },
  data() {
    return {
      devices: [
        {
          name: "TP-LINK Archer C54",
          category: "WI-FI Роутери",
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
          name: "TP-LINK Archer C64",
          category: "WI-FI Роутери",
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
          name: "TP-LINK Archer AX20",
          category: "WI-FI Роутери",
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
          name: "Mikrotik hAP ac² (RBD52G-5HacD2HnD-TC)",
          category: "WI-FI Роутери",
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
          `,
        },
        {
          name: "Абонентський термінал XPON",
          category: "PON",
          img: "",
          rating: 3,
          price: 600,
          Info: "",
        },
        {
          name: "Кабель вита пара",
          category: "Кабель",
          img: "",
          rating: 3,
          price: 700,
          Info: "",
        },
      ],
    };
  },
  computed: {
    firstThreeItems() {
      return this.devices.slice(0, 3);
    },
  },
};
</script>
