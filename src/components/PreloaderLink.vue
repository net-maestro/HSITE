<!-- Preloader.vue -->
<template>
  <div class="preloader" v-if="loading">
    <div class="preloader-content">
   

      <!-- Анимация букв -->
      <div class="letters-wrapper mb-10">
        <span
          class="letter"
          v-for="(letter, index) in 'HAPPYLINK'"
          :key="index"
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          {{ letter }}
        </span>
      </div>

      <!-- Основная кнопка -->
      <v-btn
        class="main-button mb-6"
        @click="stopLoading"
        prepend-icon="mdi-arrow-right"
        size="large"
        rounded="pill"
      >
        {{ $t('preloader.enter-site') }}
      </v-btn>

      <!-- Соцсети иконками -->
      <div class="social-icons">
        <a
          v-for="btn in socialButtons"
          :key="btn.icon"
          :href="btn.href"
          :title="btn.title"
          target="_blank"
          rel="noopener"
          class="social-icon"
        >
          <v-icon :icon="btn.icon" :color="btn.color" size="small"></v-icon>
        </a>
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
          color: '#4267B2'
        },
        {
          icon: 'mdi-wechat',
          href: 'https://t.me/HappyLinkNetUa',
          title: 'Telegram',
          color: '#0088cc'
        },
        {
          icon: 'mdi-account-multiple',
          href: 'https://my.happylink.net.ua/autorize.php',
          title: 'Особистий кабінет',
          color: '#fed100'
        }
      ]
    };
  },
  mounted() {
    this.timeoutId = setTimeout(() => {
      this.loading = false;
    }, 3000);
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
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.preloader-content {
  text-align: center;
  padding: 0 24px;
  color: #ffffff;
}

.logo {
  opacity: 0;
  transform: scale(0.95);
  animation: logoAppear 1s ease-out forwards 0.3s;
}

.letters-wrapper {
  font-family: 'Roboto', 'Helvetica', sans-serif;
  letter-spacing: 0.2em;
  font-weight: 300;
  font-size: 2.5rem;
  line-height: 1.2;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: letterAppear 0.6s ease-out forwards;
}

@keyframes logoAppear {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes letterAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-button {
  background: linear-gradient(135deg, #49CBD6, #26A69A) !important;
  color: white !important;
  font-weight: 500 !important;
  text-transform: none !important;
  padding: 12px 32px !important;
  box-shadow: 0 4px 20px rgba(38, 166, 154, 0.3) !important;
  transition: all 0.3s ease !important;
  letter-spacing: 0.5px;
}

.main-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(38, 166, 154, 0.4) !important;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Адаптив */
@media (max-width: 600px) {
  .letters-wrapper {
    font-size: 2rem;
    letter-spacing: 0.1em;
  }

  .main-button {
    padding: 10px 24px !important;
    font-size: 0.95rem !important;
  }

  .social-icons {
    gap: 16px;
  }

  .social-icon {
    width: 36px;
    height: 36px;
  }
}
</style>