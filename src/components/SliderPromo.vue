<!-- components/PromoSlider.vue -->
<template>
  <div class="promo-slider-container">
    <v-carousel
      v-if="sliderPromos.length > 0"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-circle"
      height="500px"
      cycle
      interval="7000"
      class="promo-carousel"
      :progress="false"
    >
      <v-carousel-item
        v-for="(promo, index) in sliderPromos"
        :key="index"
        class="promo-slide"
        @click="goToDetail(promo.id)"
      >
        <!-- Градиентный оверлей для контраста текста -->
        <div class="overlay"></div>

        <!-- Фоновое изображение -->
        <v-img
          :src="promo.image"
          cover
          height="100%"
          class="slide-bg"
          :class="{ 'grayscale': !promo.status }"
        ></v-img>

        <!-- Контент поверх изображения -->
        <div class="slide-content d-flex flex-column justify-center px-4 px-md-8">
          <div class="d-flex align-center mb-2">
            <v-chip
              :color="!promo.status ? 'error' : 'success'"
              size="small"
              class="text-uppercase font-weight-bold"
            >
              {{ !promo.status ? $t('promo.inactive') : $t('promo.active') }}
            </v-chip>
          </div>

          <h2 class="slide-title text-h3 font-weight-black text-white mb-3">
            {{ promo.title }}
          </h2>

          <p class="slide-excerpt text-body-1 text-white mb-5" style="max-width: 600px; opacity: 0.9;">
            {{ getExcerpt(promo.description) }}
          </p>

          <v-btn
            size="x-large"
            rounded="pill"
            variant="flat"
            :color="!promo.status ? '#b38800' : '#b38800'"
            class="slide-cta text-capitalize font-weight-bold"
            prepend-icon="mdi-arrow-right"
            style="max-width: 280px;"
          >
            {{ $t('promo.details') }}
          </v-btn>
        </div>
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
      if (text.length > 180) {
        text = text.substring(0, 180) + '...'
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
  overflow: hidden;
  border-radius: 16px;
  margin: 5px 0;
}

.promo-carousel :deep(.v-window-item) {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.promo-slide {
  cursor: pointer;
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Градиентный оверлей для контраста текста */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%);
  z-index: 1;
  border-radius: 16px;
}

/* Фоновое изображение */
.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  filter: brightness(0.9);
  transition: filter 0.3s ease;
}

.slide-bg.grayscale {
  filter: grayscale(100%) brightness(0.7) opacity(0.8);
}

/* Контент поверх изображения */
.slide-content {
  position: relative;
  z-index: 2;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  width: 100%;
}

.slide-title {
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.slide-excerpt {
  line-height: 1.6;
  font-size: 1.1rem;
}

.slide-cta {
  align-self: flex-start;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.slide-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

/* Стиль индикаторов слайдов */
.promo-carousel :deep(.v-carousel__controls) {
  bottom: 32px !important;
}

.promo-carousel :deep(.v-btn--icon.v-btn--density-default) {
  width: 12px !important;
  height: 12px !important;
  background-color: rgba(255, 255, 255, 0.5) !important;
}

.promo-carousel :deep(.v-btn--icon.v-btn--density-default.v-btn--active) {
  background-color: white !important;
  width: 32px !important;
  border-radius: 6px;
}

/* Адаптив */
@media (max-width: 960px) {
  .promo-slider-container {
    margin: 16px 0;
  }

  .slide-content {
    padding: 0 24px;
  }

  .slide-title {
    font-size: 2rem !important;
  }

  .slide-excerpt {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .promo-slider-container {
    height: auto;
  }

  .promo-slide {
    height: 400px;
  }

  .slide-content {
    padding: 0 16px;
    text-align: center;
    align-items: center;
  }

  .slide-title {
    font-size: 1.5rem !important;
    text-align: center;
  }

  .slide-excerpt {
    text-align: center;
    margin: 0 auto 24px;
  }

  .slide-cta {
    align-self: center;
  }

  .overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
  }
}
</style>