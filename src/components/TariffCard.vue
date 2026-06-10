<template>
  <v-card class="tariff-card pa-4" rounded="xl" elevation="3">
    <v-card-title class="text-h6 font-weight-bold d-flex align-center">
      <v-icon class="me-2" :icon="tariff.icon" />
      {{ tariff.name }}
    </v-card-title>

    <v-card-text>
      <div class="text-body-1">
        Швидкість: <strong>{{ tariff.speed }} Мбіт/с</strong>
      </div>
      <div class="text-body-1">
        Ціна: <strong>{{ tariff.price }} грн</strong>
      </div>
      <div v-if="tariff.iptv" class="text-success text-body-2 mt-1">
        + IPTV
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" variant="flat" block>
        Підключити
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TariffCard",
  props: {
    tariff: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.tariff-card {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
