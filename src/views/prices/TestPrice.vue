<template>
  <v-container>
    <div class="tariffs-section">
      <h2 class="hl-section-title">
        {{ $t("menu.internet") }}
      </h2>

      <!-- Переключатель типов (обновлённый) -->
      <v-row justify="center" class="mb-4">
        <v-col cols="12" class="text-center">
          <v-btn-toggle
            v-model="activeType"
            mandatory
            variant="outlined"
            rounded="pill"
            color="amber"
            class="category-toggle"
          >
            <v-btn
              v-for="(type, key) in switchTypes"
              :key="key"
              :value="key"
              size="small"
              class="text-none px-4"
            >
              <span v-if="type.icon" class="mr-1">{{ type.icon }}</span>
              {{ type.label }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <!-- Карусель тарифов -->
      <swiper
        :slides-per-view="1.15"
        :space-between="16"
        :breakpoints="{
          640: { slidesPerView: 1.8 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
          1200: { slidesPerView: 4 }
        }"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="false"
        :grab-cursor="true"
        class="tariff-slider"
      >
        <swiper-slide
          v-for="(tariff, index) in filteredTariffs"
          :key="index"
          class="tariff-slide"
        >
          <div
            :class="[
              'tariff-card card-hover pa-6 card-animate',
              getTariffStyle(tariff).class
            ]"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar" :class="getTariffStyle(tariff).accent"></div>


            <!-- Заголовок с иконкой -->
            <div class="text-center mb-1">
              <v-icon
                :icon="tariff.icon"
                :size="36"
                :color="getTariffStyle(tariff).iconColor"
                class="me-1"
              ></v-icon>
              <h3 class="tariff-title text-h5 font-weight-bold">
                {{ tariff.name }}
              </h3>
            </div>

            <!-- Цена и скорость -->
            <div class="price-section text-center mb-1" style="position: relative;">
              <div v-if="tariff.oldPrice" class="promo-badge">
                Акція на 6 міс! Потім {{ tariff.oldPrice }} ₴
              </div>
              <div class="price-display d-flex justify-center align-center mb-1">
                <span class="currency" :style="tariff.oldPrice ? 'color: #e91e63;' : ''">₴</span>
                <span class="amount text-h4 font-weight-bold mx-1" :style="tariff.oldPrice ? 'color: #e91e63;' : ''">{{ tariff.price }}</span>
                <span class="frequency text-body-2">/{{ $t("prices.month") }}</span>
              </div>
              <div class="speed text-body-2">
                <span class="speed-icon">🌐</span>
                {{ $t("prices.up-to") }} {{ tariff.speed }} {{ $t("prices.Mbps") }}
              </div>
            </div>

            <div class="divider mb-2"></div>

            <!-- Батарейка / автономность -->
            <div class="battery-section mb-1">
              <div class="battery-container">
                <div
                  class="battery-fill"
                  :style="{
                    width: getChargeLevel(tariff) + '%',
                    backgroundColor: getTariffStyle(tariff).iconColor
                  }"
                ></div>
              </div>
              <p class="battery-text">{{ getBatteryText(tariff) }}</p>
            </div>

            <!-- Внешний IP -->
            <div class="option-section mb-1 py-2 px-3 rounded" style="background-color: #f9f9f9;">
              <label class="switch-label">
                <input
                  type="checkbox"
                  v-model="tariff.externalIpEnabled"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                {{ $t('prices.external-ip') }}
                <span v-if="tariff.externalIpPrice > 0" class="price-additional">(+{{ tariff.externalIpPrice }} ₴)</span>
              </label>
            </div>

            <!-- IPTV -->
            <template v-if="tariff.iptv">
              <div class="option-section mb-1 py-2 px-3 rounded" style="background-color: #f9f9f9;">
                <label class="switch-label">
                  <input
                    type="checkbox"
                    v-model="iptvEnabled"
                    class="switch-input"
                  />
                  <span class="switch-slider"></span>
                  + IPTV
                  <img
                    src="@/assets/prices/logo_sweettv_light.svg"
                    alt="Sweet.TV"
                    class="iptv-logo"
                    width="50"
                    height="25"
                  />
                </label>

                <div v-if="iptvEnabled" class="iptv-options mt-1">
                  <div
                    v-for="iptvTariff in iptvTariffs"
                    :key="iptvTariff.id"
                    class="iptv-option"
                    :class="{ 'selected': selectedIptvTariff?.id === iptvTariff.id }"
                    @click="selectIptvTariff(iptvTariff)"
                  >
                    <span>{{ iptvTariff.name }} — {{ iptvTariff.tv_count }} каналів</span>
                    <span class="iptv-price">+{{ iptvTariff.price }} ₴</span>
                    <span class="iptv-chip">{{ iptvTariff.tv_count }} TV</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Выбор технологии подключения -->
            <div v-if="tariff.connectionTypes && tariff.connectionTypes.length > 0" class="connection-section mb-2">
              <div class="connection-row">
                <span class="connection-label">{{ $t('prices.connection-type') || 'Підключення:' }}</span>
                <div class="connection-options">
                  <button
                    v-for="type in tariff.connectionTypes"
                    :key="type"
                    :class="[
                      'connection-btn',
                      { active: selectedConnectionTypes[tariff.id] === type },
                      { disabled: tariff.connectionTypes.length === 1 }
                    ]"
                    :disabled="tariff.connectionTypes.length === 1"
                    @click="selectedConnectionTypes[tariff.id] !== type && (selectedConnectionTypes[tariff.id] = type)"
                  >
                    {{ type }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Итоговая цена -->
            <div
              v-if="totalPrice(tariff) >= 0"
              :class="['total-price-alert', getTariffStyle(tariff).alertColor]"
              class="text-subtitle-1 font-weight-bold text-center py-2 rounded"
              :style="{ borderLeftColor: getTariffStyle(tariff).iconColor }"
            >
              {{ $t("prices.total") }}: {{ tariff.price + totalPrice(tariff) }} ₴/{{ $t("prices.month") }}
            </div>

            <!-- Кнопка заказа -->
            <v-card-actions class="justify-center pt-1">
              <RequestForm
                :FormData="getFormData(tariff)"
                :ButtonTitle="$t('prices.to-buy')"
                :ButtonColor="'#2c3e50'"
                :ButtonIcon="'mdi-cart-outline'"
              />
            </v-card-actions>
          </div>
        </swiper-slide>
      </swiper>

      <!-- Таблиця порівняння тарифів -->
      <div class="mt-12">
        <h3 class="text-center text-h5 font-weight-bold mb-6 text-uppercase text-grey-darken-2">
          Детальне порівняння тарифів
        </h3>
        <TariffComparisonTable 
          v-if="tablePlans.length > 0"
          :plans="tablePlans"
          @select="handleTableSelect"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import RequestForm from '@/components/RequestForm.vue'
import TariffComparisonTable from '@/components/prices/TariffComparisonTable.vue'

export default {
  name: "TestPrice",
  components: { Swiper, SwiperSlide, RequestForm, TariffComparisonTable },

  data() {
    return {
      // Стили по уровням тарифов — только акценты и иконки
      tariffStyles: {
        economy: {
          class: 'economy-tariff',
          accent: 'accent-economy',
          iconColor: '#2e7d32', // тёмно-зелёный
          alertColor: 'green-lighten-3'
        },
        standard: {
          class: 'standard-tariff',
          accent: 'accent-standard',
          iconColor: '#1565c0', // тёмно-синий
          alertColor: 'blue-lighten-3'
        },
        premium: {
          class: 'premium-tariff',
          accent: 'accent-premium',
          iconColor: '#b38800', // тёмно-золотой для контраста
          alertColor: 'amber-lighten-1'
        },
        photon: {
          class: 'photon-tariff',
          accent: 'accent-photon',
          iconColor: '#7c4dff', // глубокий фиолетовый
          alertColor: 'deep-purple-lighten-3'
        }
      },

      switchTypes: {
        multi: { label: 'Для квартир', icon: '🏢' },
        private: { label: 'Приватний сектор', icon: '🏠' },
      },
      activeType: 'multi',

      internetTariffs: [
        // MULTI
        {
          id: 1,
          name: "«Економ»",
          level: "economy",
          speed: 50,
          price: 200,
          iptv: true,
          icon: "mdi-earth",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
          type: 'multi',
          connectionTypes: ['Ethernet', 'GPON'],
          backupPower: {
            ethernet: '8-24 годин',
            gpon: '72 годин'
          }
        },
        {
          id: 2,
          name: "«Стандарт»",
          level: "standard",
          speed: 100,
          price: 250,
          iptv: true,
          icon: "mdi-satellite",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
          type: 'multi',
          connectionTypes: ['Ethernet', 'GPON'],
          backupPower: {
            ethernet: '8-24 годин',
            gpon: '72 годин'
          }
        },
        {
          id: 3,
          name: "«Люкс»",
          level: "premium",
          speed: 1000,
          price: 350,
          iptv: true,
          icon: "mdi-star-shooting",
          features: [],
          externalIpPrice: 0,
          externalIpEnabled: true,
          type: 'multi',
          connectionTypes: ['Ethernet', 'GPON'],
          backupPower: {
            ethernet: '8-24 годин',
            gpon: '72 годин'
          }
        },
        {
          id: 7,
          name: "«Фотон»",
          level: "photon",
          speed: 2500,
          price: 350,
          oldPrice: 649,
          iptv: true,
          icon: "mdi-rocket-launch",
          features: [],
          externalIpPrice: 0,
          externalIpEnabled: true,
          type: 'multi',
          connectionTypes: ['XG-PON'],
          backupPower: {
            'XG-PON': '72 годин'
          }
        },
        // PRIVATE
        {
          id: 4,
          name: "«Хатинка»",
          level: "economy",
          speed: 50,
          price: 250,
          iptv: true,
          icon: "mdi-earth",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
          type: 'private',
          connectionTypes: ['GPON'],
          backupPower: {
            ethernet: '8-24 годин',
            gpon: '72 годин'
          }
        },
        {
          id: 5,
          name: "«Дім»",
          level: "standard",
          speed: 100,
          price: 320,
          iptv: true,
          icon: "mdi-satellite",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
          type: 'private',
          connectionTypes: ['GPON'],
          backupPower: {
            ethernet: '8-24 годин',
            gpon: '72 годин'
          }
        },
        {
          id: 6,
          name: "«Маєток»",
          level: "premium",
          speed: 1000,
          price: 420,
          iptv: true,
          icon: "mdi-star-shooting",
          features: [],
          externalIpPrice: 0,
          externalIpEnabled: true,
          type: 'private',
          connectionTypes: ['GPON'],
          backupPower: {
            ethernet: '8-24 годин',
            gpon: '72 годин'
          }
        },
      ],

      iptvTariffs: [
        { id: 1, name: "S", tv_count: 245, price: 80 },
        { id: 2, name: "M", tv_count: 333, price: 120 },
        { id: 3, name: "L", tv_count: 347, price: 180 },
      ],

      iptvEnabled: false,
      selectedIptvTariff: null,
      selectedConnectionTypes: {},
    }
  },

  computed: {
    filteredTariffs() {
      return this.internetTariffs.filter(tariff => tariff.type === this.activeType)
    },
    tablePlans() {
      return this.filteredTariffs.map(t => ({
        id: t.id,
        name: t.name,
        price: t.price,
        icon: t.icon,
        color: this.getTariffStyle(t).iconColor,
        popular: t.level === 'standard',
        features: {
          speed: t.speed + ' Мбіт/с',
          tech: t.connectionTypes ? t.connectionTypes.join(', ') : '',
          iptv: t.iptv,
          ip: t.externalIpPrice === 0 ? 'Безкоштовно' : (t.externalIpEnabled ? 'Платна опція' : false),
          support: t.level === 'premium' || t.level === 'photon' ? '24/7 VIP' : 'Стандартна'
        }
      }))
    }
  },

  mounted() {
    this.internetTariffs.forEach(tariff => {
      if (tariff.connectionTypes && tariff.connectionTypes.length > 0) {
        this.selectedConnectionTypes[tariff.id] = tariff.connectionTypes[0];
      }
    });
  },

  methods: {
    handleTableSelect(plan) {
      console.log('Selected plan from table:', plan.name)
      // Скролимо до слайдера тарифів
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    selectIptvTariff(tariff) {
      this.selectedIptvTariff = tariff
    },

    totalPrice(tariff) {
      let total = 0
      if (tariff.externalIpEnabled) total += tariff.externalIpPrice
      if (tariff.iptv && this.iptvEnabled && this.selectedIptvTariff)
        total += this.selectedIptvTariff.price
      return total
    },

    getTariffStyle(tariff) {
      return this.tariffStyles[tariff.level] || this.tariffStyles.standard;
    },

    getFormData(tariff) {
      const selectedFeatures = tariff.features.filter(f => f).join(", ")
      const iptvText =
        tariff.iptv && this.iptvEnabled && this.selectedIptvTariff
          ? ` + IPTV (${this.selectedIptvTariff.name})`
          : ""
      const externalIpText = tariff.externalIpEnabled
        ? ` ${this.$t('prices.external-ip')}`
        : ""
      const connectionText = this.selectedConnectionTypes[tariff.id]
        ? ` (${this.selectedConnectionTypes[tariff.id]})`
        : ""

      return `${this.$t("prices.rates")}: ${tariff.name}${connectionText} ${selectedFeatures}${iptvText} ${externalIpText} = ${this.$t("prices.total")}: ₴${tariff.price + this.totalPrice(tariff)} / ${this.$t("prices.month")}`
    },

    getBatteryText(tariff) {
      const conn = this.selectedConnectionTypes[tariff.id] || tariff.connectionTypes?.[0];
      if (conn === 'GPON' || conn === 'XG-PON') return "Працює без світла до 72 годин";
      if (conn === 'Ethernet') return "Працює без світла до 3-8 годин";
      return "";
    },

    getChargeLevel(tariff) {
      const conn = this.selectedConnectionTypes[tariff.id] || tariff.connectionTypes?.[0];
      if (conn === 'GPON' || conn === 'XG-PON') return 80;
      if (conn === 'Ethernet') return 20;
      return 0;
    }
  }
}
</script>

<style scoped>
.tariffs-section {
  padding: 32px 0;
}

.tariff-slider {
  max-height: 750px;
}





/* Стили для переключателя тарифов (в стиле category-toggle) */
.category-toggle {
  display: inline-flex;
  border: 1px solid #e0e0e0;
}

.category-toggle :deep(.v-btn) {
  border-color: transparent !important;
  color: #2c3e50 !important;
  font-weight: 500;
}

.category-toggle :deep(.v-btn.v-btn--active) {
  border-color: #feb700 !important;
  background: linear-gradient(135deg, #fed100, #feb700) !important;
  color: #000 !important;
}

.category-toggle :deep(.v-btn:focus-visible) {
  outline: none !important;
}

.tariff-slide {
  height: auto;
}

.tariff-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  min-height: 420px;
}

.tariff-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

/* Цветное свечение карточек при наведении */
.tariff-card.economy-tariff:hover {
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.15);
  border-color: #a5d6a7;
}
.tariff-card.standard-tariff:hover {
  box-shadow: 0 8px 24px rgba(21, 101, 192, 0.15);
  border-color: #90caf9;
}
.tariff-card.premium-tariff:hover {
  box-shadow: 0 8px 24px rgba(179, 136, 0, 0.18);
  border-color: #ffe082;
}
.tariff-card.photon-tariff:hover {
  box-shadow: 0 8px 24px rgba(124, 77, 255, 0.25);
  border-color: #b388ff;
}

.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Акцентные полосы — цветные по уровням */
.accent-economy {
  background: linear-gradient(to bottom, #4caf50, #2e7d32);
}

.accent-standard {
  background: linear-gradient(to bottom, #2196f3, #1565c0);
}

.accent-premium {
  background: linear-gradient(135deg, #fed100, #feb700);
}

.accent-photon {
  background: linear-gradient(135deg, #e040fb, #7c4dff);
}

.promo-badge {
  position: absolute;
  top: -12px;
  right: -12px;
  background: linear-gradient(135deg, #e91e63, #c2185b);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(233, 30, 99, 0.4);
  z-index: 2;
  animation: pulse-badge 2s infinite;
  white-space: nowrap;
}

@keyframes pulse-badge {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.tariff-title {
  color: #2c3e50;
  line-height: 1.3;
  margin: 8px 0 4px 0;
  font-size: 1.3rem;
}

.price-section {
  background: #f8fbfa;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 16px;
}

.price-display {
  gap: 2px;
  align-items: baseline;
}

.currency {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
}

.amount {
  color: #2c3e50;
  font-size: 1.75rem;
  font-weight: bold;
}

.frequency {
  color: #666;
  font-size: 0.875rem;
}

.speed {
  color: #424242;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.875rem;
}

.speed-icon {
  font-size: 14px;
}

.divider {
  border: none;
  border-top: 1px solid #eee;
}

.battery-section {
  text-align: center;
  margin: 12px 0;
}

.battery-container {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 6px 0;
  position: relative;
}

.battery-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease-in-out, background-color 0.3s ease;
}

.battery-text {
  color: #555;
  font-size: 0.85rem;
  margin: 4px 0 0 0;
}

.option-section {
  transition: all 0.2s ease;
  border-radius: 6px;
}

.option-section:hover {
  background: #f0f0f0;
}

.switch-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  font-weight: 500;
  font-size: 0.875rem;
}

.switch-input {
  display: none;
}

.switch-slider {
  width: 36px;
  height: 18px;
  background-color: #ccc;
  border-radius: 9px;
  position: relative;
  transition: 0.3s;
}

.switch-slider::before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  top: 1px;
  left: 1px;
  transition: 0.3s;
}

.switch-input:checked + .switch-slider {
  background-color: #fed100;
}

.switch-input:checked + .switch-slider::before {
  transform: translateX(18px);
}

.price-additional {
  color: #e91e63;
  font-weight: 500;
  margin-left: 6px;
}

.iptv-logo {
  margin-left: 6px;
  opacity: 0.8;
}

.iptv-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.iptv-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.875rem;
}

.iptv-option:hover {
  background: #e8f5e8;
}

.iptv-option.selected {
  background: #e8f5e8;
  border: 1px solid #4CAF50;
}

.iptv-price {
  font-weight: bold;
  color: #e91e63;
}

.iptv-chip {
  background-color: #e8f5e8;
  color: #2e7d32;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
}

.total-price-alert {
  background-color: #f8f9fa;
  border-left: 4px solid transparent;
  margin-top: auto;
  margin-bottom: 12px;
  font-size: 1rem;
}

/* Цвета для итоговой цены — Material-палитра */
.green-lighten-3 {
  border-left-color: #2e7d32 !important;
}

.blue-lighten-3 {
  border-left-color: #1565c0 !important;
}

.amber-lighten-1 {
  border-left-color: #b38800 !important;
}

.deep-purple-lighten-3 {
  border-left-color: #7c4dff !important;
}

/* Технология подключения */
.connection-section {
  margin: 12px 0;
}

.connection-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.connection-label {
  font-size: 0.875rem;
  color: #555;
  font-weight: 500;
  white-space: nowrap;
}

.connection-options {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.connection-btn {
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
  min-width: 60px;
  text-align: center;
}

.connection-btn.active {
  background-color: #fed100;
  color: black;
  border-color: #fed100;
}

.connection-btn.disabled {
  cursor: default;
  opacity: 0.7;
  background: #f5f5f5;
  color: #777;
  border-color: #ddd;
}
</style>