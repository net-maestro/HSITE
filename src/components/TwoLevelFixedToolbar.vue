<template>
  <nav>
    <!-- 🔝 Верхний тулбар -->
    <v-app-bar app flat color="secondary" class="main-app-bar px-4">
      <!-- 🍔 Бургер -->
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
        lazy-src="@/assets/logo/happylinkLogo.svg"
        class="logo mx-4 cursor-pointer"
        @click="$router.push('/')"
        @mouseenter="logoHover = true"
        @mouseleave="logoHover = false"
        :style="{ transform: logoHover ? 'scale(1.05)' : 'scale(1)' }"
        min-height="120"
        min-width="150"
        max-height="120"
        max-width="150"
      />

      <!-- 📞 Телефоны -->
      <div class="hidden-sm-and-down">
        <v-menu location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-phone-in-talk" variant="text" class="menu-btn">
              {{ phones[0] }}
            </v-btn>
          </template>
          <v-list>
           

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
      </div>

      <v-spacer />

      <!-- 🌐 Переключатель языка -->
      <SwitchLocale class="mx-2" />

      <!-- 👤 Кабинет -->
      <v-btn
        prepend-icon="mdi-account-circle"
        variant="text"
        class="menu-btn hidden-sm-and-down"
        href="https://my.happylink.net.ua"
        target="_blank"
      >
        {{ $t("menu.cabinet") }}
      </v-btn>
    </v-app-bar>

    <!-- 🔻 Второй уровень -->
    <v-app-bar
      v-if="$vuetify.display.mdAndUp"
      app
      height="56"
      color="white"
      class="sub-app-bar px-4"
    >
      <v-spacer />
      <v-btn
        v-for="item in menuItems"
        :key="item.text"
        variant="text"
        class="sub-menu-btn"
        :class="{ 'active-menu-item': isActive(item.route) }"
        @click="$router.push(item.route)"
      >
        {{ $t(item.text) }}
        <v-icon
          v-if="item.icon"
          size="small"
          class="ms-1"
          :class="{ 'rotate-icon': isActive(item.route) }"
        >
          {{ item.icon }}
        </v-icon>
      </v-btn>
      <BuzzMenu class="ms-2" />
      <v-spacer />
    </v-app-bar>

    <!-- 📱 Мобильное меню -->
    <v-navigation-drawer
      v-if="$vuetify.display.mdAndDown"
      v-model="drawer"
      location="left"
      width="300"
      class="mobile-drawer"
    >
      <v-container class="py-6 mt-10 d-flex flex-column justify-space-between fill-height">
        <div class="flex-grow-1">
          <!-- Сворачиваемые категории -->
          <v-expansion-panels v-model="openPanels" multiple elevation="0">
            <v-expansion-panel
              v-for="(items, key, index) in categories"
              :key="key"
            >
              <v-expansion-panel-title class="category-header">
                <v-icon :icon="items.icon" size="small" class="me-2" color="#2c3e50" />
                <span class="category-title">{{ $t(items.title) }}</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list>
                  <v-list-item
                    v-for="item in items.children"
                    :key="item.text"
                    :prepend-icon="item.icon"
                    @click="$router.push(item.route)"
                    class="mobile-menu-item"
                  >
                    <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider class="my-5" />

          <!-- 💼 Кабинет -->
          <v-list>
            <v-list-item
              prepend-icon="mdi-account-multiple-outline"
              href="https://my.happylink.net.ua"
              target="_blank"
              class="mobile-menu-item"
            >
              <v-list-item-title class="font-weight-bold">
                {{ $t("menu.cabinet") }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>

        <!-- ⚖️ Копирайт -->
        <v-card-text class="text-center text-caption mt-2">
          {{ $t("footer.all-rights-reserved") }} © 2014 - {{ new Date().getFullYear() }}
          <strong class="text-uppercase">
            <span class="font-weight-light text-grey">Happy</span>
            <span class="text-yellow-darken-2">link</span>
          </strong>
        </v-card-text>
      </v-container>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data: () => ({
    drawer: false,
    logoHover: false,
    phones: ["(067) 131-90-72", "(073) 131-90-72", "(099) 189-37-10"],
    // индексы открытых панелей (0 - первая, 1 - вторая и т.д.)
    openPanels: [0], // по умолчанию открыты первая и третья категории
    menuItems: [
      { text: "menu.internet", route: "/price/internet-price", icon: "mdi-speedometer" },
      { text: "menu.tv-list", route: "/price/tv-list", icon: "mdi-television" },
      { text: "menu.intercom", route: "/price/intercom-price", icon: "mdi-doorbell-video" },
      { text: "menu.service", route: "/service/test", icon: "mdi-wrench" },
      { text: "menu.coverage-map", route: "/coverage-map", icon: "mdi-map-marker-radius" },
      { text: "menu.promo", route: "/promotions", icon: "mdi-gift" },
      { text: "menu.news", route: "/blog", icon: "mdi-newspaper" },
      { text: "menu.device", route: "/shop", icon: "mdi-router-wireless" },
      { text: "menu.payment", route: "/payment-methods", icon: "mdi-credit-card" },
    ],
    categories: {
      rates: {
        title: "menu.rates",
        icon: "mdi-tag-multiple-outline",
        children: [
          { text: "menu.internet", route: "/price/internet-price", icon: "mdi-microsoft-internet-explorer" },
          { text: "menu.tv-list", route: "/price/tv-list", icon: "mdi-youtube-tv" },
          { text: "menu.intercom", route: "/price/intercom-price", icon: "mdi-doorbell-video" },
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
    },
  }),
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    callPhone(phone) {
      window.location.href = "tel:" + phone.replace(/[^\d]/g, "");
    },
  },
};
</script>


<style scoped>
/* Основной бар */
.main-app-bar {
  z-index: 998;
  position: fixed;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* Второй бар */
.sub-app-bar {
  z-index: 999;
  position: fixed;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.03);
}

/* Лого */
.logo {
  min-height: 80px;
  min-width: 120px;
  max-height: 80px;
  max-width: 120px;
  transition: transform 0.2s ease;
}

/* Кнопки */
.menu-btn {
  color: #2c3e50 !important;
  border-radius: 12px;
  font-weight: 500;
}
.sub-menu-btn {
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.80rem;
  color: #546e7a !important;
}

/* Бургер */
.custom-icon-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48px;
  height: 42px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
}
.icon-line {
  width: 100%;
  height: 4px;
  background: #000 !important;
  border-radius: 3px;
  transition: 0.3s;
}
.line1 { transform-origin: left top; }
.line3 { transform-origin: left bottom; }
.open.line1 { transform: rotate(45deg) translate(6px, 6px); }
.open.line2 { opacity: 0; }
.open.line3 { transform: rotate(-45deg) translate(6px, -6px); }

/* Активный пункт */
.active-menu-item {
  background: #fff5e6 !important;
  color: #26a69a !important;
}

/* Мобильное меню */
.mobile-drawer {
  background: #fff;
  border-right: 1px solid #eee;
}
.category-header {
  display: flex;
  align-items: center;
}
.category-title {
  font-weight: 600;
  font-size: 1.1rem;
}
.mobile-menu-item {
  border-radius: 12px;
  margin-bottom: 6px;
  padding: 10px 14px;
  transition: all 0.25s;
}
.mobile-menu-item:hover {
  background: #fff5e6 !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.mobile-menu-item .v-list-item-title {
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
}
</style>
