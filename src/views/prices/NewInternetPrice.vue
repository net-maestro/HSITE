<template>
  <div class="tariffs-section">
    <h2 class="hl-section-title">
      {{ $t("menu.internet") }}
    </h2>

    <v-container>
      <!-- Карусель тарифів -->
      <v-carousel
        v-model="currentSlide"
        hide-delimiters
        height="auto"
        class="tariffs-carousel"
        :cycle="false"
        :show-arrows="false"
      >
        <!-- Стрілки для перемикання (вгорі) -->
        <div class="carousel-controls-top">
          <span
            class="carousel-prev-icon"
            @click="prevSlide"
            aria-label="Previous"
          >
            <v-icon icon="mdi-chevron-left" size="24" color="primary" />
          </span>
          <span
            class="carousel-next-icon"
            @click="nextSlide"
            aria-label="Next"
          >
            <v-icon icon="mdi-chevron-right" size="24" color="primary" />
          </span>
        </div>

        <v-carousel-item
          v-for="(i, index) in internetTariffs"
          :key="index"
          class="carousel-item"
        >
          <v-card
            :class="[
              'tariff-card card-hover pa-6',
              getTariffClass(i.name)
            ]"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентна полоса -->
            <div class="accent-bar" :class="getAccentClass(i.name)"></div>

            <!-- Заголовок з іконкою -->
            <div class="text-center mb-4">
              <v-icon
                :icon="i.icon"
                :size="48"
                :color="getIconColor(i.name)"
                class="mb-2"
              ></v-icon>
              <h3 class="tariff-title text-h5 font-weight-bold">
                {{ i.name }}
              </h3>
            </div>

            <!-- Ціна і швидкість -->
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

            <!-- Внішній IP -->
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

            <!-- Підсумкова ціна -->
            <v-alert
              v-if="totalPrice(i) >= 0"
              :color="getAlertColor(i.name)"
              class="total-price-alert text-h6 font-weight-bold text-center py-3 mb-4 rounded-lg"
              border="start"
              :style="{ borderColor: getIconColor(i.name) }"
            >
              {{ $t("prices.total") }}: {{ i.price + totalPrice(i) }} ₴/{{ $t("prices.month") }}
            </v-alert>

            <!-- Кнопка замовлення -->
            <v-card-actions class="justify-center">
              <RequestForm
                :FormData="getFormData(i)"
                :ButtonTitle="$t('prices.to-buy')"
                :ButtonColor="getIconColor(i.name)"
                :ButtonIcon="'mdi-cart-outline'"
              />
            </v-card-actions>
          </v-card>
        </v-carousel-item>
      </v-carousel>

      <!-- Індикатори слайдів -->
      <div class="carousel-indicators">
        <v-chip
          v-for="(item, index) in internetTariffs"
          :key="index"
          small
          :color="currentSlide === index ? 'primary' : 'grey-lighten-3'"
          class="mx-1"
          @click="currentSlide = index"
        ></v-chip>
      </div>
    </v-container>
  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';

export default {
  name: "InternetTariffs",
  components: { RequestForm },
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      currentSlide: 0,
      iptvEnabled: false,
      selectedIptvTariff: null,
      internetTariffs: [
        {
          id: 1,
          name: "«Економ»",
          speed: 50,
          price: 200,
          iptv: false,
          icon: "mdi-microsoft-internet-explorer",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
        },
        {
          id: 2,
          name: "«Стандарт»",
          speed: 100,
          price: 250,
          iptv: true,
          icon: "mdi-wifi",
          features: [],
          externalIpPrice: 75,
          externalIpEnabled: false,
        },
        {
          id: 3,
          name: "«Люкс»",
          speed: 1000,
          price: 350,
          iptv: true,
          icon: "mdi-wifi-star",
          features: [],
          externalIpPrice: 0,
          externalIpEnabled: true,
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
    prevSlide() {
      this.currentSlide = Math.max(0, this.currentSlide - 1);
    },
    nextSlide() {
      this.currentSlide = Math.min(this.internetTariffs.length - 1, this.currentSlide + 1);
    },
    totalPrice(tariff) {
      let total = 0;
      if (tariff.externalIpEnabled) total += tariff.externalIpPrice;
      if (tariff.iptv && this.iptvEnabled && this.selectedIptvTariff) total += this.selectedIptvTariff.price;
      return total;
    },
    getTariffClass(name) {
      switch (name) {
        case "«Стандарт»":
          return "standard-tariff";
        case "«Люкс»":
          return "premium-tariff";
        case "«Економ»":
          return "economy-tariff";
        default:
          return "";
      }
    },
    getAccentClass(name) {
      switch (name) {
        case "«Економ»":
          return "accent-economy";
        case "«Стандарт»":
          return "accent-standard";
        case "«Люкс»":
          return "accent-premium";
        default:
          return "";
      }
    },
    getIconColor(name) {
      switch (name) {
        case "«Економ»":
          return "#4CAF50";
        case "«Стандарт»":
          return "#49CBD6";
        case "«Люкс»":
          return "#D9534F";
        default:
          return "primary";
      }
    },
    getAlertColor(name) {
      switch (name) {
        case "«Економ»":
          return "green-lighten-1";
        case "«Стандарт»":
          return "teal-lighten-1";
        case "«Люкс»":
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

/* Акцентні смужки */
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

/* Карусель */
.tariffs-carousel {
  overflow: hidden;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 16px;
}

.carousel-item {
  flex: 0 0 auto;
  padding: 0 16px;
  /* Ближче одна до одної */
  margin: 0 8px;
}

/* Контроли (вгорі) */
.carousel-controlsst-top {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
  z-index: 10;
  position: relative;
}

.carousel-prev-icon,
.carousel-next-icon {
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.8;
}

.carousel-prev-icon:hover,
.carousel-next-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Індикатори */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 16px 0;
}

/* Адаптив */
@media (max-width: 600px) {
  

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

  /* На мобільних — стрілки залишаються вгорі */
  .carousel-controls-top {
    margin: 8px 0;
  }
}
</style>