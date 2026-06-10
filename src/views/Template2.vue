<template>
  <v-container v-if="$vuetify.display.mdAndDown" class="menu-tiles-container">
    <!-- Тарифи -->
    <v-col cols="12" class="mt-1">
      <h2 class="section-title">
        {{ $t("menu.rates") }}
      </h2>

      <v-row class="tiles-row">
        <v-col cols="6" v-for="(item, i) in rateItems" :key="i">
          <v-card
            :to="item.to"
            class="menu-tile card-hover"
            rounded="xl"
            elevation="0"
            :data-aos="animated ? 'fade-up' : null"
            :data-aos-delay="i * 60"
          >
            <div class="accent-bar"></div>
            <div class="tile-content">
              <v-icon :icon="item.icon" size="32" color="black" class="mb-2"></v-icon>
              <div class="tile-label">
                {{ item.label }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <!-- Послуги -->
    <v-col cols="12" class="mt-1">
      <h2 class="section-title">
        {{ $t("menu.service") }}
      </h2>

      <v-row class="tiles-row">
        <v-col cols="6" v-for="(item, i) in serviceItems" :key="i">
          <v-card
            :to="item.to"
            class="menu-tile card-hover"
            rounded="xl"
            elevation="0"
            :data-aos="animated ? 'fade-up' : null"
            :data-aos-delay="i * 60"
          >
            <div class="accent-bar"></div>
            <div class="tile-content">
              <v-icon :icon="item.icon" size="32" color="black" class="mb-2"></v-icon>
              <div class="tile-label">
                {{ item.label }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <!-- Інше -->
    <v-col cols="12" class="mt-1">
      <h2 class="section-title">
        {{ $t("menu.other") }}
      </h2>

      <v-row class="tiles-row">
        <v-col cols="6" v-for="(item, i) in otherItems" :key="i">
          <v-card
            :to="item.to"
            class="menu-tile card-hover"
            rounded="xl"
            elevation="0"
            :data-aos="animated ? 'fade-up' : null"
            :data-aos-delay="i * 60"
          >
            <div class="accent-bar"></div>
            <div class="tile-content">
              <v-icon :icon="item.icon" size="32" color="black" class="mb-2"></v-icon>
              <div class="tile-label">
                {{ item.label }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>

  <!-- Десктопная версия -->
  <div v-else>
    <SliderPromo />
      <TestPrice />
    <Promotions />
    <TestService />
    <Shop :devices="firstThreeItems" />
    <Blog />
  </div>
</template>

<script>
import TestPrice from "./prices/TestPrice.vue";
import Blog from "@/views/Blog.vue";
import Shop from "@/views/Shop.vue";
import Promotions from "@/views/Promotions.vue";
import TestService from "@/views/services/TestService.vue";

export default {
  name: "MenuTiles",
  components: {
    Blog,
    Promotions,
    Shop,
    TestService,
    TestPrice
  },
  props: {
    animated: { type: Boolean, default: true },
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
          Info: `<div class="spec"><span class="spec-title">Тип:</span><span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span></div><div class="spec"><span class="spec-title">Стандарт бездротового зв’язку:</span><span class="spec-value">Wi-Fi 802.11 b / g / n / a / ac</span></div><div class="spec"><span class="spec-title">Інтерфейс підключення (LAN-порт):</span><span class="spec-value">4x 10/100 Ethernet</span></div><div class="spec"><span class="spec-title">Вхід (WAN-порт):</span><span class="spec-value">1x 10/100 Ethernet</span></div>`,
        },
        {
          name: "TP-LINK Archer C64",
          category: "WI-FI Роутери",
          img: `http://happylink.net.ua/static/shop/archerc64.jpg`,
          rating: 5,
          price: 1600,
          Info: `<div class="spec"><span class="spec-title">Тип:</span><span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span></div><div class="spec"><span class="spec-title">Стандарт бездротового зв’язку:</span><span class="spec-value">Wi-Fi 802.11 b / g / n / a / ac</span></div><div class="spec"><span class="spec-title">Інтерфейс підключення (LAN-порт):</span><span class="spec-value">4x 10/100/1000 Ethernet</span></div><div class="spec"><span class="spec-title">Вхід (WAN-порт):</span><span class="spec-value">1x 10/100/1000 Ethernet</span></div>`,
        },
        {
          name: "TP-LINK Archer AX20",
          category: "WI-FI Роутери",
          img: `http://happylink.net.ua/static/shop/ax20.jpg`,
          rating: 4,
          price: 2999,
          Info: `<div class="spec"><span class="spec-title">Тип:</span><span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span></div><div class="spec"><span class="spec-title">Стандарт бездротового зв’язку:</span><span class="spec-value">WiFi 6 (802.11 g/n/ac/ax)</span></div><div class="spec"><span class="spec-title">Інтерфейс підключення (LAN-порт):</span><span class="spec-value">4x 10/100/1000 Ethernet</span></div><div class="spec"><span class="spec-title">Вхід (WAN-порт):</span><span class="spec-value">1x 10/100/1000 Ethernet</span></div>`,
        },
        {
          name: "Mikrotik hAP ac² (RBD52G-5HacD2HnD-TC)",
          category: "WI-FI Роутери",
          img: `http://happylink.net.ua/static/shop/mikrotik.jpg`,
          rating: 3,
          price: 2975,
          Info: `<div class="spec"><span class="spec-title">Тип:</span><span class="spec-value">Гігабітний бездротовий маршрутизатор дводіапазонний</span></div><div class="spec"><span class="spec-title">Стандарт бездротового зв’язку</span><span class="spec-value">Wi-Fi 802.11 b / g / n / a / ac</span></div><div class="spec"><span class="spec-title">Інтерфейс підключення (LAN-порт)</span><span class="spec-value">5x 10/100/1000 Ethernet</span></div><div class="spec"><span class="spec-title">Процесор</span><span class="spec-value">частотою 716 MHz</span></div><div class="spec"><span class="spec-title">ОЗУ</span><span class="spec-value">частотою 716 MHz</span></div><div class="spec"><span class="spec-title">USB порт</span><span class="spec-value">наявний</span></div>`,
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
    rateItems() {
      return [
        { to: "/price/internet-price", icon: "mdi-microsoft-internet-explorer", label: this.$t('menu.internet') },
        { to: "/price/intercom-price", icon: "mdi-doorbell-video", label: this.$t('menu.intercom') },
        { to: "/price/tv-list", icon: "mdi-youtube-tv", label: this.$t('menu.tv-list') },
        { to: "/faq", icon: "mdi-help-circle", label: "FAQ" },
      ];
    },
    serviceItems() {
      return [
        { to: "/service/test", icon: "mdi-account-wrench-outline", label: this.$t('menu.service') },
        { to: "/shop", icon: "mdi-router-wireless", label: this.$t('menu.device') },
      ];
    },
    otherItems() {
      return [
        { to: "/promotions", icon: "mdi-bullhorn-outline", label: this.$t('menu.promo') },
        { to: "/blog", icon: "mdi-newspaper-variant-outline", label: this.$t('menu.news') },
        { to: "/about", icon: "mdi-script-text-outline", label: this.$t('menu.about-company') },
        { to: "/contact", icon: "mdi-contacts-outline", label: this.$t('menu.contact') },
      ];
    },
  },
};
</script>

<style scoped>
.menu-tiles-container {
  padding: 16px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 50px;
  height: 2px;
  /* background: linear-gradient(90deg, #49CBD6, #26A69A); */
  background: linear-gradient(135deg, #fed100, #feb700);
  margin: 6px auto 0;
  border-radius: 1px;
}

.tiles-row {
  margin: 0 -6px;
}

/* Карточка плитки */
.menu-tile {
  height: 100%;
  padding: 16px 8px;
  /* background: linear-gradient(135deg, #49CBD6, #26A69A); */
  background: linear-gradient(135deg, #fed100, #feb700);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.menu-tile:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(38, 166, 154, 0.3);
}

/* Акцентная полоса слева */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.tile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.tile-label {
  color: black;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.3;
  margin-top: 2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.05rem;
    margin-bottom: 12px;
  }

  .menu-tile {
    padding: 14px 6px;
  }

  .tile-label {
    font-size: 0.85rem;
  }
}

/* Hover-эффект */
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
</style>