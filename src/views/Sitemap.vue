<!-- Sitemap.vue -->
<template>
  <div class="sitemap-section">
    <h2 class="hl-section-title text-center mb-10">
      {{ $t('menu.sitemap') || 'Карта сайту' }}
    </h2>

    <v-container>
      <v-row>
        <v-col
          v-for="(group, idx) in sitemapGroups"
          :key="idx"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex"
        >
          <v-card class="sitemap-card w-100 pa-6" rounded="xl" elevation="0">
            <div class="card-icon-wrapper mb-4">
              <v-icon :icon="group.icon" size="32" color="#1e293b"></v-icon>
            </div>
            
            <h3 class="section-heading text-h6 font-weight-bold mb-5">
              {{ group.title }}
            </h3>
            
            <ul class="sitemap-list">
              <li v-for="(link, lIdx) in group.links" :key="lIdx">
                <component
                  :is="link.external ? 'a' : 'router-link'"
                  :[link.external?'href':'to']="link.to"
                  :target="link.external ? '_blank' : null"
                  class="sitemap-link d-flex align-center"
                >
                  <span class="link-bullet mr-3"></span>
                  {{ link.label }}
                </component>
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Sitemap",
  props: {
    animated: { type: Boolean, default: true },
  },
  computed: {
    sitemapGroups() {
      const t = (key, fallback) => this.$t ? this.$t(key) : fallback;
      
      return [
        {
          title: t('menu.service', 'Послуги'),
          icon: "mdi-rocket-launch-outline",
          links: [
            { to: '/price/internet-price', label: t('menu.internet', 'Інтернет') },
            { to: '/business', label: t('menu.business', 'Для бізнесу') },
            { to: '/price/tv-list', label: t('menu.tv-list', 'Телебачення') },
            { to: '/price/intercom-price', label: t('menu.intercom', 'Домофон') },
            { to: '/service/test', label: t('menu.service', 'Послуги майстра') },
            { to: '/shop', label: t('menu.device', 'Пристрої') },
          ]
        },
        {
          title: t('menu.for-subscriber', 'Абоненту'),
          icon: "mdi-account-star-outline",
          links: [
            { to: '/payment-methods', label: t('menu.payment', 'Способи оплати') },
            { to: '/promotions', label: t('menu.promo', 'Акції') },
            { to: '/faq', label: t('faq.title', 'Запитання та відповіді') },
            { to: '/coverage-map', label: t('menu.coverage-map', 'Карта покриття') },
            { to: 'https://my.happylink.net.ua', label: t('menu.cabinet', 'Особистий кабінет'), external: true },
          ]
        },
        {
          title: t('menu.about', 'Про компанію'),
          icon: "mdi-office-building-outline",
          links: [
            { to: '/', label: t('menu.home', 'Головна сторінка') },
            { to: '/about', label: t('menu.about', 'Про компанію') },
            { to: '/blog', label: t('menu.news', 'Новини') },
            { to: '/contact', label: t('menu.contact', 'Контакти') },
          ]
        },
        {
          title: t('footer.docs', 'Документи'),
          icon: "mdi-file-document-outline",
          links: [
            { to: '/static/files/pub_ofert.pdf', label: t('footer.public-contract', 'Публічний договір'), external: true },
            { to: '/static/files/pub_ofert_intercom.pdf', label: t('footer.public-contract-intercom', 'Публічний договір (Домофон)'), external: true },
            { to: '/documents/instructions', label: t('menu.docs', 'Інструкції') },
          ]
        }
      ]
    }
  }
};
</script>

<style scoped>
.sitemap-section {
  padding: 60px 0;
  background-color: #f8fafc; /* Легкий фон slate-50 */
  min-height: calc(100vh - 200px);
}

.sitemap-card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.03);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.sitemap-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.06) !important;
  border-color: rgba(254, 209, 0, 0.4);
}

/* Эффект свечения сверху при наведении */
.sitemap-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #fed100, #ffb300);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.sitemap-card:hover::before {
  transform: scaleX(1);
}

.card-icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(254, 209, 0, 0.15), rgba(254, 209, 0, 0.35));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.sitemap-card:hover .card-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.section-heading {
  color: #1e293b;
}

.sitemap-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sitemap-list li {
  margin-bottom: 14px;
}

.sitemap-link {
  color: #475569;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  font-weight: 500;
  outline: none;
}

.sitemap-link:hover {
  color: #1e293b;
  transform: translateX(4px);
}

.link-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #cbd5e1;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.sitemap-link:hover .link-bullet {
  background-color: #fed100;
  box-shadow: 0 0 8px rgba(254, 209, 0, 0.6);
  transform: scale(1.5);
}

@media (max-width: 600px) {
  .sitemap-section {
    padding: 32px 0;
  }
  .sitemap-card {
    padding: 20px !important;
  }
}
</style>