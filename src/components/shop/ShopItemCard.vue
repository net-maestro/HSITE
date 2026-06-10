<!-- ShopItemCard.vue -->
<template>
  <v-card
    class="equipment-card apple-style-card"
    elevation="0"
    @click="$emit('click', item)"
  >
    <!-- Badges -->
    <div class="badges-container">
      <v-chip
        v-if="item.rating >= 4.8 || item.price > 2000"
        color="secondary"
        size="small"
        class="font-weight-bold text-dark px-3 mb-2 shadow-sm"
        variant="flat"
      >
        ХІТ ПРОДАЖІВ
      </v-chip>
      <v-chip
        v-if="item.name.includes('Gigabit') || item.name.includes('AX') || item.name.includes('ac')"
        color="#1e293b"
        text-color="white"
        size="small"
        class="font-weight-bold px-3 shadow-sm"
        variant="flat"
      >
        GIGABIT
      </v-chip>
    </div>

    <div class="image-container pt-8 pb-4">
      <div class="image-wrapper">
        <v-img
          :src="currentImage"
          :alt="item.name"
          height="200"
          class="equipment-image mx-auto"
        ></v-img>
      </div>

      <div v-if="item.images" class="gallery-indicators-wrapper mt-4">
        <div class="gallery-indicators">
          <button 
            v-for="(img, idx) in item.images" 
            :key="idx"
            :class="['indicator', { active: currentImageIndex === idx }]"
            @click.stop="currentImageIndex = idx"
            :aria-label="`Фото ${idx + 1}`"
          >
            <span class="indicator-dot"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="card-content d-flex flex-column flex-grow-1 px-6 pb-6 text-center">
      <v-card-subtitle class="equipment-category text-uppercase font-weight-bold text-grey-darken-1 pa-0 mb-2 letter-spacing-1">
        {{ item.category }}
      </v-card-subtitle>

      <v-card-title class="equipment-title text-h6 font-weight-black mb-2 pa-0" style="color: #1e293b;">
        {{ item.name }}
      </v-card-title>

      <div class="mb-4 d-flex justify-center">
        <v-rating
          :model-value="item.rating"
          active-color="#fed100"
          color="grey-lighten-2"
          size="small"
          readonly
          density="compact"
        ></v-rating>
      </div>

      <div class="equipment-price text-h5 font-weight-black mb-6" style="color: #1e293b;">
        {{ item.price }} <span class="text-subtitle-1">₴</span>
      </div>

      <!-- Specs Toggle -->
      <div class="specs-wrapper mb-6">
        <a href="#" class="toggle-specs-link font-weight-bold text-caption" @click.stop.prevent="showSpecs = !showSpecs">
          {{ showSpecs ? 'Сховати характеристики' : 'Характеристики' }}
          <v-icon size="small" class="ml-1">{{ showSpecs ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </a>
        
        <v-expand-transition>
          <div v-show="showSpecs" class="equipment-specs text-body-2 text-left mt-4 pt-4 border-top" v-html="item.Info"></div>
        </v-expand-transition>
      </div>

      <div class="mt-auto cart-action-wrapper">
        <v-btn
          color="#1e293b"
          class="add-to-cart-btn font-weight-bold text-white"
          variant="flat"
          rounded="pill"
          size="large"
          block
          prepend-icon="mdi-cart-plus"
          @click.stop="addToCart"
        >
          У кошик
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const cartStore = useCartStore()
const currentImageIndex = ref(props.item._currentImageIndex || 0)
const showSpecs = ref(false)

const currentImage = computed(() => {
  if (props.item.images && props.item.images.length > 0) {
    return props.item.images[currentImageIndex.value]
  }
  return props.item.img
})

const addToCart = () => {
  cartStore.addItem({
    id: props.item.name, 
    name: props.item.name,
    price: typeof props.item.price === 'string' ? parseInt(props.item.price) : props.item.price,
    img: currentImage.value,
    type: 'device'
  })
  cartStore.toggleCart(true)
}
</script>

<style scoped>
.apple-style-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  background: #ffffff;
  border-radius: 28px !important;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 12px 36px rgba(0,0,0,0.04) !important;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
}

.apple-style-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(0,0,0,0.1) !important;
  border-color: rgba(0,0,0,0.08);
}

.badges-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.text-dark {
  color: #1e293b !important;
}

.shadow-sm {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}

.image-container {
  position: relative;
  width: 100%;
  background: radial-gradient(circle at center, #f8fafc 0%, #ffffff 100%);
}

.image-wrapper {
  overflow: hidden;
  padding: 0 24px;
}

/* Vuetify v-img style override for contain */
:deep(.v-img__img--contain) {
  object-fit: contain;
}

.equipment-image {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  mix-blend-mode: multiply; /* Helps white backgrounds blend */
}

.apple-style-card:hover .equipment-image {
  transform: scale(1.08);
}

.equipment-title {
  white-space: normal;
  line-height: 1.3;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

/* Indicators */
.gallery-indicators-wrapper {
  display: flex;
  justify-content: center;
}

.gallery-indicators {
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.04);
  padding: 6px 12px;
  border-radius: 20px;
}

.indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.indicator.active .indicator-dot {
  background: #1e293b;
  transform: scale(1.3);
}

/* Specs */
.toggle-specs-link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  background: #f1f5f9;
  padding: 6px 16px;
  border-radius: 20px;
}
.toggle-specs-link:hover {
  color: #1e293b;
  background: #e2e8f0;
}

.border-top {
  border-top: 1px dashed rgba(0,0,0,0.1);
}

.equipment-specs {
  color: #475569;
}

:deep(.spec) {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.03);
  padding-bottom: 4px;
}

:deep(.spec-title) {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.85rem;
  text-align: left;
}

:deep(.spec-value) {
  text-align: right;
  font-size: 0.85rem;
}

/* Add to cart btn */
.add-to-cart-btn {
  transition: all 0.3s ease;
}

.apple-style-card:hover .add-to-cart-btn {
  background-color: #fed100 !important;
  color: #1e293b !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(254, 209, 0, 0.3) !important;
}
</style>
