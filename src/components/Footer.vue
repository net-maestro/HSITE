<!-- AppFooter.vue -->
<template>
  <div class="footer-container">
    <!-- SVG Волна для плавного перехода от белого фона страницы к тёмному футеру -->
    <div class="footer-wave-wrapper" v-if="$vuetify.display.mdAndUp">
      <svg class="footer-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 120" preserveAspectRatio="xMaxYMax slice">
        <!-- Тёмный фон футера -->
        <path fill="#1e293b" d="M0,120 L0,60 C400,100 800,20 1300,60 C1500,80 1700,50 1920,60 L1920,120 Z"></path>
        
        <!-- Оптический кабель (Желтый) -->
        <path d="M-100,60 C400,100 800,20 1300,60 C1500,80 1650,70 1720,65" fill="none" stroke="#eab308" stroke-width="12" stroke-linecap="round"></path>
        <!-- Тень/Блик на кабеле -->
        <path d="M-100,58 C400,98 800,18 1300,58 C1500,78 1650,68 1720,63" fill="none" stroke="#fef08a" stroke-width="4" stroke-linecap="round"></path>

        <!-- Оптический коннектор SC/APC (Зеленый GPON) -->
        <g transform="translate(1750, 50)">
          <!-- Черный резиновый хвостовик (Boot) -->
          <path d="M-30,11 C-15,11 -10,6 0,6 L0,24 C-10,24 -15,19 -30,19 Z" fill="#334155" stroke="#0f172a" stroke-width="1"></path>
          <path d="M-25,10 L-25,20" fill="none" stroke="#0f172a" stroke-width="2"></path>
          <path d="M-15,7 L-15,23" fill="none" stroke="#0f172a" stroke-width="2"></path>
          <path d="M-5,6 L-5,24" fill="none" stroke="#0f172a" stroke-width="2"></path>

          <!-- Металлическая или серая окантовка сзади -->
          <rect x="-2" y="4" width="6" height="22" rx="1" fill="#94a3b8" stroke="#475569" stroke-width="1"></rect>
          
          <!-- Основной корпус (Зеленый) -->
          <rect x="4" y="2" width="46" height="26" rx="2" fill="#22c55e" stroke="#14532d" stroke-width="1.5"></rect>
          
          <!-- Рельеф на корпусе (углубление для пальцев) -->
          <rect x="10" y="7" width="30" height="16" rx="1" fill="#16a34a" stroke="#14532d" stroke-width="1"></rect>
          
          <!-- Белая стрелка направления -->
          <path d="M20,15 L35,15 M30,11 L35,15 L30,19" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>

          <!-- Выступающая внутренняя часть -->
          <rect x="50" y="6" width="6" height="18" fill="#16a34a" stroke="#14532d" stroke-width="1.5"></rect>
          
          <!-- Керамический наконечник (Ferrule), скошенный под углом 8 градусов (APC) -->
          <path d="M56,11 L68,11 L70,19 L56,19 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round"></path>
          
          <!-- Отверстие для оптоволокна (ядро) -->
          <circle cx="68" cy="15" r="1.5" fill="#000000"></circle>

          <!-- Блики для объема -->
          <path d="M5,4 L48,4" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"></path>
          <path d="M5,26 L48,26" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"></path>
        </g>
      </svg>
    </div>

    <!-- Футер для десктопа — НОВЫЙ ТЕМНЫЙ ДИЗАЙН -->
    <div v-if="$vuetify.display.mdAndUp" class="footer-top">
      <v-container>
        <v-row>
          <v-col cols="12" md="5" class="mb-6 mb-md-0 pe-md-10">
            <div class="brand-header mb-4">
              <v-icon icon="mdi-wifi" color="#fed100" size="large" class="me-2"></v-icon>
              <h3 class="text-h5 font-weight-bold text-white mb-0">HappyLink</h3>
            </div>
            <div class="footer-description text-grey-lighten-2" v-html="localizedText"></div>
            
            <div class="social-links mt-6">
              <v-btn
                v-for="icon in social"
                :key="icon.icon"
                :icon="icon.icon"
                :href="icon.link"
                class="social-button mx-1"
                variant="outlined"
                color="grey-lighten-1"
                size="small"
              ></v-btn>
            </div>
          </v-col>
          
          <v-col cols="12" md="3" class="mb-6 mb-md-0">
            <h4 class="footer-subtitle text-white">
              {{ $t('footer.docs') }}:
            </h4>
            <div class="accent-divider mb-4"></div>
            <ul class="footer-list">
              <li>
                <a href="/static/files/pub_ofert.pdf" class="footer-link text-grey-lighten-2">
                  <v-icon icon="mdi-file-document" size="small" class="me-2 text-primary-accent"></v-icon>
                  {{ $t('footer.public-contract') }}
                </a>
              </li>
              <li>
                <a href="/static/files/pub_ofert_intercom.pdf" class="footer-link text-grey-lighten-2">
                  <v-icon icon="mdi-file-document" size="small" class="me-2 text-primary-accent"></v-icon>
                  {{ $t('footer.public-contract-intercom') }}
                </a>
              </li>
              <li>
                <a href="/sitemap" class="footer-link text-grey-lighten-2">
                  <v-icon icon="mdi-sitemap" size="small" class="me-2 text-primary-accent"></v-icon>
                  {{ $t('menu.sitemap') }}
                </a>
              </li>
            </ul>
          </v-col>
          
          <v-col cols="12" md="4">
            <h4 class="footer-subtitle text-white">
              {{ $t('menu.work-schedule') }}:
            </h4>
            <div class="accent-divider mb-4"></div>
            <p class="footer-text text-grey-lighten-2 mb-6">
              <v-icon icon="mdi-clock-outline" size="small" class="me-2 text-primary-accent"></v-icon>
              {{ $t('menu.monday-sat') }}, 09:00–18:00
            </p>
            
            <h4 class="footer-subtitle text-white mt-4">
              {{ $t('menu.contact') }}:
            </h4>
            <div class="accent-divider mb-4"></div>
            <p class="footer-contacts">
              <a href="tel:0671319072" class="footer-link d-block mb-2 text-grey-lighten-2">
                <v-icon icon="mdi-cellphone" size="small" class="me-2 text-primary-accent"></v-icon>
                (067) 131-90-72
              </a>
              <a href="tel:0731319072" class="footer-link d-block mb-2 text-grey-lighten-2">
                <v-icon icon="mdi-cellphone" size="small" class="me-2 text-primary-accent"></v-icon>
                (073) 131-90-72
              </a>
              <a href="tel:0991893710" class="footer-link d-block mb-2 text-grey-lighten-2">
                <v-icon icon="mdi-cellphone" size="small" class="me-2 text-primary-accent"></v-icon>
                (099) 189-37-10
              </a>
              <a href="mailto:info@happylink.net.ua" class="footer-link d-block text-grey-lighten-2 mt-3">
                <v-icon icon="mdi-email" size="small" class="me-2 text-primary-accent"></v-icon>
                info@happylink.net.ua
              </a>
            </p>
          </v-col>
        </v-row>
      </v-container>

      <!-- Нижний копирайт блок -->
      <div class="footer-bottom mt-8">
        <v-container>
          <v-divider class="mb-4 border-opacity-25" color="grey"></v-divider>
          <div class="d-flex flex-column flex-md-row justify-space-between align-center text-grey">
            <div class="footer-copyright text-caption mb-2 mb-md-0">
              <span>{{ $t('footer.all-rights-reserved') }} © 2014 – {{ new Date().getFullYear() }}</span>
            </div>
            <div class="footer-disclaimer text-caption font-italic text-center">
              {{ $t('footer.internet-service-provider') }}
            </div>
          </div>
        </v-container>
      </div>
    </div>

    <!-- Мобильный футер -->
    <div v-else class="mobile-footer">
      <div class="mobile-nav-container">
        <a href="https://my.happylink.net.ua" target="_blank" style="text-decoration: none;">
          <div class="mobile-nav-item">
            <v-icon size="24" color="#2c3e50">mdi-account-circle</v-icon>
            <span class="mobile-nav-label">{{ $t("menu.cabinet") }}</span>
          </div>
        </a>
        <div class="mobile-nav-item" @click="$router.push('/price/internet-price')">
          <v-icon size="24" color="#2c3e50">mdi-speedometer</v-icon>
          <span class="mobile-nav-label">{{ $t("menu.internet") }}</span>
        </div>
        <div class="mobile-nav-item" @click="$router.push('/promotions')">
          <v-icon size="24" color="#2c3e50">mdi-bullhorn-outline</v-icon>
          <span class="mobile-nav-label">{{ $t('menu.promo') }}</span>
        </div>
        <div class="mobile-nav-item" @click="$router.push('/payment-methods')">
          <v-icon size="24" color="#2c3e50">mdi-credit-card</v-icon>
          <span class="mobile-nav-label">{{ $t('menu.payment') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  data: () => ({
    text_ua: `
      <p class="mb-3">
        Запрошуємо вас вибрати надійного інтернет-провайдера - <strong>HappyLink</strong>. 
        Наша мережа охоплює жк "Щасливий", "Вишнева Оселя", "Барселона" та інші, 
        забезпечуючи стабільне підключення і чітку телетрансляцію.
      </p>
      <p class="mb-0">
        Замовляйте підключення до інтернету та цифрового телебачення в HappyLink. 
        Ми виконуємо свої зобов'язання перед вами без перебільшень!
      </p>
    `,
    text_en: `
      <p class="mb-3">
        We invite you to choose a reliable internet provider - <strong>HappyLink</strong>. 
        Our network covers residential complexes "Happy", "Cherry Residence", "Barcelona", etc., 
        providing stable connectivity and clear TV broadcasting.
      </p>
      <p class="mb-0">
        Order internet and digital TV connection at HappyLink. 
        We fulfill our obligations to you without exaggeration!
      </p>
    `,
    social: [
      { icon: 'mdi-facebook', link: 'https://www.facebook.com/HappyLinkNetUa' },
      { icon: 'mdi-account-multiple-outline', link: 'https://my.happylink.net.ua' },
      { icon: 'mdi-wechat', link: 'https://www.t.me/HappyLinkNetUa' },
    ],
  }),
  computed: {
    localizedText() {
      return this.$i18n.locale === 'ua' ? this.text_ua : this.text_en;
    }
  }
};
</script>

<style scoped>
.footer-container {
  margin-top: 64px;
  position: relative;
}

/* SVG Волна */
.footer-wave-wrapper {
  position: absolute;
  top: -119px; /* Смещаем вверх над футером */
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}
.footer-wave {
  display: block;
  width: 100%;
  height: 120px;
}

/* Десктопный футер — НОВЫЙ ТЕМНЫЙ СТИЛЬ */
.footer-top {
  background: #1e293b; /* Глубокий тёмно-синий/серый */
  padding: 40px 0 20px;
}

.text-primary-accent {
  color: #fed100 !important;
}

.brand-header {
  display: flex;
  align-items: center;
}

.footer-description {
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.accent-divider {
  width: 40px;
  height: 3px;
  background-color: #fed100;
  border-radius: 2px;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 12px;
}

.footer-text,
.footer-contacts {
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-link {
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.footer-link:hover {
  color: #fed100 !important;
  transform: translateX(4px);
}
.footer-link:hover .text-primary-accent {
  transform: scale(1.1);
  transition: transform 0.2s;
}

.social-button {
  transition: all 0.2s ease;
}

.social-button:hover {
  color: #1e293b !important;
  background-color: #fed100 !important;
  border-color: #fed100 !important;
  transform: translateY(-2px);
}

.footer-bottom {
  padding-bottom: 16px;
}

/* Скрыть десктоп на мобильных */
@media (max-width: 959px) {
  .footer-top,
  .footer-bottom,
  .footer-wave-wrapper {
    display: none;
  }
}

/* Мобильный футер */
.mobile-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(254, 209, 0, 0.3);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
}

.mobile-nav-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  padding: 8px 4px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.mobile-nav-item:hover {
  background: rgba(254, 209, 0, 0.1);
}

.mobile-nav-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 4px;
  transition: color 0.2s ease;
}

.mobile-nav-item:hover .mobile-nav-label {
  color: #b38800;
}
</style>