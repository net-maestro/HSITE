<template>
  <div class="intercom-section bg-grey-lighten-4 py-12">
    <v-container>
      <div class="text-center mb-12">
        <h2 class="hl-section-title">
          {{ $t("menu.intercom") }}
        </h2>
        <p class="text-body-1 text-grey-darken-1 mt-4">Безпека та комфорт вашої оселі</p>
      </div>

      <v-row justify="center" class="g-4 align-stretch">
        <!-- Карточки тарифов -->
        <v-col
          v-for="(service, index) in intercomTariffs"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <v-card class="hl-card tariff-card pa-6 pa-md-8 w-100 d-flex flex-column" rounded="xl" elevation="0">
            <!-- Декоративний фон для іконки -->
            <div class="icon-bg" :style="{ background: service.gradient }"></div>
            
            <div class="text-center position-relative mb-6">
              <div class="icon-wrapper mx-auto mb-4 d-flex align-center justify-center rounded-circle" :style="{ background: 'white', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', width: '80px', height: '80px' }">
                <v-icon :icon="service.icon" size="40" :color="service.color"></v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold mb-1">
                <span v-if="service.name === 'audio'">{{ $t("intercom.intercom") }}</span>
                <span v-else>{{ $t("intercom.video-intercom") }}</span>
              </h3>
              <v-chip size="small" :color="service.color" variant="tonal" class="font-weight-bold">
                {{ service.badge }}
              </v-chip>
            </div>

            <!-- Опції -->
            <div class="options-container flex-grow-1">
              <!-- Підписка -->
              <div class="option-item pa-3 mb-3 rounded-lg d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-switch
                    v-model="service.includeSubscription"
                    :color="service.color"
                    hide-details
                    density="compact"
                    class="mr-3 custom-switch"
                  ></v-switch>
                  <span class="font-weight-medium">{{ $t('intercom.subscription') }}</span>
                </div>
                <span class="font-weight-bold" :style="{ color: service.color }">{{ service.subscription }} ₴/{{ $t('prices.month') }}</span>
              </div>

              <!-- Підключення -->
              <div class="option-item pa-3 mb-3 rounded-lg d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-switch
                    v-model="service.includeConnection"
                    :color="service.color"
                    hide-details
                    density="compact"
                    class="mr-3 custom-switch"
                  ></v-switch>
                  <span class="font-weight-medium">{{ $t('intercom.connection-cost') }}</span>
                </div>
                <span class="font-weight-bold text-grey-darken-1">{{ service.connectionCost }} ₴</span>
              </div>

              <!-- Ключі -->
              <div class="option-item pa-3 mb-4 rounded-lg flex-column align-stretch">
                <div class="d-flex align-center justify-space-between mb-2">
                  <div class="d-flex align-center">
                    <v-switch
                      v-model="service.includeKey"
                      :color="service.color"
                      hide-details
                      density="compact"
                      class="mr-3 custom-switch"
                    ></v-switch>
                    <span class="font-weight-medium">{{ $t('intercom.order-key') }}</span>
                  </div>
                  <span v-if="service.includeKey" class="font-weight-bold text-grey-darken-1">
                    {{ service.keyCount * service.keyCost }} ₴
                  </span>
                </div>
                
                <v-expand-transition>
                  <div v-if="service.includeKey" class="d-flex align-center justify-center mt-2 bg-white rounded-pill pa-1 mx-auto" style="width: 140px; border: 1px solid #eee;">
                    <v-btn icon="mdi-minus" size="x-small" variant="text" :disabled="service.keyCount <= 1" @click="decreaseKeyCount(service)"></v-btn>
                    <span class="mx-3 font-weight-bold">{{ service.keyCount }}</span>
                    <v-btn icon="mdi-plus" size="x-small" variant="text" @click="increaseKeyCount(service)"></v-btn>
                  </div>
                </v-expand-transition>
              </div>
            </div>

            <!-- Итоговая цена и Кнопка -->
            <div class="mt-4 pt-4 border-top">
              <div class="d-flex justify-space-between align-center mb-4">
                <span class="text-body-1 text-grey-darken-1">{{ $t("prices.total") }}:</span>
                <span class="text-h5 font-weight-black" :style="{ color: service.color }">
                  {{ calculateTotal(service) }} ₴
                </span>
              </div>
              
              <RequestForm
                :FormData="getFormData(service)"
                :ButtonTitle="$t('prices.to-buy')"
                :ButtonColor="service.color"
                ButtonIcon="mdi-cart-outline"
              />
            </div>
          </v-card>
        </v-col>

        <!-- Информационная карточка -->
        <v-col cols="12" md="4" class="d-flex">
          <v-card class="hl-card pa-6 pa-md-8 w-100 d-flex flex-column text-white" rounded="xl" elevation="0" style="background: linear-gradient(135deg, #1A237E 0%, #3949AB 100%);">
            <div class="mb-6">
              <v-icon icon="mdi-shield-home" size="48" color="amber-lighten-2" class="mb-4"></v-icon>
              <h3 class="text-h5 font-weight-bold mb-2 text-white">
                Що входить у підключення?
              </h3>
              <p class="text-white-50 text-body-2">
                {{ $t("intercom.cost-of-connection") }}
              </p>
            </div>

            <div class="info-list flex-grow-1">
              <div class="info-item d-flex align-start mb-4">
                <v-icon icon="mdi-check-circle" color="amber-lighten-2" class="mr-3 mt-1"></v-icon>
                <div>
                  <div class="font-weight-bold text-white mb-1">{{ $t('intercom.installation') }}</div>
                  <div class="text-white-50 text-caption">Монтаж обладнання у вашій оселі</div>
                </div>
              </div>
              <div class="info-item d-flex align-start mb-4">
                <v-icon icon="mdi-check-circle" color="amber-lighten-2" class="mr-3 mt-1"></v-icon>
                <div>
                  <div class="font-weight-bold text-white mb-1">{{ $t('intercom.setup') }}</div>
                  <div class="text-white-50 text-caption">Налаштування зв'язку з панеллю виклику</div>
                </div>
              </div>
              <div class="info-item d-flex align-start">
                <v-icon icon="mdi-check-circle" color="amber-lighten-2" class="mr-3 mt-1"></v-icon>
                <div>
                  <div class="font-weight-bold text-white mb-1">{{ $t('intercom.instruction') }}</div>
                  <div class="text-white-50 text-caption">Демонстрація роботи та навчання</div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-top-white-10">
              <v-btn variant="outlined" color="white" rounded="pill" block class="font-weight-bold" href="/about">
                Дізнатися більше
              </v-btn>
            </div>
          </v-card>
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
  data() {
    return {
      intercomTariffs: [
        {
          name: "audio",
          subscription: 60,
          keyCost: 120,
          connectionCost: 600,
          keyCount: 1,
          includeSubscription: true,
          includeKey: false,
          includeConnection: false,
          icon: "mdi-phone-classic",
          color: '#2e7d32',
          gradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
          badge: 'Класика'
        },
        {
          name: "video",
          subscription: 75,
          keyCost: 120,
          connectionCost: 1450,
          keyCount: 1,
          includeSubscription: true,
          includeKey: false,
          includeConnection: false,
          icon: "mdi-video-outline",
          color: '#1565c0',
          gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          badge: 'Преміум'
        },
      ],
    };
  },
  methods: {
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
.tariff-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tariff-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
}

.icon-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  opacity: 0.5;
  border-bottom-left-radius: 50% 20px;
  border-bottom-right-radius: 50% 20px;
}

.icon-wrapper {
  z-index: 1;
}

.option-item {
  background-color: #f8f9fa;
  border: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.option-item:hover {
  background-color: #f1f3f5;
}

.custom-switch {
  transform: scale(0.9);
  margin-top: 0;
}

.border-top {
  border-top: 1px solid #eee;
}

.border-top-white-10 {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>