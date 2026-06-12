<template>
  <nav>
    <!-- 🔝 Уровень 1: Тонкий Top-Bar -->
    <v-app-bar 
      app 
      flat 
      height="40" 
      color="#1e293b"
      class="top-app-bar px-4 d-none d-md-flex"
    >
      <v-container class="d-flex align-center h-100 pa-0 max-width-container">
        <!-- 📞 Телефоны -->
        <v-menu location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-phone-in-talk" variant="text" size="small" class="top-menu-btn text-white">
              {{ phones[0] }}
            </v-btn>
          </template>
          <v-list class="rounded-lg elevation-4 mt-1">
            <v-list-item
              v-for="(phone, i) in phones"
              :key="i"
              :prepend-icon="i === 0 ? 'mdi-star' : 'mdi-cellphone'"
              :title="phone"
              @click="callPhone(phone)"
              class="hover-bg"
            />
          </v-list>
        </v-menu>

        <v-spacer />

        <!-- 🌐 Переключатель языка -->
        <SwitchLocale class="mx-2 top-switch-locale" />

        <!-- 👤 Кабинет -->
        <v-btn
          prepend-icon="mdi-account-circle"
          variant="text"
          size="small"
          class="top-menu-btn text-white ml-2"
          href="https://my.happylink.net.ua"
          target="_blank"
        >
          {{ $t("menu.cabinet") }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- 🔻 Уровень 2: Основная Шапка -->
    <v-app-bar
      app
      height="72"
      color="secondary"
      class="main-app-bar px-4 elevation-2"
    >
      <v-container class="d-flex align-center h-100 pa-0 max-width-container">
        <!-- 🍔 Бургер для мобильных -->
        <div
          v-if="$vuetify.display.mdAndDown"
          @click.stop="drawer = !drawer"
          class="custom-icon-button"
        >
          <div :class="['icon-line', 'line1', { open: drawer }]"></div>
          <div :class="['icon-line', 'line2', { open: drawer }]"></div>
          <div :class="['icon-line', 'line3', { open: drawer }]"></div>
        </div>

        <!-- 🚀 Лого -->
        <v-img
          src="@/assets/logo/happylinkLogo.svg"
          class="logo cursor-pointer"
          :class="$vuetify.display.mdAndDown ? 'mx-auto' : 'mr-4'"
          @click="$router.push('/')"
          @mouseenter="logoHover = true"
          @mouseleave="logoHover = false"
          :style="{ transform: logoHover ? 'scale(1.05)' : 'scale(1)' }"
          min-height="140"
          min-width="180"
          max-height="140"
          max-width="180"
        />

        <v-spacer v-if="$vuetify.display.lgAndUp" />

        <!-- 💻 Десктопная Навигация (Группировка) -->
        <div v-if="$vuetify.display.lgAndUp" class="d-flex align-center h-100">
          
          <!-- Dropdown: Послуги -->
          <v-menu v-model="menuStates.services" open-on-hover offset-y transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props" 
                variant="text" 
                class="main-menu-btn text-none font-weight-medium mx-1" 
                append-icon="mdi-chevron-down"
                :class="{ 'active-group': isGroupActive(servicesGroup) }"
              >
                {{ $t('menu.home') }}
              </v-btn>
            </template>
            <v-list elevation="3" class="rounded-lg mt-1 menu-dropdown">
              <v-list-item
                v-for="item in servicesGroup"
                :key="item.route"
                :to="item.route"
                :prepend-icon="item.icon"
                class="hover-bg"
                :class="{ 'active-menu-item': isActive(item.route) }"
                @click="menuStates.services = false"
              >
                <v-list-item-title class="font-weight-medium">{{ $t(item.text) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- Dropdown: Для бізнесу -->
          <v-menu v-model="menuStates.business" open-on-hover offset-y transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props" 
                variant="text" 
                class="main-menu-btn text-none font-weight-medium mx-1" 
                append-icon="mdi-chevron-down"
                :class="{ 'active-group': isGroupActive(businessGroup) }"
              >
                {{ $t('menu.business') }}
              </v-btn>
            </template>
            <v-list elevation="3" class="rounded-lg mt-1 menu-dropdown">
              <v-list-item
                v-for="item in businessGroup"
                :key="item.route"
                :to="item.route"
                :prepend-icon="item.icon"
                class="hover-bg"
                :class="{ 'active-menu-item': isActive(item.route) }"
                @click="menuStates.business = false"
              >
                <v-list-item-title class="font-weight-medium">{{ $t(item.text) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- Dropdown: Клієнтам -->
          <v-menu v-model="menuStates.clients" open-on-hover offset-y transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props" 
                variant="text" 
                class="main-menu-btn text-none font-weight-medium mx-1" 
                append-icon="mdi-chevron-down"
                :class="{ 'active-group': isGroupActive(clientsGroup) }"
              >
                {{ $t('menu.for-subscriber') }}
              </v-btn>
            </template>
            <v-list elevation="3" class="rounded-lg mt-1 menu-dropdown">
              <v-list-item
                v-for="item in clientsGroup"
                :key="item.route"
                :to="item.route"
                :prepend-icon="item.icon"
                class="hover-bg"
                :class="{ 'active-menu-item': isActive(item.route) }"
                @click="menuStates.clients = false"
              >
                <v-list-item-title class="font-weight-medium">{{ $t(item.text) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- Прямые ссылки -->
          <v-btn
            v-for="item in singleItems"
            :key="item.route"
            variant="text"
            class="main-menu-btn text-none font-weight-medium mx-1"
            :class="{ 'active-menu-item': isActive(item.route) }"
            :to="item.route"
          >
            {{ $t(item.text) }}
          </v-btn>

          <!-- BuzzMenu -->
          <BuzzMenu class="ms-2" />
        </div>

        <v-spacer v-if="$vuetify.display.mdAndDown" />

        <!-- 🛒 Кошик -->
        <v-btn
          icon
          variant="text"
          class="cart-btn position-relative ml-md-4 ml-0"
          @click="cartStore.toggleCart(true)"
        >
          <v-badge :content="cartStore.totalItems" color="error" v-if="cartStore.totalItems > 0">
            <v-icon size="large" color="#2c3e50">mdi-cart-outline</v-icon>
          </v-badge>
          <v-icon size="large" color="#2c3e50" v-else>mdi-cart-outline</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- 📱 Мобильное меню -->
    <v-navigation-drawer
      v-if="$vuetify.display.mdAndDown"
      v-model="drawer"
      location="left"
      width="300"
      class="mobile-drawer"
    >
      <v-container class="py-6 d-flex flex-column justify-space-between fill-height">
        <div class="flex-grow-1 w-100 mt-2">
          


          <!-- Сворачиваемые категории -->
          <v-expansion-panels v-model="openPanels" multiple elevation="0" class="mobile-panels">
            <v-expansion-panel
              v-for="(items, key, index) in categories"
              :key="key"
              class="mb-2 rounded-lg"
            >
              <v-expansion-panel-title class="category-header py-3 px-4">
                <v-icon :icon="items.icon" size="small" class="me-3" color="#1e293b" />
                <span class="category-title text-body-1">{{ $t(items.title) }}</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text class="pa-0">
                <v-list class="pt-0">
                  <v-list-item
                    v-for="item in items.children"
                    :key="item.route"
                    :prepend-icon="item.icon"
                    :to="item.route"
                    class="mobile-menu-item mx-2"
                    :class="{ 'active-mobile-item': isActive(item.route) }"
                    @click="drawer = false"
                  >
                    <v-list-item-title class="text-body-2">{{ $t(item.text) }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider class="my-5 mx-4" />

          <!-- 💼 Кабинет -->
          <v-list class="px-2">
            <v-list-item
              prepend-icon="mdi-account-circle"
              href="https://my.happylink.net.ua"
              target="_blank"
              class="mobile-cabinet-btn rounded-lg text-white"
            >
              <v-list-item-title class="font-weight-bold text-body-1">
                {{ $t("menu.cabinet") }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          


        </div>

        <!-- ⚖️ Копирайт -->
        <v-card-text class="text-center text-caption mt-6 pb-0 px-0 w-100">
          <div class="text-grey-darken-1">{{ $t("footer.all-rights-reserved") }} © 2014 - {{ new Date().getFullYear() }}</div>
          <strong class="text-uppercase mt-1 d-block">
            <span class="font-weight-light text-grey">Happy</span>
            <span style="color: #fed100">link</span>
          </strong>
        </v-card-text>
      </v-container>
    </v-navigation-drawer>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'

const route = useRoute()
const cartStore = useCartStore()

const drawer = ref(false)
const logoHover = ref(false)
const phones = ["(067) 131-90-72", "(073) 131-90-72", "(099) 189-37-10"]
const openPanels = ref([0])

const menuStates = ref({
  services: false,
  business: false,
  clients: false
})

// Группировка для десктопа
const servicesGroup = [
  { text: "menu.internet", route: "/price/internet-price", icon: "mdi-microsoft-internet-explorer" },
  { text: "menu.tv-list", route: "/price/tv-list", icon: "mdi-youtube-tv" },
  { text: "menu.intercom", route: "/price/intercom-price", icon: "mdi-doorbell-video" },
  { text: "menu.service", route: "/service/test", icon: "mdi-account-wrench-outline" },
]

const businessGroup = [
  { text: "menu.business_internet", route: "/business", icon: "mdi-earth" },
  { text: "menu.developers", route: "/business/developers", icon: "mdi-domain" },
  { text: "menu.office_networks", route: "/business/office-networks", icon: "mdi-lan" },
]

const clientsGroup = [
  { text: "menu.promo", route: "/promotions", icon: "mdi-gift-outline" },
  { text: "menu.coverage-map", route: "/coverage-map", icon: "mdi-map-marker-radius-outline" },
  { text: "menu.payment", route: "/payment-methods", icon: "mdi-credit-card-outline" },
  { text: "faq.title", route: "/faq", icon: "mdi-frequently-asked-questions" },
  { text: "menu.news", route: "/blog", icon: "mdi-newspaper-variant-outline" },
]

const singleItems = [
  { text: "menu.device", route: "/shop", icon: "mdi-router-wireless" },
  { text: "menu.contact", route: "/contact", icon: "mdi-contacts-outline" },
]

// Категории для мобильного меню (как было)
const categories = {
  rates: {
    title: "menu.home",
    icon: "mdi-home-outline",
    children: [
      { text: "menu.internet", route: "/price/internet-price", icon: "mdi-microsoft-internet-explorer" },
      { text: "menu.tv-list", route: "/price/tv-list", icon: "mdi-youtube-tv" },
      { text: "menu.intercom", route: "/price/intercom-price", icon: "mdi-doorbell-video" },
    ],
  },
  business: {
    title: "menu.business",
    icon: "mdi-briefcase-outline",
    children: [
      { text: "menu.business_internet", route: "/business", icon: "mdi-earth" },
      { text: "menu.developers", route: "/business/developers", icon: "mdi-domain" },
      { text: "menu.office_networks", route: "/business/office-networks", icon: "mdi-lan" },
    ],
  },
  services: {
    title: "menu.service",
    icon: "mdi-wrench-outline",
    children: [
      { text: "menu.service", route: "/service/test", icon: "mdi-account-wrench-outline" },
      { text: "menu.device", route: "/shop", icon: "mdi-router-wireless" },
    ],
  },
  subscribers: {
    title: "menu.for-subscriber",
    icon: "mdi-account-outline",
    children: [
      { text: "menu.payment", route: "/payment-methods", icon: "mdi-currency-uah" },
      { text: "menu.promo", route: "/promotions", icon: "mdi-bullhorn-outline" },
      { text: "menu.loyalty-program", route: "/loyalty-program", icon: "mdi-star-outline" },
      { text: "faq.title", route: "/faq", icon: "mdi-help" },
      { text: "menu.coverage-map", route: "/coverage-map", icon: "mdi-map-search-outline" },
    ],
  },
  company: {
    title: "menu.about",
    icon: "mdi-office-building-outline",
    children: [
      { text: "menu.about", route: "/about", icon: "mdi-script-text-outline" },
      { text: "menu.news", route: "/blog", icon: "mdi-newspaper-variant-outline" },
      { text: "menu.contact", route: "/contact", icon: "mdi-contacts-outline" },
      { text: "menu.docs", route: "/docs", icon: "mdi-file-document-check-outline" },
    ],
  },
}

const isActive = (r) => route.path === r
const isGroupActive = (group) => group.some(item => route.path === item.route)
const callPhone = (phone) => { window.location.href = "tel:" + phone.replace(/[^\d]/g, "") }
</script>

<style scoped>
.max-width-container {
  max-width: 1440px;
  margin: 0 auto;
}

/* Верхний бар */
.top-app-bar {
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.top-menu-btn {
  opacity: 0.85;
  transition: opacity 0.3s;
}
.top-menu-btn:hover {
  opacity: 1;
  color: #fed100 !important;
}

/* Основной бар */
.main-app-bar {
  z-index: 998;
  top: 40px !important; /* Учитываем высоту top-bar на десктопе */
}
@media (max-width: 959px) {
  .main-app-bar {
    top: 0 !important; /* На мобилках верхнего бара нет */
  }
}

/* Лого */
.logo {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Десктоп Кнопки Меню */
.main-menu-btn {
  color: #334155 !important;
  border-radius: 8px;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
}
.main-menu-btn:hover {
  background-color: rgba(0,0,0,0.03);
  color: #1e293b !important;
}
.active-menu-item {
  color: #1e293b !important;
  font-weight: 800 !important;
  background-color: rgba(255, 255, 255, 0.4);
}
.active-group {
  color: #1e293b !important;
  font-weight: 800 !important;
}

/* Выпадающее меню */
.menu-dropdown {
  border: 1px solid rgba(0,0,0,0.05);
}

/* Корзина */
.cart-btn {
  transition: transform 0.2s ease;
}
.cart-btn:hover {
  transform: scale(1.1);
}

/* Бургер */
.custom-icon-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 44px;
  height: 38px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
}
.icon-line {
  width: 100%;
  height: 3px;
  background: #1e293b !important;
  border-radius: 3px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 { transform-origin: left top; }
.line3 { transform-origin: left bottom; }
.open.line1 { transform: rotate(45deg) translate(5px, 5px); }
.open.line2 { opacity: 0; }
.open.line3 { transform: rotate(-45deg) translate(5px, -5px); }

/* Мобильное меню */
.mobile-drawer {
  background: #f8fafc;
  border-right: none;
  box-shadow: 2px 0 12px rgba(0,0,0,0.05);
}
.mobile-panels .v-expansion-panel {
  background-color: transparent !important;
}
.mobile-panels .v-expansion-panel-title {
  min-height: 48px;
  color: #1e293b;
}
.mobile-panels .v-expansion-panel-title--active {
  color: #eab308;
  font-weight: bold;
}

.mobile-menu-item {
  border-radius: 8px;
  margin-bottom: 4px;
  padding: 8px 12px;
  transition: all 0.2s ease;
  color: #475569;
}
.mobile-menu-item:hover {
  background: rgba(0,0,0,0.03);
  transform: translateX(4px);
}
.active-mobile-item {
  background: rgba(254, 209, 0, 0.1) !important;
  color: #b45309 !important;
  font-weight: 600;
}

/* Мобильная кнопка Кабинет */
.mobile-cabinet-btn {
  background: linear-gradient(135deg, #1e293b, #334155);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(30, 41, 59, 0.2);
}
.mobile-cabinet-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 41, 59, 0.3);
}

/* Эффекты наведения (Hover) */
.hover-bg:hover {
  background-color: rgba(0,0,0,0.03);
  color: #eab308;
}
</style>
