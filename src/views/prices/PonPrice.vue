<!-- PonTariffs.vue -->
<template>
  <div class="tariffs-section">
    <h2 class="hl-section-title">
      {{ $t("menu.internet") }} <span class="pon-tag">PON</span>
    </h2>

    <v-container>
      <v-row justify="center" class="g-4">
        <v-col
          v-for="(i, index) in internetTariffs"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <v-card
            :class="[
              'tariff-card card-hover pa-6 card-animate',
              getTariffClass(i.name)
            ]"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar" :class="getAccentClass(i.name)"></div>

           <!-- Заголовок с иконкой и батарейкой в одном ряду -->
<div class="header-row d-flex align-center mb-4">
  <!-- Иконка -->
  <v-icon
    :icon="i.icon"
    :size="40"
    :color="getIconColor(i.name)"
    class="me-2"
  ></v-icon>

  <!-- Заголовок (растягивается по центру) -->
  <h3 class="tariff-title text-h5 font-weight-bold flex-grow-1 text-center mb-0">
    {{ i.name }}
  </h3>

  <!-- Батарейка (прижата вправо) -->
  <div class="battery-container ms-2">
    <BatteryAnimation
      :stickerText="`⚡PON до <strong>72 годин</strong> без світла`"
      :chargeLevel="i.chargeLevel || 80"
      size="compact"
    />
  </div>
</div>

            <!-- Цена и скорость -->
            <div class="price-section text-center mb-4">
              <div class="price-display d-flex justify-center align-center mb-2">
                <span class="currency">₴</span>
                <span class="amount text-h3 font-weight-bold mx-1">{{ i.price }}</span>
                <span class="frequency text-body-1">/{{ $t("prices.month") }}</span>
              </div>
              <div class="speed text-body-1">
                <v-icon icon="mdi-web" size="small" color="green-darken-2" class="me-1"></v-icon>
                {{ $t("prices.up-to") }} {{ i.speed }} {{ $t("prices.Mbps") }}
              </div>
            </div>

            <v-divider class="mb-4"></v-divider>

            <!-- Внешний IP -->
            <v-sheet
              class="option-section mb-4 py-3 px-4 rounded-lg"
              color="grey-lighten-4"
            >
              <v-switch
                v-model="i.externalIpEnabled"
                :label="`${$t('prices.external-ip')}${i.externalIpPrice > 0 ? ` (+${i.externalIpPrice} ₴)` : ''}`"
                color="primary"
                hide-details
                inset
              ></v-switch>
            </v-sheet>

            <!-- IPTV -->
            <template v-if="i.iptv">
              <v-sheet
                class="option-section mb-4 py-3 px-4 rounded-lg"
                color="grey-lighten-4"
              >
                <v-switch
                  v-model="iptvEnabled"
                  label="+ IPTV"
                  color="primary"
                  hide-details
                  inset
                >
                  <template v-slot:append>
                    <v-img
                      src="@/assets/prices/logo_sweettv_light.svg"
                      alt="Sweet.TV"
                      max-height="60"
                      max-width="60"
                      contain
                      class="ms-2"
                    />
                  </template>
                </v-switch>

                <v-radio-group
                  v-if="iptvEnabled"
                  v-model="selectedIptvTariff"
                  class="mt-3"
                >
                  <v-radio
                    v-for="tariff in iptvTariffs"
                    :key="tariff.id"
                    :label="`${tariff.name} — ${tariff.tv_count} каналів`"
                    :value="tariff"
                    color="primary"
                    class="mb-2"
                  >
                    <template v-slot:label>
                      <div class="d-flex align-center">
                        <span class="me-1">{{ tariff.name }}</span>
                        <v-chip
                          size="small"
                          color="green-lighten-1"
                          class="text-caption"
                        >
                          {{ tariff.tv_count }} TV
                        </v-chip>
                        <span class="ms-2">+{{ tariff.price }} ₴</span>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-sheet>
            </template>

            <!-- Итоговая цена -->
            <v-alert
              v-if="totalPrice(i) >= 0"
              :color="getAlertColor(i.name)"
              class="total-price-alert text-h6 font-weight-bold text-center py-3 mb-4 rounded-lg"
              border="start"
              :style="{ borderColor: getIconColor(i.name) }"
            >
              {{ $t("prices.total") }}: {{ i.price + totalPrice(i) }} ₴/{{ $t("prices.month") }}
            </v-alert>

            <!-- Кнопка заказа -->
            <v-card-actions class="justify-center">
              <RequestForm
                :FormData="getFormData(i)"
                :ButtonTitle="$t('prices.to-buy')"
                :ButtonColor="getIconColor(i.name)"
                :ButtonIcon="'mdi-cart-outline'"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';
import BatteryAnimation from '@/components/BatteryAnimation.vue'; // Убедись, что путь правильный

export default {
  name: "PonTariffs",
  components: { RequestForm, BatteryAnimation },
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      iptvEnabled: false,
      selectedIptvTariff: null,
      internetTariffs: [
        {
          id: 1,
          name: "«Хатинка»",
          speed: 50,
          price: 250,
          iptv: false,
          icon: "mdi-microsoft-internet-explorer",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
          chargeLevel: 80,
          batteryText: "Працює без світла до 72 годин",
        },
        {
          id: 2,
          name: "«Дім»",
          speed: 100,
          price: 320,
          iptv: true,
          icon: "mdi-wifi",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
          chargeLevel: 80,
          batteryText: "Працює без світла до 72 годин",
        },
        {
          id: 3,
          name: "«Маєток»",
          speed: 1000,
          price: 420,
          iptv: true,
          icon: "mdi-wifi-star",
          features: [],
          externalIpPrice: 0,
          externalIpEnabled: true,
          chargeLevel: 80,
          batteryText: "Працює без світла до 72 годин",
        },
      ],
      iptvTariffs: [
        { id: 1, name: "S", tv_count: 245, price: 80 },
        { id: 2, name: "M", tv_count: 333, price: 120 },
        { id: 3, name: "L", tv_count: 347, price: 180 },
      ],
    };
  },
  watch: {
    iptvEnabled(iptvEnabled) {
      const currentScroll = window.scrollY;
      if (iptvEnabled) {
        window.scrollTo({
          top: currentScroll + 110,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: currentScroll - 110,
          behavior: "smooth",
        });
      }
    }
  },
  methods: {
    totalPrice(tariff) {
      let total = 0;
      if (tariff.externalIpEnabled) total += tariff.externalIpPrice;
      if (tariff.iptv && this.iptvEnabled && this.selectedIptvTariff) total += this.selectedIptvTariff.price;
      return total;
    },
    getTariffClass(name) {
      switch (name) {
        case "«Дім»":
          return "standard-tariff";
        case "«Маєток»":
          return "premium-tariff";
        case "«Хатинка»":
          return "economy-tariff";
        default:
          return "";
      }
    },
    getAccentClass(name) {
      switch (name) {
        case "«Хатинка»":
          return "accent-economy";
        case "«Дім»":
          return "accent-standard";
        case "«Маєток»":
          return "accent-premium";
        default:
          return "";
      }
    },
    getIconColor(name) {
      switch (name) {
        case "«Хатинка»":
          return "#4CAF50";
        case "«Дім»":
          return "#49CBD6";
        case "«Маєток»":
          return "#D9534F";
        default:
          return "primary";
      }
    },
    getAlertColor(name) {
      switch (name) {
        case "«Хатинка»":
          return "green-lighten-1";
        case "«Дім»":
          return "teal-lighten-1";
        case "«Маєток»":
          return "red-lighten-1";
        default:
          return "teal-lighten-1";
      }
    },
    getFormData(tariff) {
      const selectedFeatures = tariff.features.filter((f) => f).join(", ");
      const iptvText = tariff.iptv && this.iptvEnabled && this.selectedIptvTariff
        ? ` + IPTV (${this.selectedIptvTariff.name})`
        : "";
      const externalIpText = tariff.externalIpEnabled
        ? this.$t('prices.external-ip')
        : "";
      return `${this.$t("prices.rates")}: ${tariff.name} ${selectedFeatures}${iptvText} ${externalIpText} = ${this.$t("prices.total")}: ₴${tariff.price + this.totalPrice(tariff)} / ${this.$t("prices.month")}`;
    },
  },
};
</script>

<style scoped>
.tariffs-section {
  padding: 40px 0;
}





.pon-tag {
  background: linear-gradient(135deg, #49CBD6, #26A69A);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-left: 12px;
  vertical-align: middle;
}

.tariff-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;
}

.tariff-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентные полосы */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.accent-economy {
  background: linear-gradient(to bottom, #4CAF50, #388E3C);
}

.accent-standard {
  background: linear-gradient(to bottom, #49CBD6, #26A69A);
}

.accent-premium {
  background: linear-gradient(to bottom, #D9534F, #C12E27);
}

.battery-container {
  flex-shrink: 0;
  transform: scale(0.75);
  transform-origin: right center;
}

.tariff-title {
  color: #2c3e50;
  line-height: 1.3;
}

.price-section {
  background: #f8fbfa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.price-display {
  gap: 4px;
}

.amount {
  color: #2c3e50;
}

.frequency {
  color: #666;
}

.speed {
  color: #424242;
}

.option-section {
  transition: all 0.2s ease;
}

.option-section:hover {
  background: #f0f0f0;
}

:deep(.v-switch .v-label) {
  font-weight: 500;
}

:deep(.v-radio .v-label) {
  font-size: 0.95rem;
}

/* Адаптив */
@media (max-width: 600px) {
  

  .pon-tag {
    font-size: 0.75rem;
    padding: 2px 8px;
    margin-left: 8px;
  }

  .tariff-card {
    padding: 16px !important;
  }

  .tariff-title {
    font-size: 1.25rem;
  }

  .price-display {
    flex-wrap: wrap;
    gap: 2px;
  }

  .amount {
    font-size: 2rem !important;
  }

  .battery-container {
    padding: 4px 0;
  }
}
</style>