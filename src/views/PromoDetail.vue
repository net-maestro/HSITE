<!-- views/PromoDetail.vue -->
<template>
  <div class="promo-detail-container">
    <v-btn
      prepend-icon="mdi-arrow-left"
      variant="text"
      class="mb-4"
      @click="$router.push({ name: 'Акції' })"
    >
      {{ $t('promo.back-to-list') }}
    </v-btn>

    <v-card class="pa-6 rounded-xl card-animate" elevation="4">
      <v-card-title class="text-h4 font-weight-bold text-center mb-4">
        {{ promo?.title }}
      </v-card-title>

      <v-img
        v-if="promo?.image"
        :src="promo.image"
        height="400"
        class="rounded-lg mb-6"
        :class="{ 'grayscale': !promo.status }"
      ></v-img>

      <v-card-text>
        <div v-html="promo?.description" class="text-body-1"></div>
      </v-card-text>

      <v-card-actions v-if="promo?.button && promo?.status" class="pt-4">
        <RequestForm
          :FormData="promo.title"
          :ButtonTitle="$t('promo.join-the-promotion')"
          ButtonColor="#26A69A"
          ButtonIcon="mdi-arrow-right"
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { usePromotions } from '@/config/usePromotions'

export default {
  name: 'PromoDetailView',
  data() {
    return {
      promo: null
    }
  },
  computed: {
    promoId() {
      return this.$route.params.id
    }
  },
  watch: {
    promoId: {
      immediate: true,
      handler(newId) {
        this.loadPromo(newId)
      }
    }
  },
  methods: {
    loadPromo(id) {
      if (!id) return
      const { getPromotions } = usePromotions()
      const allPromos = getPromotions(this.$i18n.locale)
      this.promo = allPromos.find(p => p.id === id)
      if (!this.promo) {
        this.$router.push({ name: 'NotFound' }) // или показать 404
      }
    }
  }
}
</script>

<style scoped>
.v-card .v-card-title {white-space: unset;}
.promo-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

@media (max-width: 600px) {
  .promo-detail-container {
    padding: 16px;
  }
  .v-card-title {
    font-size: 1.5rem !important;
  }
}
</style>