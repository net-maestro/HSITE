<!-- views/Promotions.vue -->
<template>
  <!-- Заголовок -->
  <!-- <v-card-subtitle class="subtitle-slider text-center text-h6 text-uppercase mt-2">
    {{ $t('menu.promo') }}
  </v-card-subtitle> -->
  <div class="promo-section">
  <h2 class="section-title">
      {{ $t("menu.promo") }}
    </h2>


  <div class="promotions-wrapper">
    <v-container>
      <!-- Активные акции -->
      <v-row>
        <v-col
          v-for="(promo, index) in activePromos"
          :key="'active-' + index"
          cols="12"
          md="4"
        >
          <PromoCard :promo="promo" :show-details-button="true" @details="openModal(promo)" />
        </v-col>
      </v-row>

      <!-- Кнопка показать архив -->
      <div class="text-center mt-6">
        <v-btn
          v-if="!showInactive"
          color="grey"
          variant="text"
          @click="showInactive = true"
        >
          {{ $t('promo.show-archived') }}
        </v-btn>
      </div>

      <!-- Неактивные акции (если показываем) -->
      <template v-if="showInactive">
        <v-card-subtitle class="text-center text-h6 text-uppercase font-weight-medium mt-8 mb-4 text-grey">
          {{ $t('promo.inactive-promotions') }}
        </v-card-subtitle>
        <v-row>
          <v-col
            v-for="(promo, index) in inactivePromos"
            :key="'inactive-' + index"
            cols="12"
            md="6"
          >
            <PromoCard :promo="promo" />
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>

  <!-- Модалка с деталями -->
  <v-dialog v-model="modalOpen" max-width="800px">
    <v-card>
      <v-card-title class="text-h5">{{ selectedPromo?.title }}</v-card-title>
      <v-card-text>
        <v-img
          v-if="selectedPromo?.image"
          :src="selectedPromo.image"
          height="300"
          class="mb-4 rounded-lg"
          :class="{ 'grayscale': !selectedPromo.status }"
        ></v-img>
        <div v-html="selectedPromo?.description"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="modalOpen = false">
          {{ $t('close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </div>
</template>

<script>
import { usePromotions } from '@/config/usePromotions'
import PromoCard from '@/components/PromoCard.vue'

export default {
  name: 'PromotionsView',
  components: { PromoCard },
  data() {
    return {
      modalOpen: false,
      selectedPromo: null,
      showInactive: false
    }
  },
  computed: {
    localizedPromos() {
      const { getPromotions } = usePromotions()
      return getPromotions(this.$i18n.locale) // ✅ Теперь работает!
    },
    activePromos() {
      return this.localizedPromos.filter(p => p.status)
    },
    inactivePromos() {
      return this.localizedPromos.filter(p => !p.status)
    }
  },
  methods: {
    openModal(promo) {
      this.selectedPromo = promo
      this.modalOpen = true
    }
  }
}
</script>

<style scoped>
.v-card .v-card-title {white-space: unset;}

.promo-section {
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

.promo-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #eeeeee;
  min-height: 500px;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.promo-image {
  max-height: 280px;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.grayscale {
  filter: grayscale(100%) opacity(0.7);
}

/* Лента статуса */
.ribbon {
  position: absolute;
  top: 16px;
  right: -30px;
  width: 160px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.ribbon-active {
  background: linear-gradient(135deg, #49CBD6 0%, #26A69A 100%);
}

.ribbon-inactive {
  background: linear-gradient(135deg, #D9534F 0%, #C12E27 100%);
  opacity: 0.8;
}

/* Прокрутка текста */
.description-scroll {
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.6;
  font-size: 0.95rem;
  padding: 0 16px;
  margin-bottom: 8px;
}

.description-scroll::-webkit-scrollbar {
  width: 6px;
}

.description-scroll::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 10px;
}

.description-scroll::-webkit-scrollbar-track {
  background: transparent;
}

/* Адаптив */
@media (max-width: 600px) {
  .promo-card {
    min-height: 460px;
    padding: 16px;
  }
  .promo-image {
    max-height: 200px;
  }
  .description-scroll {
    max-height: 200px;
    font-size: 0.875rem;
  }
}

.promotions-wrapper {
  background-color: #fafafa;
  padding: 16px 0;
  border-radius: 12px;
}

@media (min-width: 960px) {
  .promotions-wrapper {
    padding: 32px 0;
  }
}
</style>