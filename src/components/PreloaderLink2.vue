<!-- Preloader.vue -->
<template>
  <div class="preloader" v-if="loading">
    <div class="preloader-content">
      <!-- Логотип / Название -->
      <h1 class="brand-title">
        <span
          v-for="(letter, index) in 'HAPPYLINK'"
          :key="index"
          class="letter"
          :style="{ animationDelay: `${index * 0.07}s` }"
        >
          {{ letter }}
        </span>
      </h1>

      <!-- Основная кнопка -->
      <v-btn
        class="main-btn"
        @click="stopLoading"
        prepend-icon="mdi-arrow-right"
        size="x-large"
        rounded="pill"
      >
        {{ $t('preloader.enter-site') }}
      </v-btn>

      <!-- Дополнительные кнопки -->
      <div class="secondary-buttons">
        <v-btn
          v-for="btn in socialButtons"
          :key="btn.icon"
          :href="btn.href"
          :title="btn.title"
          target="_blank"
          class="secondary-btn"
          size="large"
          rounded="pill"
          variant="tonal"
        >
          <v-icon :icon="btn.icon" size="small" class="me-2"></v-icon>
          {{ btn.label }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  data() {
    return {
      loading: true,
      timeoutId: null,
      socialButtons: [
        {
          icon: 'mdi-facebook',
          href: 'https://www.facebook.com/HappyLinkNetUa',
          title: 'Facebook',
          label: 'Facebook'
        },
        {
          icon: 'mdi-message-text',
          href: 'https://t.me/HappyLinkNetUa',
          title: 'Telegram',
          label: 'Telegram'
        },
        {
          icon: 'mdi-account',
          href: 'https://my.happylink.net.ua/autorize.php',
          title: 'Особистий кабінет',
          label: 'Кабінет'
        }
      ]
    };
  },
  mounted() {
    this.timeoutId = setTimeout(() => {
      this.loading = false;
    }, 3500);
  },
  methods: {
    stopLoading(event) {
      event?.preventDefault();
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.preloader-content {
  text-align: center;
  padding: 0 20px;
  max-width: 500px;
  width: 100%;
}

.brand-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 2.8rem;
  letter-spacing: 0.15em;
  margin-bottom: 2.2rem;
  color: white;
  line-height: 1.1;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(12px);
  animation: letterAppear 0.6s ease-out forwards;
}

@keyframes letterAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Основная кнопка */
.main-btn {
  background: linear-gradient(135deg, #fed100, #feb700) !important;
  color: #000 !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 14px 32px !important;
  box-shadow: 0 4px 20px rgba(254, 211, 0, 0.35) !important;
  transition: all 0.3s ease !important;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 320px;
}

.main-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 28px rgba(254, 211, 0, 0.45) !important;
}

/* Второстепенные кнопки */
.secondary-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.08) !important;
  color: white !important;
  text-transform: none !important;
  font-weight: 500 !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  transition: all 0.25s ease !important;
  width: 100%;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-2px);
}

/* Адаптив */
@media (max-width: 600px) {
  .brand-title {
    font-size: 2.2rem;
    letter-spacing: 0.1em;
    margin-bottom: 1.8rem;
  }

  .main-btn,
  .secondary-btn {
    padding: 12px 24px !important;
    font-size: 0.95rem !important;
  }
}
</style>