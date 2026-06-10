<!-- views/Promotions.vue -->
<template>
  <div class="promotions-page">
    
    <!-- Hero Banner -->
    <div class="promo-hero bg-grey-lighten-4 pb-10 pt-16">
      <v-container>
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="8">
            <v-icon icon="mdi-gift-outline" color="secondary" size="64" class="mb-4"></v-icon>
            <h1 class="text-h3 font-weight-black mb-4 text-grey-darken-4">
              {{ $t("menu.promo") }}
            </h1>
            <p class="text-h6 text-grey-darken-1 mx-auto" style="max-width: 600px; line-height: 1.4;">
              Підключайтесь вигідно! Найкращі пропозиції для нових та існуючих абонентів HappyLink.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Основной контент -->
    <div class="promotions-wrapper pb-12">
      <v-container>
        <!-- Активные акции -->
        <v-row class="mt-n10">
          <v-col
            v-for="(promo, index) in activePromos"
            :key="'active-' + index"
            cols="12"
            md="4"
            :data-aos="animated ? 'fade-up' : null"
            :data-aos-delay="index * 100"
          >
            <PromoCard :promo="promo" :show-details-button="true" @details="openModal(promo)" class="h-100" />
          </v-col>
        </v-row>

        <!-- Кнопка показать архив -->
        <div class="text-center mt-12 mb-6">
          <v-btn
            v-if="!showInactive"
            color="primary"
            variant="tonal"
            rounded="pill"
            class="font-weight-bold px-8"
            @click="showInactive = true"
            prepend-icon="mdi-history"
          >
            {{ $t('promo.show-archived') }}
          </v-btn>
        </div>

        <!-- Неактивные акции -->
        <v-expand-transition>
          <div v-if="showInactive">
            <div class="text-center mb-8 mt-4">
              <v-divider class="mb-6"></v-divider>
              <h3 class="text-h5 font-weight-bold text-grey">
                {{ $t('promo.inactive-promotions') }}
              </h3>
            </div>
            
            <v-row>
              <v-col
                v-for="(promo, index) in inactivePromos"
                :key="'inactive-' + index"
                cols="12"
                md="6"
                lg="4"
              >
                <PromoCard :promo="promo" class="opacity-80" />
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-container>
    </div>

    <!-- Модалка с деталями -->
    <v-dialog v-model="modalOpen" max-width="800px">
      <v-card rounded="xl" class="overflow-hidden">
        <div class="bg-primary px-6 py-4 d-flex justify-space-between align-center">
          <h3 class="text-h6 font-weight-bold text-white mb-0">{{ selectedPromo?.title }}</h3>
          <v-btn icon="mdi-close" variant="text" color="white" @click="modalOpen = false"></v-btn>
        </div>
        
        <v-card-text class="pa-6">
          <v-img
            v-if="selectedPromo?.image"
            :src="selectedPromo.image"
            height="350"
            cover
            class="mb-6 rounded-lg elevation-2"
            :class="{ 'grayscale': !selectedPromo.status }"
          ></v-img>
          
          <div class="promo-html-content text-body-1" v-html="selectedPromo?.description"></div>
        </v-card-text>
        
        <v-divider></v-divider>
        <v-card-actions class="pa-4 justify-center">
          <v-btn color="secondary" variant="flat" rounded="pill" class="px-8 font-weight-bold text-black" @click="modalOpen = false">
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
  props: {
    animated: { type: Boolean, default: true },
  },
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
      return getPromotions(this.$i18n.locale)
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
.promo-hero {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  position: relative;
  z-index: 1;
}

.promotions-wrapper {
  position: relative;
  z-index: 2;
  background-color: #ffffff;
}

.opacity-80 {
  opacity: 0.8;
  transition: opacity 0.3s;
}

.opacity-80:hover {
  opacity: 1;
}

.promo-html-content {
  line-height: 1.7;
  color: #424242;
}

.promo-html-content :deep(p) {
  margin-bottom: 16px;
}

.promo-html-content :deep(ul) {
  margin-bottom: 16px;
  padding-left: 24px;
}

.promo-html-content :deep(li) {
  margin-bottom: 8px;
}
</style>