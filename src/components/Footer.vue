<!-- AppFooter.vue -->
<template>
  <div class="footer-container">
    <!-- Футер для десктопа — СТАРЫЙ, как в оригинале -->
    <div v-if="$vuetify.display.mdAndUp" class="footer-top">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="mb-6 mb-md-0">
            <div class="footer-description" v-html="localizedText"></div>
          </v-col>
          <v-col cols="12" md="3" class="mb-6 mb-md-0">
            <h4 class="footer-subtitle">
              {{ $t('footer.docs') }}:
            </h4>
            <ul class="footer-list">
              <li>
                <a href="/static/files/pub_ofert.pdf" class="footer-link">
                  <v-icon icon="mdi-file-document" size="small" class="me-2"></v-icon>
                  {{ $t('footer.public-contract') }}
                </a>
              </li>
              <li>
                <a href="/static/files/pub_ofert_intercom.pdf" class="footer-link">
                  <v-icon icon="mdi-file-document" size="small" class="me-2"></v-icon>
                  {{ $t('footer.public-contract-intercom') }}
                </a>
              </li>
              <li>
                <a href="/sitemap" class="footer-link">
                  <v-icon icon="mdi-sitemap" size="small" class="me-2"></v-icon>
                  {{ $t('menu.sitemap') }}
                </a>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="3">
            <h4 class="footer-subtitle">
              {{ $t('menu.work-schedule') }}:
            </h4>
            <p class="footer-text">
              {{ $t('menu.monday-sat') }}.<br>09:00–18:00
            </p>
            <h4 class="footer-subtitle mt-4">
              {{ $t('menu.contact') }}:
            </h4>
            <p class="footer-contacts">
              <a href="tel:0671319072" class="footer-link d-block mb-1">
                <v-icon icon="mdi-cellphone" size="small" class="me-2"></v-icon>
                (067) 131-90-72
              </a>
              <a href="tel:0731319072" class="footer-link d-block mb-1">
                <v-icon icon="mdi-cellphone" size="small" class="me-2"></v-icon>
                (073) 131-90-72
              </a>
              <a href="tel:0991893710" class="footer-link d-block mb-1">
                <v-icon icon="mdi-cellphone" size="small" class="me-2"></v-icon>
                (099) 189-37-10
              </a>
              <a href="mailto:info@happylink.net.ua" class="footer-link d-block">
                <v-icon icon="mdi-email" size="small" class="me-2"></v-icon>
                info@happylink.net.ua
              </a>
            </p>
          </v-col>
        </v-row>
      </v-container>

      <!-- Нижний блок для десктопа — СТАРЫЙ -->
      <div class="footer-bottom">
        <v-container>
          <div class="social-links mb-4">
            <v-btn
              v-for="icon in social"
              :key="icon.icon"
              :icon="icon.icon"
              :href="icon.link"
              class="social-button mx-2"
              variant="tonal"
              size="small"
              :color="icon.icon === 'mdi-account-multiple-outline' ? '#fed100' : 'grey-lighten-1'"
            ></v-btn>
          </div>

          <div class="footer-disclaimer text-body-2 mb-2">
            {{ $t('footer.internet-service-provider') }}
          </div>

          <v-divider class="mb-3"></v-divider>

          <div class="footer-copyright">
            <span>{{ $t('footer.all-rights-reserved') }} © 2014 – {{ new Date().getFullYear() }}</span>
            <strong class="brand-name">
              <span>Happy</span><span class="brand-accent">link</span>
            </strong>
          </div>
        </v-container>
      </div>
    </div>

    <!-- Мобильный футер — ОБНОВЛЁННЫЙ: "Тарифи" вместо "Замовити" -->
    <div v-else class="mobile-footer">
      <div class="mobile-nav-container">
           <a href="https://my.happylink.net.ua" target="_blank" style="text-decoration: none;">
        <div
          class="mobile-nav-item"
        >
     
          <v-icon size="24" color="#2c3e50">mdi-account-circle</v-icon>
          <span class="mobile-nav-label">{{ $t("menu.cabinet") }}</span>
        </div>
       </a>
        <div
          class="mobile-nav-item"
          @click="$router.push('/price/internet-price')"
        >
          <v-icon size="24" color="#2c3e50">mdi-speedometer</v-icon>
          <span class="mobile-nav-label">{{ $t("menu.internet") }}</span>
        </div>

        <div
          class="mobile-nav-item"
          @click="$router.push('/promotions')"
        >
          <v-icon size="24" color="#2c3e50">mdi-bullhorn-outline</v-icon>
          <span class="mobile-nav-label">{{ $t('menu.promo') }}</span>
        </div>

        <div
          class="mobile-nav-item"
          @click="$router.push('/payment-methods')"
        >
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
      <h3 class="footer-title">
        Запрошуємо вас вибрати надійного інтернет-провайдера - HappyLink.
      </h3>
      <p class="footer-paragraph">
        Наша мережа охоплює (жк "Щасливий", жк "Вишнева Оселя", жк "Барселона" та ін.),
        забезпечуючи стабільне підключення і чітку телетрансляцію.
      </p>
      <p class="footer-paragraph">
        Ми гарантуємо якісний сигнал і надійне обслуговування для всіх наших абонентів.
      </p>
      <p class="footer-paragraph">
        Замовляйте підключення до інтернету та цифрового телебачення
        в HappyLink - ми виконуємо свої зобов'язання перед вами без перебільшень.
        Приєднуйтесь до нашої мережі вже сьогодні і переконайтеся в надійності і якості обслуговування!
      </p>
    `,
    text_en: `
      <h3 class="footer-title">
        We invite you to choose a reliable internet provider - HappyLink.
      </h3>
      <p class="footer-paragraph">
        Our network covers (residential complexes "Happy", "Cherry Residence", "Barcelona", etc.),
        providing stable connectivity and clear TV broadcasting.
      </p>
      <p class="footer-paragraph">
        We guarantee high-quality signal and reliable service for all our subscribers.
      </p>
      <p class="footer-paragraph">
        Order internet and digital TV connection
        at HappyLink - we fulfill our obligations to you without exaggeration.
        Join our network today and experience the reliability and quality of service!
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
}

/* Десктопный футер — СТАРЫЙ СТИЛЬ */
.footer-top {
  background: linear-gradient(135deg, #fed100, #feb700);
  padding: 64px 0 48px;
  color: #2c3e50;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
}

.footer-paragraph {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 12px;
}

.footer-subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #2c3e50;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 8px;
}

.footer-text,
.footer-contacts {
  line-height: 1.6;
}

.footer-link {
  color: #00796b;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.footer-link:hover {
  color: #e65100;
  transform: translateX(4px);
}

.footer-bottom {
  background: #ffffff;
  padding: 32px 0;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.social-button {
  transition: all 0.2s ease;
}

.social-button:hover {
  transform: translateY(-2px);
}

.footer-disclaimer {
  color: #666;
  text-align: center;
  font-style: italic;
}

.footer-copyright {
  color: #666;
  text-align: center;
  font-size: 0.875rem;
}

.brand-name {
  font-weight: 700;
  margin-left: 8px;
}

.brand-accent {
  color: #fed100;
}

/* Скрыть десктоп на мобильных */
@media (max-width: 959px) {
  .footer-top,
  .footer-bottom {
    display: none;
  }
}

/* Мобильный футер — стиль без активного индикатора (проще и чище) */
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
  /* padding: 12px 0 16px; */
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