<!-- BuzzMenu.vue -->
<template>
  <div class="buzz-menu-container">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="bottom end"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-dots-vertical"
          variant="text"
          class="menu-button"
          :class="{ 'buzz-effect': menu }"
        ></v-btn>
      </template>

      <v-card
        class="menu-card"
        rounded="xl"
        elevation="4"
      >
        <!-- Акцентная полоса -->
        <div class="accent-bar"></div>

        <!-- Соцсети -->
        <div class="social-container pa-4">
          <v-btn
            v-for="icon in social"
            :key="icon.icon"
            :icon="icon.icon"
            :href="icon.link"
            class="social-button mx-2"
            variant="tonal"
            size="small"
            :color="getButtonColor(icon.icon)"
            target="_blank"
            rel="noopener"
          ></v-btn>
        </div>

        <v-divider class="mx-4"></v-divider>

        <!-- Быстрые ссылки -->
        <v-list class="py-2">
          <v-list-item
            @click="menu = false"
            class="menu-item"
          >
            <v-btn
              variant="text"
              prepend-icon="mdi-home-search-outline"
              :text="$t('menu.about')"
              to="/about"
              class="menu-link"
            ></v-btn>
          </v-list-item>

          <v-list-item
            @click="menu = false"
            class="menu-item"
          >
            <v-btn
              variant="text"
              prepend-icon="mdi-star-outline"
              :text="$t('menu.loyalty-program')"
              to="/loyalty-program"
              class="menu-link"
            ></v-btn>
          </v-list-item>

             <v-list-item
            @click="menu = false"
            class="menu-item"
          >
            <v-btn
              variant="text"
              prepend-icon="mdi-help"
              :text="$t('faq.title')"
              to="/faq"
              class="menu-link"
            ></v-btn>
          </v-list-item>

          <v-list-item
            @click="menu = false"
            class="menu-item"
          >
            <v-btn
              variant="text"
              prepend-icon="mdi-contacts-outline"
              :text="$t('menu.contact')"
              to="/contact"
              class="menu-link"
            ></v-btn>
          </v-list-item>

          <v-list-item
            @click="menu = false"
            class="menu-item"
          >
            <v-btn
              variant="text"
              prepend-icon="mdi-file-document-check-outline"
              :text="$t('menu.docs')"
              to="/docs"
              class="menu-link"
            ></v-btn>
          </v-list-item>
        </v-list>

        <!-- Кнопка закрытия -->
        <v-card-actions class="pa-4 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="menu = false"
            class="close-button"
          >
            <v-icon icon="mdi-close" size="small"></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "BuzzMenu",
  data() {
    return {
      menu: false,
      social: [
        { icon: 'mdi-facebook', link: 'https://www.facebook.com/HappyLinkNetUa' },
        { icon: 'mdi-account-multiple-outline', link: 'https://my.happylink.net.ua' },
        { icon: 'mdi-wechat', link: 'https://t.me/HappyLinkNetUa' },
      ],
    };
  },
  methods: {
    getButtonColor(icon) {
      switch (icon) {
        case 'mdi-facebook':
          return '#4267B2';
        case 'mdi-account-multiple-outline':
          return '#fed100';
        case 'mdi-wechat':
          return '#00B0F0';
        default:
          return 'grey-lighten-1';
      }
    }
  }
};
</script>

<style scoped>
.buzz-menu-container {
  display: inline-block;
}

.menu-button {
  color: #2c3e50;
  transition: all 0.2s ease;
}

.menu-button:hover {
  color: #26A69A;
}

.menu-card {
  position: relative;
  min-width: 280px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Акцентная полоса сверху */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #49CBD6, #26A69A);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.social-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.social-button {
  transition: all 0.2s ease;
}

.social-button:hover {
  transform: translateY(-2px);
}

.menu-item {
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #f8fbfa;
}

.menu-link {
  width: 100%;
  justify-content: flex-start;
  color: #2c3e50;
  font-weight: 500;
  text-transform: none;
  transition: all 0.2s ease;
}

.menu-link:hover {
  color: #26A69A;
}

.close-button {
  color: #666;
  transition: all 0.2s ease;
}

.close-button:hover {
  color: #2c3e50;
  transform: rotate(90deg);
}

/* Анимация buzz — мягкая и короткая */
.buzz-effect {
  animation: buzz 0.2s ease;
  animation-iteration-count: 2;
}

@keyframes buzz {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-1px) rotate(-2deg); }
  50% { transform: translateX(1px) rotate(2deg); }
  75% { transform: translateX(-1px) rotate(-1deg); }
}

/* Адаптив */
@media (max-width: 600px) {
  .menu-card {
    min-width: 240px;
  }

  .social-button {
    margin: 4px 2px;
  }
}
</style>