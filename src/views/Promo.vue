<template>
  <div class="promotions-wrapper py-6 py-md-10 bg-grey-lighten-4 rounded-xl">
    <!-- Заголовок -->
    <v-card-subtitle class="text-center text-h5 text-uppercase font-weight-bold mb-8" style="color: var(--hl-text-main);">
      {{ $t('menu.promo') }}
    </v-card-subtitle>

    <v-container>
      <!-- Активные акции -->
      <v-row>
        <v-col
          v-for="(promo, index) in activePromos"
          :key="'active-' + index"
          cols="12"
          md="6"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 50"
        >
          <PromoItemCard 
            :promo="promo" 
            :animated="animated" 
            @join="handleJoinPromo" 
          />
        </v-col>
      </v-row>

      <!-- Неактивные акции (Заголовок) -->
      <div v-if="inactivePromos.length > 0" class="mt-12 mb-6 text-center">
        <h3 class="text-h6 text-uppercase font-weight-medium text-grey">
          {{ $t('promo.inactive-promotions') }}
        </h3>
        <div class="divider mx-auto mt-2"></div>
      </div>

      <!-- Неактивные акции -->
      <v-row v-if="inactivePromos.length > 0">
        <v-col
          v-for="(promo, index) in inactivePromos"
          :key="'inactive-' + index"
          cols="12"
          md="6"
        >
          <PromoItemCard 
            :promo="promo" 
            :animated="false" 
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import PromoItemCard from '@/components/promo/PromoItemCard.vue'
import { promos_ua, promos_en } from '@/data/promotions.js'

const props = defineProps({
  animated: {
    type: Boolean,
    default: true
  }
})

const { locale } = useI18n()
const router = useRouter()

const localizedPromos = computed(() => {
  return locale.value === 'ua' ? promos_ua : promos_en
})

const activePromos = computed(() => {
  return localizedPromos.value.filter(promo => promo.status)
})

const inactivePromos = computed(() => {
  return localizedPromos.value.filter(promo => !promo.status)
})

const handleJoinPromo = (promo) => {
  // Тут раніше був компонент RequestForm, зараз ми можемо 
  // перенаправляти на сторінку чекауту або відкривати модалку.
  console.log('Join promo:', promo.title)
  // Можна передати назву акції в коментар або зберегти в стор перед чекаутом.
  router.push('/checkout')
}
</script>

<style scoped>
.divider {
  width: 60px;
  height: 3px;
  background-color: #bdbdbd;
  border-radius: 2px;
}
</style>
