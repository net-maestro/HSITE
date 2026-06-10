<!-- TvComponent.vue -->
<template>
  <div class="tv-section">
    <h2 class="section-title">
      {{ $t("menu.tv-list") }}
    </h2>

    <v-container>
      <v-row class="justify-center">
        <!-- Левая колонка: преимущества -->
        <v-col
          cols="12"
          md="5"
          lg="6"
          xl="6"
          :class="{ 'col-12': isExpanded }"
        >
          <v-card
            class="tv-card card-hover pa-6 card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar"></div>

            <h3 class="card-title mb-4">
              {{ localizedTexts.benefitsTitle }}
            </h3>

            <ul class="benefits-list">
              <li v-for="(benefit, index) in localizedTexts.benefits" :key="index">
                {{ benefit }}
              </li>
            </ul>

            <h4 class="card-subtitle mb-3">
              {{ localizedTexts.instructionsTitle }}
            </h4>

            <ul class="instructions-list">
              <li>
                <a
                  :href="localizedTexts.instructions.channelsLink"
                  target="_blank"
                  class="internal-link"
                >
                  {{ localizedTexts.channelList }}
                </a>
              </li>
              <li>
                <a
                  :href="localizedTexts.instructions.connectionGuideLink"
                  target="_blank"
                  class="internal-link"
                >
                  {{ localizedTexts.howToConnect }}
                </a>
              </li>
            </ul>
          </v-card>
        </v-col>

        <!-- Правая колонка: iframe + кнопка -->
        <v-col
          cols="12"
          md="7"
          lg="6"
          xl="6"
          :class="{ 'col-12': isExpanded }"
        >
          <v-card
            class="tv-card card-hover pa-2"
            elevation="0"
            rounded="xl"
          >
            <div class="accent-bar"></div>

            <iframe
              ref="sweetTVIframe"
              src="https://sweet.tv/widget/4"
              :class="['tv-iframe', { 'expanded': isExpanded }]"
              frameborder="0"
              allowfullscreen
              title="Sweet TV Widget"
            ></iframe>
          </v-card>

          <v-btn
            class="expand-btn mt-4"
            block
            @click="handleFullWidthAction"
            :prepend-icon="isExpanded ? 'mdi-close' : 'mdi-arrow-expand-all'"
          >
           
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TvComponent",
  data() {
    return {
      isExpanded: false,
      texts_ua: {
        title: "Телебачення",
        benefitsTitle: "Переваги цифрового телебачення:",
        benefits: [
          "до 4 пристроїв за одну абонплату;",
          "понад 300 телеканалів у цифровій якості;",
          "архів телепрограм (можна подивитись вечірній фільм або футбольний матч, який йшов зранку, перегляд записів до 7 днів);",
          "безкоштовна фільмотека;",
          "телебачення працює на різних платформах (smart телевізор, ТВ приставка, комп'ютер, телефон);",
          "разом дешевше (інтернет та телебачення від 280 грн/місяць).",
        ],
        instructionsTitle: "Інструкції:",
        instructions: {
          channelsLink: "https://sweet.tv/widget/4",
          connectionGuideLink: "/static/files/tv_instrukcija.pdf",
        },
        channelList: "Список телеканалів",
        howToConnect: "Як підключити",
        contactUs: "Якщо у вас виникли запитання або ви не розібрались — телефонуйте. Наші оператори вам допоможуть.",
      },
      texts_en: {
        title: "Television",
        benefitsTitle: "Benefits of Digital Television:",
        benefits: [
          "up to 4 devices for a single subscription;",
          "over 300 channels in digital quality;",
          "program archive (watch evening movies or morning matches, with up to 7 days of recordings);",
          "free movie library;",
          "works on various platforms (smart TV, TV box, computer, phone);",
          "more affordable (internet and TV from 280 UAH/month).",
        ],
        instructionsTitle: "Instructions:",
        instructions: {
          channelsLink: "https://sweet.tv/widget/4",
          connectionGuideLink: "/static/files/tv_instrukcija.pdf",
        },
        channelList: "Channel List",
        howToConnect: "How to Connect",
        contactUs: "If you have any questions or need assistance, please call us. Our operators are here to help.",
      }
    };
  },
  methods: {
    handleFullWidthAction() {
      this.isExpanded = !this.isExpanded;

      const iframe = this.$refs.sweetTVIframe;
      if (!iframe) return;

      if (this.isExpanded) {
        iframe.classList.add('fullscreen');
        document.body.style.overflow = 'hidden'; // блокируем скролл страницы
      } else {
        iframe.classList.remove('fullscreen');
        document.body.style.overflow = '';
      }
    }
  },
  computed: {
    localizedTexts() {
      return this.$i18n.locale === 'ua' ? this.texts_ua : this.texts_en;
    }
  }
};
</script>

<style scoped>
.tv-section {
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
background: linear-gradient(135deg, #fed100, #feb700);
  margin: 12px auto 0;
  border-radius: 2px;
}

.tv-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.tv-card:hover {
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
  background: linear-gradient(135deg, #fed100, #feb700);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 16px;
}

.card-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: #424242;
}

.benefits-list,
.instructions-list {
  font-size: 1rem;
  line-height: 1.6;
  color: #424242;
  padding-left: 24px;
  margin: 16px 0;
}

.benefits-list li,
.instructions-list li {
  margin-bottom: 8px;
}

.internal-link {
  color: #26A69A;
  text-decoration: none;
  border-bottom: 1px dashed #26A69A;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.internal-link:hover {
  background-color: #e8f5f3;
  border-bottom-style: solid;
}

/* Стиль iframe */
.tv-iframe {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  transition: all 0.4s ease;
}

.tv-iframe.expanded {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.8);
}

/* Кнопка раскрытия */
.expand-btn {
  background: linear-gradient(135deg, #fed100, #feb700) !important;
  color: white !important;
  border-radius: 24px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3) !important;
  transition: all 0.3s ease !important;
  padding: 12px 24px !important;
}

.expand-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(38, 166, 154, 0.4) !important;
}

/* Адаптив */
@media (max-width: 960px) {
  .tv-iframe {
    height: 320px;
  }
}

@media (max-width: 600px) {
  .tv-iframe {
    height: 280px;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .benefits-list,
  .instructions-list {
    font-size: 0.95rem;
    padding-left: 20px;
  }
}
</style>