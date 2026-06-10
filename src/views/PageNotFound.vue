<!-- NotFound.vue -->
<template>
  <div class="not-found-section d-flex align-center justify-center">
    <v-card
      class="not-found-card card-hover pa-8 pa-sm-10 text-center"
      elevation="0"
      rounded="xl"
      :data-aos="animated ? 'fade-up' : null"
    >
      <!-- Акцентная полоса -->
      <div class="accent-bar"></div>

      <!-- Иконка ошибки -->
      <v-icon
        icon="mdi-alert-circle-outline"
        size="64"
        color="#fed100"
        class="mb-4"
      ></v-icon>

      <!-- Код ошибки -->
      <h1 class="error-code text-h2 font-weight-black mb-2">
        404
      </h1>

      <!-- Заголовок -->
      <h2 class="error-title text-h4 font-weight-bold mb-4">
        {{ $t('errors.page-not-found') }}
      </h2>

      <!-- Описание -->
      <p class="error-description text-body-1 text-grey-darken-1 mb-6">
        {{ $t('errors.page-not-found-description') }}
      </p>

      <!-- Кнопка -->
      <v-btn
        to="/"
        :prepend-icon="'mdi-home-outline'"
        class="error-button"
        size="large"
        rounded="xl"
      >
        {{ $t('errors.back-to-home') }}
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    animated: { type: Boolean, default: true },
  },
};
</script>

<style scoped>
.not-found-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fbfa 0%, #eef7f5 100%);
  padding: 40px 20px;
}

.not-found-card {
  position: relative;
  max-width: 500px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.not-found-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентная полоса слева */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #fed100, #feb700);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.error-code {
  color: #2c3e50;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #fed100, #feb700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-title {
  color: #2c3e50;
}

.error-description {
  line-height: 1.6;
}

.error-button {
  background: linear-gradient(135deg, #fed100, #feb700) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3) !important;
  transition: all 0.3s ease !important;
  padding: 12px 24px !important;
}

.error-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(38, 166, 154, 0.4) !important;
  background: linear-gradient(135deg, #3da5b1, #1e8a7d) !important;
}

/* Адаптив */
@media (max-width: 600px) {
  .not-found-card {
    padding: 24px !important;
  }

  .error-code {
    font-size: 3rem !important;
    letter-spacing: 2px;
  }

  .error-title {
    font-size: 1.5rem !important;
  }
}
</style>