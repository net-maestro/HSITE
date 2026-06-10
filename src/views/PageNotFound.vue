<!-- PageNotFound.vue -->
<template>
  <div class="not-found-section d-flex align-center justify-center">
    <!-- Декоративные фоновые элементы -->
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <v-card
      class="not-found-card pa-10 text-center"
      elevation="0"
      rounded="xl"
      :data-aos="animated ? 'zoom-in' : null"
    >
      <!-- Код ошибки (Анимированный) -->
      <div class="error-code-wrapper mb-6">
        <h1 class="error-code">404</h1>
        <div class="error-code-shadow">404</div>
      </div>

      <!-- Заголовок -->
      <h2 class="error-title text-h4 font-weight-bold mb-4">
        {{ $t('errors.page-not-found') || 'Сторінку не знайдено' }}
      </h2>

      <!-- Описание -->
      <p class="error-description text-body-1 text-blue-grey-darken-1 mb-8">
        {{ $t('errors.page-not-found-description') || 'Здається, ви перейшли за неправильним посиланням або сторінка була видалена. Давайте повернемося на головну.' }}
      </p>

      <!-- Кнопка -->
      <v-btn
        to="/"
        prepend-icon="mdi-home-outline"
        class="error-button text-none font-weight-bold"
        size="x-large"
        rounded="pill"
        elevation="0"
      >
        {{ $t('errors.back-to-home') || 'На головну сторінку' }}
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
  min-height: 80vh;
  position: relative;
  background-color: #f8fafc;
  overflow: hidden;
  padding: 40px 20px;
}

/* Декоративные пятна на фоне */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #fed100;
  top: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite alternate;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: #64748b;
  bottom: -50px;
  right: -50px;
  animation: float 10s ease-in-out infinite alternate-reverse;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, 40px) scale(1.1); }
}

.not-found-card {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05) !important;
  border-radius: 32px !important;
}

.error-code-wrapper {
  position: relative;
  display: inline-block;
}

.error-code {
  font-size: 9rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 2;
  letter-spacing: -6px;
}

.error-code-shadow {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 9rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  color: rgba(254, 209, 0, 0.6); /* Yellow shadow */
  z-index: 1;
  filter: blur(8px);
  letter-spacing: -6px;
  animation: pulse-shadow 3s infinite alternate;
}

@keyframes pulse-shadow {
  0% { transform: scale(1) translate(0, 0); opacity: 0.5; }
  100% { transform: scale(1.02) translate(4px, 4px); opacity: 0.8; }
}

.error-title {
  color: #1e293b;
}

.error-description {
  font-size: 1.1rem;
  line-height: 1.6;
}

.error-button {
  background: linear-gradient(135deg, #fed100, #ffb300) !important;
  color: #1e293b !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.error-button:hover {
  transform: translateY(-3px) scale(1.02) !important;
  box-shadow: 0 10px 24px rgba(254, 209, 0, 0.4) !important;
}

/* Адаптив */
@media (max-width: 600px) {
  .not-found-card {
    padding: 40px 20px !important;
  }
  .error-code, .error-code-shadow {
    font-size: 6rem;
    letter-spacing: -3px;
  }
  .error-title {
    font-size: 1.5rem !important;
  }
  .error-description {
    font-size: 1rem;
  }
}
</style>