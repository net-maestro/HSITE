<!-- CombinedTariffsTabs.vue -->
<template>
  <div class="tabs-container">
    
    <v-row>
      <v-container>
        <div class="tabs-wrapper">
          <v-btn
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'active-tab': activeTab === tab.value }"
            @click="activeTab = tab.value"
            variant="text"
            class="tab-button"
            :color="activeTab === tab.value ? '#26A69A' : '#666'"
          >
            {{ tab.label }}
            <v-divider
              v-if="activeTab === tab.value"
              class="tab-divider"
              thickness="2"
            ></v-divider>
          </v-btn>
        </div>
        </v-container>
</v-row>

        <div v-if="activeTab === 'apartment'" class="mt-2">
          <EthernetPrice />
        </div>
        <div v-if="activeTab === 'private'" class="mt-2">
          <PonPrice />
        </div>
  </div>
</template>

<script>
import EthernetPrice from "@/views/prices/EthernetPrice.vue";
import PonPrice from "@/views/prices/PonPrice.vue";

export default {
  name: "CombinedTariffsTabs",
  components: {
    EthernetPrice,
    PonPrice,
  },
  data() {
    return {
      activeTab: "apartment",
      tabs: [
        { value: "apartment", label: this.$t("prices.for-apartments") },
        { value: "private", label: this.$t("prices.private-sector") },
      ],
    };
  },
};
</script>

<style scoped>
.tabs-container {
  padding: 24px 0 0;
}

.tabs-wrapper {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 8px 0;
  background: #f8fbfa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tab-button {
  position: relative;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: auto;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background: rgba(38, 166, 154, 0.05);
  color: #26A69A;
}

.tab-divider {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  background: #26A69A;
  border-radius: 2px;
}

/* Адаптив */
@media (max-width: 600px) {
  .tabs-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px;
  }

  .tab-button {
    width: 100%;
    max-width: 200px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .tab-divider {
    bottom: -6px;
    width: 30px;
  }
}
</style>