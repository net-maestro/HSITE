<template>
  <div class="about-section bg-grey-lighten-4 py-12">
    <v-container>
      <div class="text-center mb-10">
        <h2 class="text-h4 font-weight-bold text-uppercase" style="color: var(--hl-text-main);">
          {{ $t('menu.about') }}
        </h2>
        <div class="title-divider mx-auto mt-3"></div>
      </div>

      <v-row justify="center" align="stretch">
        <v-col cols="12" lg="5" class="d-flex flex-column">
          <!-- Left side: Image and description -->
          <v-card class="hl-card pa-6 pa-md-8 h-100 d-flex flex-column justify-center" rounded="xl" elevation="0">
            <v-img
              src="@/assets/about-company/cyberspace.jpg"
              alt="HappyLink — надійний інтернет та домофонія"
              class="rounded-xl mb-6 shadow-img"
              cover
              height="300"
            ></v-img>

            <div class="text-body-1 text-grey-darken-3 lh-relaxed" v-html="localizedIntro"></div>
          </v-card>
        </v-col>

        <v-col cols="12" lg="7" class="d-flex flex-column gap-6">
          <!-- Top right: Advantages Grid -->
          <v-card class="hl-card pa-6 pa-md-8 flex-grow-1" rounded="xl" elevation="0">
            <h3 class="text-h6 font-weight-bold mb-6 d-flex align-center">
              <v-icon color="secondary" size="28" class="mr-3">mdi-star-circle-outline</v-icon>
              {{ isUa ? 'Наші переваги' : 'Our advantages' }}
            </h3>
            
            <v-row>
              <v-col cols="12" sm="6" v-for="(adv, index) in localizedAdvantages" :key="index">
                <div class="d-flex align-start advantage-item pa-3 rounded-lg">
                  <v-icon :color="adv.color || 'primary'" size="32" class="mr-4 mt-1">{{ adv.icon }}</v-icon>
                  <div>
                    <h4 class="font-weight-bold text-body-1 mb-1">{{ adv.title }}</h4>
                    <p class="text-body-2 text-grey-darken-1 mb-0">{{ adv.text }}</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Bottom right: Documents -->
          <v-card class="hl-card pa-6 pa-md-8" rounded="xl" elevation="0" style="background: linear-gradient(135deg, #49CBD6 0%, #26A69A 100%);">
            <h3 class="text-h6 font-weight-bold text-white mb-4 d-flex align-center">
              <v-icon color="white" size="28" class="mr-3">mdi-file-document-multiple-outline</v-icon>
              {{ isUa ? 'Документи' : 'Documents' }}
            </h3>
            
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                href="/static/files/pub_ofert.pdf"
                target="_blank"
                color="white"
                variant="flat"
                prepend-icon="mdi-download"
                rounded="pill"
                class="text-primary font-weight-bold px-6"
              >
                {{ isUa ? 'Публічний договір' : 'Public contract' }}
              </v-btn>
              <v-btn
                href="/static/files/pub_ofert_intercom.pdf"
                target="_blank"
                color="white"
                variant="flat"
                prepend-icon="mdi-download"
                rounded="pill"
                class="text-primary font-weight-bold px-6"
              >
                {{ isUa ? 'Договір домофон' : 'Intercom contract' }}
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AboutCompany',
  computed: {
    isUa() {
      return this.$i18n.locale === 'ua'
    },
    localizedIntro() {
      if (this.isUa) {
        return `Компанія <strong>HappyLink</strong> надає доступ до мережі інтернет за технологією FTTB (Fiber to the Building) та PON (Passive Optical Network).<br><br>
                Також ми професійно виконуємо роботи з монтажу та обслуговування систем домофонії та контролю доступу для вашої безпеки.`
      }
      return `The company <strong>HappyLink</strong> provides access to the internet using FTTB (Fiber to the Building) and PON (Passive Optical Network) technologies.<br><br>
              We also professionally perform installation and maintenance of intercom systems and access control for your security.`
    },
    localizedAdvantages() {
      if (this.isUa) {
        return [
          { icon: 'mdi-rocket-launch', color: '#ff6b6b', title: 'Висока швидкість', text: 'Найбільша швидкість доступу – до 1000 Мбіт/сек' },
          { icon: 'mdi-shield-check', color: '#4ecdc4', title: 'Надійність', text: 'Стабільність і надійність зв’язку за будь-яких умов' },
          { icon: 'mdi-clock-fast', color: '#feca57', title: 'Швидка реакція', text: 'Миттєве реагування на звернення, активна розбудова мережі PON' },
          { icon: 'mdi-tools', color: '#ff9f43', title: 'Безкоштовний майстер', text: 'Безкоштовний виклик майстра для підключення' },
          { icon: 'mdi-currency-usd', color: '#10ac84', title: 'Доступні ціни', text: 'Гнучкі тарифи, вигідні акції та лояльні ціни' }
        ]
      }
      return [
        { icon: 'mdi-rocket-launch', color: '#ff6b6b', title: 'High Speed', text: 'The highest access speed - up to 1000 Mbps' },
        { icon: 'mdi-shield-check', color: '#4ecdc4', title: 'Reliability', text: 'Stability and reliability of the connection in any conditions' },
        { icon: 'mdi-clock-fast', color: '#feca57', title: 'Quick Response', text: 'Instant response to requests, active PON network expansion' },
        { icon: 'mdi-tools', color: '#ff9f43', title: 'Free Technician', text: 'Free technician visits for connection setup' },
        { icon: 'mdi-currency-usd', color: '#10ac84', title: 'Affordable Prices', text: 'Flexible tariffs, great promotions and loyal prices' }
      ]
    }
  }
}
</script>

<style scoped>
.title-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, var(--hl-secondary), #ff9f43);
  border-radius: 2px;
}

.lh-relaxed {
  line-height: 1.8;
}

.shadow-img {
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.shadow-img:hover {
  transform: translateY(-5px);
}

.advantage-item {
  transition: background-color 0.2s ease;
}

.advantage-item:hover {
  background-color: #f8f9fa;
}

.gap-4 {
  gap: 16px;
}

.gap-6 {
  gap: 24px;
}
</style>