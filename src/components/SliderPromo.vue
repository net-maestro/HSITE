<!-- components/PromoSlider.vue -->
<template>
  <div class="promo-slider-container my-md-4 my-2 mx-md-4 rounded-xl elevation-2 overflow-hidden">
    <v-carousel
      v-if="sliderPromos.length > 0"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-circle-medium"
      height="550px"
      cycle
      interval="6000"
      class="promo-carousel"
      :progress="false"
    >
      <v-carousel-item
        v-for="(promo, index) in sliderPromos"
        :key="index"
        class="promo-slide"
        @click="goToDetail(promo.id)"
      >
        <!-- Фоновое изображение с эффектом Zoom -->
        <div class="slide-bg-wrapper">
          <v-img
            :src="promo.image"
            cover
            height="100%"
            class="slide-bg"
            :class="{ 'grayscale': !promo.status }"
          ></v-img>
        </div>

        <!-- Градиентный оверлей для премиального вида -->
        <div class="overlay"></div>

        <!-- Контент поверх изображения -->
        <v-container class="h-100 position-relative z-index-2">
          <v-row class="h-100 align-center">
            <v-col cols="12" md="8" lg="7" class="slide-content pl-md-8">
              
              <v-chip
                :color="!promo.status ? 'error' : 'secondary'"
                :class="!promo.status ? 'text-white' : 'text-black'"
                size="small"
                class="text-uppercase font-weight-bold mb-4 px-4 py-3 slide-animate-chip"
                elevation="2"
              >
                {{ !promo.status ? $t('promo.inactive') : $t('promo.active') }}
              </v-chip>

              <h2 class="slide-title text-h3 text-md-h2 font-weight-black text-white mb-4 slide-animate-title">
                {{ promo.title }}
              </h2>

              <p class="slide-excerpt text-h6 text-md-h5 text-white mb-8 slide-animate-text font-weight-regular" style="opacity: 0.9;">
                {{ getExcerpt(promo.description) }}
              </p>

              <div class="slide-animate-btn">
                <v-btn
                  size="x-large"
                  rounded="pill"
                  variant="flat"
                  color="secondary"
                  class="slide-cta text-none font-weight-bold px-8"
                  append-icon="mdi-arrow-right"
                  elevation="4"
                >
                  {{ $t('promo.details') }}
                </v-btn>
              </div>

            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>

    <!-- Заглушка, если нет акций -->
    <div v-else class="text-center py-16 text-grey">
      <v-icon size="48" class="mb-4">mdi-calendar-remove</v-icon>
      <div class="text-h6">{{ $t('promo.no-slider-promotions') }}</div>
    </div>
  </div>
</template>

<script>
import { usePromotions } from '@/config/usePromotions'

export default {
  name: 'PromoSlider',
  data() {
    return {
      promos: []
    }
  },
  computed: {
    sliderPromos() {
      return this.promos
        .filter(p => p.status && p.slider === true)
        .slice(0, 5)
    }
  },
  mounted() {
    this.loadPromotions()
  },
  methods: {
    loadPromotions() {
      const { getPromotions } = usePromotions()
      this.promos = getPromotions(this.$i18n.locale)
    },
    goToDetail(id) {
      this.$router.push({ name: 'PromoDetail', params: { id } })
    },
    getExcerpt(htmlString) {
      const div = document.createElement('div')
      div.innerHTML = htmlString
      let text = div.textContent || div.innerText || ''
      if (text.length > 150) {
        text = text.substring(0, 150) + '...'
      }
      return text
    }
  }
}
</script>

<style scoped>
.promo-slider-container {
  position: relative;
  width: 100%;
}

.promo-slide {
  cursor: pointer;
  position: relative;
  height: 100%;
}

/* Эффект зума для фона */
.slide-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.slide-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 6s linear; /* Плавный долгий зум */
  transform: scale(1);
}

/* При активации слайда запускаем зум */
.v-window-item--active .slide-bg {
  transform: scale(1.08);
}

.slide-bg.grayscale {
  filter: grayscale(100%) brightness(0.7);
}

/* Оверлей для текста (градиент) */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.6) 40%, rgba(15,23,42,0.1) 100%);
  z-index: 1;
}

.z-index-2 {
  z-index: 2;
}

/* Анимации контента внутри слайда */
.slide-animate-chip,
.slide-animate-title,
.slide-animate-text,
.slide-animate-btn {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.v-window-item--active .slide-animate-chip {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}
.v-window-item--active .slide-animate-title {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}
.v-window-item--active .slide-animate-text {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}
.v-window-item--active .slide-animate-btn {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.5s;
}

/* Текст */
.slide-title {
  line-height: 1.1;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.slide-excerpt {
  line-height: 1.5;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

/* Кнопка */
.slide-cta {
  transition: all 0.3s ease;
}

.slide-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(73, 203, 214, 0.4) !important;
}

/* Индикаторы (точки) внизу */
.promo-carousel :deep(.v-carousel__controls) {
  bottom: 24px !important;
}

.promo-carousel :deep(.v-btn--icon.v-btn--density-default) {
  width: 16px !important;
  height: 16px !important;
  margin: 0 6px !important;
  color: rgba(255,255,255,0.4) !important;
}

.promo-carousel :deep(.v-btn--active) {
  color: #fed100 !important;
  transform: scale(1.2);
}

/* Адаптив */
@media (max-width: 960px) {
  .promo-slider-container {
    margin: 0 !important;
    border-radius: 0;
  }
  
  .slide-title {
    font-size: 2.2rem !important;
  }
  
  .overlay {
    background: linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.8) 60%, rgba(15,23,42,0.95) 100%);
  }
}

@media (max-width: 600px) {
  .promo-carousel {
    height: 480px !important;
  }
  
  .slide-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
  }

  .slide-title {
    font-size: 1.8rem !important;
  }

  .slide-excerpt {
    font-size: 1.1rem !important;
  }
}
</style>