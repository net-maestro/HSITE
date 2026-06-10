<template>
  <v-card
    class="promo-card pa-5 rounded-xl card-hover"
    :class="{ 'card-animate': animated && promo.status }"
    hover
    elevation="2"
  >
    <!-- Лента статуса -->
    <div :class="['ribbon', !promo.status ? 'ribbon-inactive' : 'ribbon-active']">
      {{ !promo.status ? $t('promo.inactive') : $t('promo.active') }}
    </div>

    <!-- Изображение -->
    <div class="text-center mb-4">
      <v-img
        :src="promo.image"
        :height="promo.size || 300"
        contain
        class="promo-image rounded-lg mx-auto"
        :class="{ 'grayscale': !promo.status }"
      ></v-img>
    </div>

    <!-- Заголовок -->
    <v-card-title class="text-h6 font-weight-bold text-center mb-3 px-2 text-wrap">
      {{ promo.title }}
    </v-card-title>

    <!-- Описание с прокруткой -->
    <v-card-text class="text-body-1 text-grey-darken-1 px-4 pb-4 description-scroll">
      <div v-html="promo.description"></div>
    </v-card-text>

    <!-- Кнопка -->
    <v-card-actions v-if="promo.button && promo.status" class="pt-2 mt-auto">
      <div class="w-100 text-center">
        <!-- Використовуємо кнопку для відкриття форми або просто перехід -->
        <v-btn
          color="primary"
          variant="flat"
          block
          size="large"
          class="font-weight-bold"
          rounded="lg"
          @click="$emit('join', promo)"
        >
          {{ $t('promo.join-the-promotion') }}
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  promo: {
    type: Object,
    required: true
  },
  animated: {
    type: Boolean,
    default: true
  }
})

defineEmits(['join'])
</script>

<style scoped>
.promo-card {
  position: relative;
  overflow: hidden;
  transition: transform var(--hl-transition-normal), box-shadow var(--hl-transition-normal);
  border: 1px solid #eeeeee;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--hl-shadow-hover);
}

.promo-image {
  max-height: 280px;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.grayscale {
  filter: grayscale(100%) opacity(0.7);
}

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
  background: linear-gradient(135deg, var(--hl-primary) 0%, #26A69A 100%);
}

.ribbon-inactive {
  background: linear-gradient(135deg, #D9534F 0%, #C12E27 100%);
  opacity: 0.8;
}

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
</style>
