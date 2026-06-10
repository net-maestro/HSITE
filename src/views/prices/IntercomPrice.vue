<!-- Intercom.vue -->
<template>
  <div class="intercom-section">
    <h2 class="section-title">
      {{ $t("menu.intercom") }}
    </h2>

    <v-container>
      <v-row justify="center" class="g-4">
        <!-- Карточки тарифов -->
        <v-col
          v-for="(service, index) in intercomTariffs"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <div
            class="tariff-card card-hover pa-6 card-animate"
            style="min-height: 420px; display: flex; flex-direction: column;"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar" :class="getTariffStyle(service).accent"></div>

            <!-- Заголовок с иконкой -->
            <div class="text-center mb-1">
              <v-icon
                :icon="service.icon"
                :size="36"
                :color="getTariffStyle(service).iconColor"
                class="me-1"
              ></v-icon>
              <h3 class="tariff-title text-h5 font-weight-bold">
                <span v-if="service.name === 'audio'">{{ $t("intercom.intercom") }}</span>
                <span v-else>{{ $t("intercom.video-intercom") }}</span>
              </h3>
            </div>

            <div class="divider mb-2"></div>

            <!-- Подписка -->
            <div class="option-section mb-1 py-2 px-3 rounded" style="background-color: #f9f9f9;">
              <label class="switch-label">
                <input
                  type="checkbox"
                  v-model="service.includeSubscription"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                {{ $t('intercom.subscription') }}
                <span class="price-additional">({{ service.subscription }} ₴/{{ $t('prices.month') }})</span>
              </label>
            </div>

            <!-- Подключение -->
            <div class="option-section mb-1 py-2 px-3 rounded" style="background-color: #f9f9f9;">
              <label class="switch-label">
                <input
                  type="checkbox"
                  v-model="service.includeConnection"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                {{ $t('intercom.connection-cost') }}
                <span class="price-additional">({{ service.connectionCost }} ₴)</span>
              </label>
            </div>

            <!-- Ключ -->
            <div class="option-section mb-1 py-2 px-3 rounded" style="background-color: #f9f9f9;">
              <label class="switch-label">
                <input
                  type="checkbox"
                  v-model="service.includeKey"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                {{ $t('intercom.order-key') }}
                <span class="price-additional" v-if="service.includeKey">
                  ({{ service.keyCount }} × {{ service.keyCost }} ₴)
                </span>
              </label>

              <!-- Выбор количества ключей -->
              <div v-if="service.includeKey" class="key-selector mt-2 d-flex align-center justify-center">
                <button
                  class="key-btn"
                  @click="decreaseKeyCount(service)"
                  :disabled="service.keyCount <= 1"
                >
                  −
                </button>
                <span class="key-count mx-3 font-weight-bold">{{ service.keyCount }}</span>
                <button
                  class="key-btn"
                  @click="increaseKeyCount(service)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Итоговая цена -->
            <div
              v-if="calculateTotal(service) > 0"
              class="total-price-alert text-subtitle-1 font-weight-bold text-center py-2 rounded"
              :style="{ 
                backgroundColor: '#f8f9fa',
                borderLeftColor: getTariffStyle(service).iconColor 
              }"
            >
              {{ $t("prices.total") }}: {{ calculateTotal(service) }} ₴
            </div>

            <!-- Кнопка заказа -->
            <v-card-actions class="justify-center pt-1 mt-auto">
              <RequestForm
                :FormData="getFormData(service)"
                :ButtonTitle="$t('prices.to-buy')"
                :ButtonColor="'#2c3e50'"
                :ButtonIcon="'mdi-cart-outline'"
              />
            </v-card-actions>
          </div>
        </v-col>

        <!-- Информационная карточка -->
        <v-col cols="12" md="6" lg="4">
          <div
            class="tariff-card card-hover pa-6 card-animate info-card"
            style="min-height: 420px; display: flex; flex-direction: column;"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar accent-info"></div>

            <!-- Заголовок -->
            <div class="text-center mb-1">
              <v-icon
                icon="mdi-information-outline"
                size="36"
                color="#6A1B9A"
                class="me-1"
              ></v-icon>
              <h3 class="tariff-title text-h5 font-weight-bold">
                {{ $t("intercom.intercom-service") }}
              </h3>
            </div>

            <div class="divider mb-2"></div>

            <!-- Описание -->
            <p class="text-body-1 text-center mb-4">
              {{ $t("intercom.cost-of-connection") }}
            </p>

            <!-- Список услуг -->
            <ul class="info-list mt-auto">
              <li class="info-item">• {{ $t('intercom.installation') }}</li>
              <li class="info-item">• {{ $t('intercom.setup') }}</li>
              <li class="info-item">• {{ $t('intercom.instruction') }}</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';

export default {
  name: "Intercom",
  components: { RequestForm },
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      // Стили по уровням — как в обновлённых интернет-тарифах
      tariffStyles: {
        standard: {
          accent: 'accent-standard',
          iconColor: '#2e7d32', // тёмно-зелёный
        },
        premium: {
          accent: 'accent-premium',
          iconColor: '#b38800', // тёмно-золотой
        }
      },

      intercomTariffs: [
        {
          name: "audio",
          level: "standard",
          subscription: 60,
          keyCost: 120,
          connectionCost: 600,
          keyCount: 1,
          includeSubscription: true,
          includeKey: false,
          includeConnection: false,
          icon: "mdi-doorbell",
        },
        {
          name: "video",
          level: "premium",
          subscription: 75,
          keyCost: 120,
          connectionCost: 1450,
          keyCount: 1,
          includeSubscription: true,
          includeKey: false,
          includeConnection: false,
          icon: "mdi-doorbell-video",
        },
      ],
    };
  },
  methods: {
    getTariffStyle(service) {
      return this.tariffStyles[service.level] || this.tariffStyles.standard;
    },

    calculateTotal(service) {
      const subscriptionCost = service.includeSubscription ? service.subscription : 0;
      const keyCost = service.includeKey ? service.keyCost * service.keyCount : 0;
      const connectionCost = service.includeConnection ? service.connectionCost : 0;
      return subscriptionCost + connectionCost + keyCost;
    },

    increaseKeyCount(service) {
      if (service.includeKey) {
        service.keyCount += 1;
      }
    },

    decreaseKeyCount(service) {
      if (service.includeKey && service.keyCount > 1) {
        service.keyCount -= 1;
      }
    },

    getFormData(service) {
      let selectedServices = [];

      if (service.includeSubscription) {
        selectedServices.push(`${this.$t("intercom.subscription")}: ${service.subscription} ₴`);
      }
      if (service.includeConnection) {
        selectedServices.push(`${this.$t("intercom.connection-cost")}: ${service.connectionCost} ₴`);
      }
      if (service.includeKey && service.keyCount > 0) {
        selectedServices.push(`${this.$t("intercom.intercom-key")}: ${service.keyCount} x ${service.keyCost} ₴`);
      }

      return `${this.$t('prices.rates')}: ${service.name} - ${selectedServices.join(", ")}. ${this.$t("prices.total")}: ₴${this.calculateTotal(service)}`;
    },
  },
};
</script>

<style scoped>
.intercom-section {
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
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
}

/* Акцентные полосы */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.accent-standard {
  background: linear-gradient(to bottom, #4caf50, #2e7d32);
}

.accent-premium {
  background: linear-gradient(135deg, #fed100, #feb700);
}

.accent-info {
  background: linear-gradient(to bottom, #9C27B0, #6A1B9A);
}

.tariff-title {
  color: #2c3e50;
  line-height: 1.3;
  margin: 8px 0 4px 0;
  font-size: 1.3rem;
}

.divider {
  border: none;
  border-top: 1px solid #eee;
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
  flex-wrap: wrap;
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

.key-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.key-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.key-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
}

.key-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.key-count {
  font-size: 1.1rem;
  min-width: 24px;
  text-align: center;
}

.total-price-alert {
  background-color: #f8f9fa;
  border-left: 4px solid transparent;
  margin-top: auto;
  margin-bottom: 12px;
  font-size: 1rem;
}

/* Стиль информационной карточки */
.info-card {
  background: #fafafa;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.info-item {
  padding: 6px 0;
  color: #424242;
  font-size: 0.9rem;
}

/* Адаптив под мобильные */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .tariff-card {
    padding: 12px;
    min-height: auto;
  }

  .tariff-title {
    font-size: 1.1rem;
  }

  .switch-label {
    font-size: 0.8rem;
  }

  .key-btn {
    width: 26px;
    height: 26px;
    font-size: 0.9rem;
  }

  .key-count {
    font-size: 1rem;
  }

  .info-item {
    font-size: 0.85rem;
  }
}
</style>