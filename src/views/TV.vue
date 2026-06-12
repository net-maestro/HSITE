<!-- TvComponent.vue -->
<template>
  <div class="tv-section bg-grey-lighten-4 py-12">
    <div class="text-center mb-10">
      <h2 class="hl-section-title">
        {{ $t("menu.tv-list") }}
      </h2>
      <p class="text-body-1 text-grey-darken-1 mt-2 mx-auto" style="max-width: 600px;">
        {{ localizedTexts.subtitle }}
      </p>
    </div>

    <v-container>
      <v-row class="justify-center align-center">
        <!-- Левая колонка: преимущества (Плитки) -->
        <v-col
          cols="12"
          md="6"
          lg="5"
          xl="5"
          :class="{ 'd-none': isExpanded }"
          :data-aos="animated ? 'fade-right' : null"
        >
          <v-row class="g-3 mb-6">
            <v-col cols="6" sm="6" v-for="(benefit, index) in localizedTexts.featureCards" :key="index">
              <v-card class="hl-card feature-tile text-center pa-4 h-100 d-flex flex-column align-center justify-center" elevation="0" rounded="xl">
                <div class="icon-circle mb-3 d-flex align-center justify-center" :style="{ background: benefit.bgColor }">
                  <v-icon :icon="benefit.icon" :color="benefit.color" size="32"></v-icon>
                </div>
                <div class="text-subtitle-2 font-weight-bold lh-sm mb-1 text-main">{{ benefit.title }}</div>
                <div v-if="benefit.subtitle" class="text-caption text-grey-darken-1 lh-sm">{{ benefit.subtitle }}</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Кнопки інструкцій -->
          <v-card class="hl-card pa-5 d-flex flex-column flex-sm-row justify-center align-center gap-3" rounded="xl" elevation="0">
            <v-btn
              :href="localizedTexts.instructions.channelsLink"
              target="_blank"
              color="primary"
              variant="flat"
              rounded="pill"
              class="font-weight-bold flex-grow-1 w-100 w-sm-auto mb-3 mb-sm-0"
              prepend-icon="mdi-format-list-bulleted"
              elevation="0"
            >
              {{ localizedTexts.channelList }}
            </v-btn>
            <v-btn
              :href="localizedTexts.instructions.connectionGuideLink"
              target="_blank"
              color="secondary"
              variant="flat"
              rounded="pill"
              class="font-weight-bold text-black flex-grow-1 w-100 w-sm-auto mx-sm-2"
              prepend-icon="mdi-file-pdf-box"
              elevation="0"
            >
              {{ localizedTexts.howToConnect }}
            </v-btn>
          </v-card>
        </v-col>

        <!-- Правая колонка: iframe -->
        <v-col
          cols="12"
          md="6"
          lg="7"
          xl="7"
          :class="{ 'col-12': isExpanded }"
          :data-aos="animated ? 'fade-left' : null"
        >
          <div class="iframe-wrapper position-relative">
            <!-- Рамка як у телевізора -->
            <div class="tv-frame hl-card pa-2 pb-4" :class="{ 'expanded-frame': isExpanded }">
              <div class="accent-bar" v-if="!isExpanded"></div>
              
              <iframe
                ref="sweetTVIframe"
                src="https://sweet.tv/sports"
                :class="['tv-iframe', { 'expanded': isExpanded }]"
                frameborder="0"
                allowfullscreen
                title="Sweet TV Widget"
              ></iframe>
              
              <!-- Нижня панель "телевізора" -->
              <div class="tv-stand d-flex justify-center align-center pt-2" v-if="!isExpanded">
                <div class="power-led"></div>
                <img src="http://happylink.net.ua/static/sweet_tv.png" alt="Sweet.TV" height="20" class="ml-2 opacity-50" style="filter: grayscale(100%);">
              </div>
            </div>

            <!-- Кнопка розширення -->
            <v-btn
              class="expand-btn position-absolute"
              style="bottom: -20px; right: 24px; z-index: 10;"
              icon
              size="large"
              color="secondary"
              elevation="4"
              @click="handleFullWidthAction"
            >
              <v-icon color="black">{{ isExpanded ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TvComponent",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      isExpanded: false,
      texts_ua: {
        title: "Телебачення",
        subtitle: "Дивіться улюблені фільми та телепередачі у найвищій якості на будь-якому пристрої",
        featureCards: [
          { icon: 'mdi-devices', color: '#49CBD6', bgColor: 'rgba(73, 203, 214, 0.1)', title: 'До 4 пристроїв', subtitle: 'за одну абонплату' },
          { icon: 'mdi-youtube-tv', color: '#ff6b6b', bgColor: 'rgba(255, 107, 107, 0.1)', title: '300+ каналів', subtitle: 'у цифровій якості' },
          { icon: 'mdi-history', color: '#FED100', bgColor: 'rgba(254, 209, 0, 0.15)', title: 'Архів 7 днів', subtitle: 'перегляд у записі' },
          { icon: 'mdi-movie-open-play', color: '#26A69A', bgColor: 'rgba(38, 166, 154, 0.1)', title: 'Фільмотека', subtitle: 'безкоштовно' },
          { icon: 'mdi-laptop-mac', color: '#9c27b0', bgColor: 'rgba(156, 39, 176, 0.1)', title: 'Усі платформи', subtitle: 'Smart TV, ПК, Смартфон' },
          { icon: 'mdi-piggy-bank', color: '#4caf50', bgColor: 'rgba(76, 175, 80, 0.1)', title: 'Разом дешевше', subtitle: 'Інтернет + ТБ від 280 ₴' },
        ],
        instructions: {
          channelsLink: "https://sweet.tv/site_map",
          connectionGuideLink: "/static/files/tv_instrukcija.pdf",
        },
        channelList: "Список каналів",
        howToConnect: "Як підключити",
      },
      texts_en: {
        title: "Television",
        subtitle: "Watch your favorite movies and TV shows in top quality on any device",
        featureCards: [
          { icon: 'mdi-devices', color: '#49CBD6', bgColor: 'rgba(73, 203, 214, 0.1)', title: 'Up to 4 devices', subtitle: 'for a single fee' },
          { icon: 'mdi-youtube-tv', color: '#ff6b6b', bgColor: 'rgba(255, 107, 107, 0.1)', title: '300+ channels', subtitle: 'in digital quality' },
          { icon: 'mdi-history', color: '#FED100', bgColor: 'rgba(254, 209, 0, 0.15)', title: '7 Days Archive', subtitle: 'watch past shows' },
          { icon: 'mdi-movie-open-play', color: '#26A69A', bgColor: 'rgba(38, 166, 154, 0.1)', title: 'Free Movies', subtitle: 'huge library' },
          { icon: 'mdi-laptop-mac', color: '#9c27b0', bgColor: 'rgba(156, 39, 176, 0.1)', title: 'All Platforms', subtitle: 'Smart TV, PC, Mobile' },
          { icon: 'mdi-piggy-bank', color: '#4caf50', bgColor: 'rgba(76, 175, 80, 0.1)', title: 'Bundle & Save', subtitle: 'Internet + TV from 280 ₴' },
        ],
        instructions: {
          channelsLink: "https://sweet.tv/site_map",
          connectionGuideLink: "/static/files/tv_instrukcija.pdf",
        },
        channelList: "Channel List",
        howToConnect: "How to Connect",
      }
    };
  },
  methods: {
    handleFullWidthAction() {
      this.isExpanded = !this.isExpanded;

      const iframe = this.$refs.sweetTVIframe;
      if (!iframe) return;

      if (this.isExpanded) {
        document.body.style.overflow = 'hidden'; // блокуємо скролл сторінки
      } else {
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
.feature-tile {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(0,0,0,0.03);
}

.feature-tile:hover {
  transform: translateY(-4px);
  box-shadow: var(--hl-shadow-hover) !important;
}

.icon-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.feature-tile:hover .icon-circle {
  transform: scale(1.1);
}

.lh-sm {
  line-height: 1.2;
}

/* Оформлення телевізора */
.tv-frame {
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
  transition: all 0.4s ease;
}

.tv-stand {
  height: 30px;
}

.power-led {
  width: 6px;
  height: 6px;
  background-color: #f44336;
  border-radius: 50%;
  box-shadow: 0 0 6px #f44336;
}

/* Акцентная полоса слева */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, var(--hl-secondary), #ff9f43);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

/* Стиль iframe */
.tv-iframe {
  width: 100%;
  height: 480px;
  border-radius: 12px;
  background: #000;
  transition: all 0.4s ease;
}

/* Розширений режим (Повний екран) */
.tv-frame.expanded-frame {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  background: #000;
}

.tv-iframe.expanded {
  height: 100vh;
  border-radius: 0;
  z-index: 9999;
}

.expand-btn {
  transition: transform 0.3s ease;
}

.expand-btn:hover {
  transform: scale(1.1);
}

.expanded-frame + .expand-btn {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  bottom: auto !important;
  z-index: 10000 !important;
}

/* Адаптив */
@media (max-width: 960px) {
  .tv-iframe {
    height: 400px;
  }
}

@media (max-width: 600px) {
  .tv-iframe {
    height: 320px;
  }
  .icon-circle {
    width: 56px;
    height: 56px;
  }
}
</style>