<!-- components/PromoCard.vue -->
<template>
  <v-card
    :class="[
      'promo-card card-hover card-animate',
      !promo.status ? 'inactive-card' : 'active-card'
    ]"
    hover
    elevation="0"
    style="min-height: 360px; display: flex; flex-direction: column;"
  >
    <!-- Акцентная полоса слева (как в тарифах) -->
    <div
      class="accent-bar"
      :class="!promo.status ? 'accent-inactive' : 'accent-active'"
    ></div>

    <!-- Изображение -->
    <div class="text-center mb-3 px-2">
      <v-img
        :src="promo.image"
        :height="promo.size || 200"
        contain
        class="promo-image rounded-lg mx-auto"
        :class="{ 'grayscale': !promo.status }"
      ></v-img>
    </div>

    <!-- Заголовок -->
    <v-card-title class="text-h6 font-weight-bold text-center mb-2 px-4">
      {{ promo.title }}
    </v-card-title>

    <!-- Кнопка детальніше -->
    <v-card-actions class="pt-2 mt-auto px-4">
      <v-btn
        v-if="showDetailsButton"
        size="large"
        block
        variant="tonal"
        :color="!promo.status ? 'error' : '#b38800'"
        :to="{ name: 'PromoDetail', params: { id: promo.id } }"
        prepend-icon="mdi-information-outline"
      >
        {{ $t('promo.details') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PromoCard',
  props: {
    promo: { type: Object, required: true },
    showDetailsButton: { type: Boolean, default: true }
  }
}
</script>

<style scoped>
/* 🎨 Стили, перенесённые и адаптированные из Intercom.vue */

.promo-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-height: 360px;
  overflow: hidden;
}

.promo-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
}

/* Акцентная полоса слева — как в тарифах */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.accent-active {
  background: linear-gradient(135deg, #fed100, #feb700);
}

.accent-inactive {
  background: linear-gradient(to bottom, #D9534F, #C12E27);
}

/* Заголовок */
.v-card-title {
  white-space: unset;
  font-size: 1.1rem;
  color: #2c3e50;
  line-height: 1.3;
}

/* Изображение */
.promo-image {
  max-height: 200px;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.grayscale {
  filter: grayscale(100%) opacity(0.6);
}

/* Адаптив */
@media (max-width: 600px) {
  .promo-card {
    padding: 12px;
    min-height: 320px;
  }

  .v-card-title {
    font-size: 1rem !important;
  }

  .promo-image {
    max-height: 160px;
  }

  .v-btn {
    font-size: 0.9rem;
  }
}
</style>