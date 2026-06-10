<template>
  <div class="tariff-comparison-table my-8" style="margin-bottom: 80px !important;">
    <v-card class="hl-card" rounded="xl" elevation="0">
      <div class="table-responsive">
        <v-table class="bg-transparent custom-table">
          <thead>
            <tr>
              <th class="text-left font-weight-bold text-uppercase text-grey-darken-1 feature-col-header">
                Характеристика
              </th>
              <th v-for="plan in plans" :key="plan.id" class="text-center pb-4 pt-6 plan-col">
                <div class="plan-header">
                  <v-icon :color="plan.color" size="32" class="mb-2">{{ plan.icon }}</v-icon>
                  <h3 class="text-h6 font-weight-bold plan-name">{{ plan.name }}</h3>
                  <div class="text-h5 font-weight-black mt-2 plan-price" :style="{ color: plan.color }">
                    {{ plan.price }} <span class="text-caption text-grey">грн/міс</span>
                  </div>
                  <v-chip v-if="plan.popular" color="secondary" size="small" class="mt-2 text-black font-weight-bold" rounded="pill">
                    Популярний
                  </v-chip>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(feature, idx) in features" :key="idx" class="feature-row">
              <td class="font-weight-medium py-4 feature-col">
                {{ feature.name }}
              </td>
              <td v-for="plan in plans" :key="plan.id + '-' + idx" class="text-center py-4">
                <template v-if="typeof plan.features[feature.key] === 'boolean'">
                  <v-icon v-if="plan.features[feature.key]" color="success" size="24">mdi-check-circle</v-icon>
                  <v-icon v-else color="grey-lighten-2" size="24">mdi-minus-circle-outline</v-icon>
                </template>
                <template v-else>
                  <span class="font-weight-bold plan-feature-text">{{ plan.features[feature.key] }}</span>
                </template>
              </td>
            </tr>
            <!-- Рядок кнопок підключення -->
            <tr class="action-row">
              <td class="feature-col"></td>
              <td v-for="plan in plans" :key="'btn-' + plan.id" class="text-center py-6 px-2">
                <v-btn
                  :color="plan.popular ? 'secondary' : 'primary'"
                  :class="plan.popular ? 'text-black' : 'text-white'"
                  variant="flat"
                  rounded="pill"
                  class="font-weight-bold connect-btn"
                  elevation="0"
                  @click="$emit('select', plan)"
                >
                  Підключити
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  plans: {
    type: Array,
    default: () => [
      {
        id: 'basic',
        name: 'Базовий',
        price: 150,
        icon: 'mdi-turtle',
        color: '#4ecdc4',
        popular: false,
        features: {
          speed: '100 Мбіт/с',
          tech: 'FTTB',
          iptv: false,
          ip: false,
          support: 'Стандартна'
        }
      },
      {
        id: 'optima',
        name: 'Оптимальний',
        price: 250,
        icon: 'mdi-rabbit',
        color: '#ff9f43',
        popular: true,
        features: {
          speed: '500 Мбіт/с',
          tech: 'GPON',
          iptv: true,
          ip: false,
          support: 'Пріоритетна'
        }
      },
      {
        id: 'gigabit',
        name: 'Гігабіт',
        price: 350,
        icon: 'mdi-rocket-launch',
        color: '#ff6b6b',
        popular: false,
        features: {
          speed: '1000 Мбіт/с',
          tech: 'GPON',
          iptv: true,
          ip: true,
          support: '24/7 VIP'
        }
      }
    ]
  },
  features: {
    type: Array,
    default: () => [
      { key: 'speed', name: 'Швидкість інтернету' },
      { key: 'tech', name: 'Технологія підключення' },
      { key: 'iptv', name: 'IPTV Телебачення' },
      { key: 'ip', name: 'Статична IP-адреса' }
    ]
  }
})

defineEmits(['select'])
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  /* Приховуємо стандартний скроллбар */
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 24px; /* Fix cutoff for buttons inside overflow */
}
.table-responsive::-webkit-scrollbar {
  display: none;
}

.custom-table {
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
}

/* Липка перша колонка (Назви характеристик) */
.feature-col-header,
.feature-col {
  position: sticky;
  left: 0;
  background-color: #ffffff;
  z-index: 10;
  box-shadow: 2px 0 8px -2px rgba(0,0,0,0.06);
  min-width: 140px;
  max-width: 180px;
  white-space: normal;
  border-right: 1px solid rgba(0,0,0,0.03);
}

.feature-col-header {
  z-index: 11; /* Вище ніж звичайні ячейки */
}

.plan-col {
  min-width: 140px;
}

.plan-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 140px;
}

.feature-row {
  /* removed hover transition */
}

.custom-table th, .custom-table td {
  border-bottom: 1px solid #f0f0f0 !important;
  vertical-align: middle;
}

.action-row td {
  border-bottom: none !important;
}

/* Адаптивні стилі для мобільних пристроїв */
@media (max-width: 600px) {
  .plan-name {
    font-size: 1.1rem !important;
  }
  .plan-price {
    font-size: 1.25rem !important;
  }
  .feature-col {
    font-size: 0.85rem !important;
    min-width: 120px;
  }
  .plan-feature-text {
    font-size: 0.9rem !important;
  }
  .connect-btn {
    padding: 0 16px !important;
    font-size: 0.8rem !important;
    height: 36px !important;
  }
}
</style>
