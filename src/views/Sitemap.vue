<!-- Sitemap.vue -->
<template>
  <div class="sitemap-section">
    <h2 class="section-title">
      {{ $t('menu.sitemap') }}
    </h2>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
          lg="8"
          :data-aos="animated ? 'fade-up' : null"
        >
          <v-card
            class="sitemap-card card-hover pa-6 pa-sm-8 card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar"></div>

            <!-- Домашний интернет -->
            <h3 class="section-heading text-h5 font-weight-bold mb-4">
              {{ sectionTitles.homeInternet }}
            </h3>

            <v-row class="mb-6">
              <v-col
                v-for="col in 2"
                :key="col"
                cols="12"
                md="6"
              >
                <ul class="sitemap-list">
                  <li v-for="(item, index) in getHomeInternetItems(col)" :key="index">
                    <router-link :to="item.to" class="sitemap-link">
                      {{ item.label }}
                    </router-link>
                  </li>
                </ul>
              </v-col>
            </v-row>

            <!-- Документы -->
            <h3 class="section-heading text-h5 font-weight-bold mb-4">
              {{ sectionTitles.documents }}
            </h3>

            <v-row>
              <v-col
                v-for="col in 2"
                :key="col"
                cols="12"
                md="6"
              >
                <ul class="sitemap-list">
                  <li v-for="(item, index) in getDocumentItems(col)" :key="index">
                    <a
                      :href="item.to"
                      :target="item.external ? '_blank' : '_self'"
                      class="sitemap-link"
                      rel="noopener"
                    >
                      {{ item.label }}
                    </a>
                  </li>
                </ul>
              </v-col>
            </v-row>
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
    sectionTitles() {
      return this.$i18n.locale === 'ua'
        ? { homeInternet: "Домашній Інтернет провайдер", documents: "Документи" }
        : { homeInternet: "Home Internet Provider", documents: "Documents" };
    },
    menuItems() {
      return this.$i18n.locale === 'ua'
        ? {
            home: "Головна",
            about: "Про компанію",
            blog: "Новини",
            shop: "Пристрої",
            paymentMethods: "Способи оплати",
            contact: "Контакти",
            internet: "Інтернет",
            iptv: "Телебачення",
            intercom: "Домофон",
            services: "Послуги",
            coverageMap: "Карта покриття",
            promotions: "Акції",
          }
        : {
            home: "Home",
            about: "About Us",
            blog: "News",
            shop: "Devices",
            paymentMethods: "Payment Methods",
            contact: "Contact Us",
            internet: "Internet",
            iptv: "TV",
            intercom: "Intercom",
            services: "Services",
            coverageMap: "Coverage Map",
            promotions: "Promotions",
          };
    },
    documentItems() {
      return this.$i18n.locale === 'ua'
        ? {
            contract: "Публічний договір",
            paymentReceipt: "Квитанція для сплати",
            instructions: "Інструкції",
          }
        : {
            contract: "Public Contract for Telecommunication Services",
            paymentReceipt: "Payment Receipt",
            rules: "Rules for Providing Telecommunication Services by 'Merezha Lanet' LLC",
            refundPolicy: "Network Equipment Return and Refund Policy",
            contestRules: "Official Contest Prize Rules for 'Merezha Lanet' Participants",
            archiveTariffs: "Archived Tariffs",
            reports: "Reports",
            instructions: "Instructions",
          };
    },
    homeInternetLinks() {
      return [
        { to: '/', label: this.menuItems.home },
        { to: '/about', label: this.menuItems.about },
        { to: '/blog', label: this.menuItems.blog },
        { to: '/shop', label: this.menuItems.shop },
        { to: '/payment-methods', label: this.menuItems.paymentMethods },
        { to: '/contact', label: this.menuItems.contact },
        { to: '/price/internet-price', label: this.menuItems.internet },
        { to: '/price/tv-list', label: this.menuItems.iptv },
        { to: '/price/intercom-price', label: this.menuItems.intercom },
        { to: '/service/test', label: this.menuItems.services },
        { to: '/coverage-map', label: this.menuItems.coverageMap },
        { to: '/promo', label: this.menuItems.promotions },
      ];
    },
    documentLinks() {
      return [
        { to: '/static/files/pub_ofert.pdf', label: this.documentItems.contract, external: true },
        { to: '/documents/instructions', label: this.documentItems.instructions },
      ];
    },
  },
  methods: {
    getHomeInternetItems(col) {
      const items = this.homeInternetLinks;
      const half = Math.ceil(items.length / 2);
      return col === 1 ? items.slice(0, half) : items.slice(half);
    },
    getDocumentItems(col) {
      const items = this.documentLinks;
      const half = Math.ceil(items.length / 2);
      return col === 1 ? items.slice(0, half) : items.slice(half);
    },
  },
};
</script>

<style scoped>
.sitemap-section {
  padding: 40px 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #49CBD6, #26A69A);
  margin: 12px auto 0;
  border-radius: 2px;
}

.sitemap-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.sitemap-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентная полоса слева */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #49CBD6, #26A69A);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.section-heading {
  color: #2c3e50;
  position: relative;
  padding-left: 16px;
}

.section-heading::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #26A69A;
}

.sitemap-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}

.sitemap-list li {
  margin-bottom: 12px;
}

.sitemap-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1rem;
  padding: 6px 0;
  border-bottom: 1px dashed transparent;
  transition: all 0.2s ease;
  display: inline-block;
}

.sitemap-link:hover {
  color: #26A69A;
  border-bottom-color: #26A69A;
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .sitemap-card {
    padding: 16px !important;
  }

  .section-heading {
    font-size: 1.25rem;
    padding-left: 12px;
  }

  .section-heading::before {
    width: 6px;
    height: 6px;
  }

  .sitemap-link {
    font-size: 0.95rem;
  }
}
</style>