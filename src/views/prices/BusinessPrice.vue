<template>
  <div class="business-section">
    <!-- Hero / Заголовок -->
    <v-container>
      <v-row justify="center" class="text-center mb-10">
        <v-col cols="12" md="10" lg="8" data-aos="fade-up">
          <h1 class="text-h3 font-weight-black text-slate-800 mb-4">
            Інтернет для <span class="highlight-text">Бізнесу</span>
          </h1>
          <p class="text-h6 text-slate-500 font-weight-regular">
            Безперебійний зв'язок, симетричний канал та преміальна підтримка 24/7 для вашого офісу чи підприємства.
          </p>
        </v-col>
      </v-row>

      <!-- Переваги -->
      <v-row class="mb-12" justify="center">
        <v-col v-for="(feature, idx) in features" :key="idx" cols="12" sm="6" md="3" data-aos="fade-up" :data-aos-delay="idx * 100">
          <div class="feature-card pa-6 text-center h-100">
            <div class="feature-icon-wrapper mb-4 mx-auto">
              <v-icon :icon="feature.icon" size="36" color="#1e293b"></v-icon>
            </div>
            <h3 class="text-h6 font-weight-bold mb-2 text-slate-800">{{ feature.title }}</h3>
            <p class="text-body-2 text-slate-500">{{ feature.desc }}</p>
          </div>
        </v-col>
      </v-row>

      <!-- Тарифи Grid -->
      <!-- Promo Banner -->
      <v-row justify="center" class="mb-8">
        <v-col cols="12" md="10" lg="8">
          <v-alert
            color="amber-lighten-4"
            class="rounded-xl border-accent pa-6 shadow-sm d-flex align-center"
            elevation="0"
          >
            <template v-slot:prepend>
              <div class="bg-amber rounded-circle pa-3 mr-4 shadow-sm">
                <v-icon icon="mdi-sale" color="white" size="32"></v-icon>
              </div>
            </template>
            <div class="d-flex flex-column">
              <h3 class="text-h5 font-weight-bold text-slate-800 mb-1">Акція для нових бізнес-абонентів!</h3>
              <p class="text-body-1 text-slate-700 mb-0">
                Підключайте будь-який бізнес-тариф та отримуйте <strong>знижку -50%</strong> на абонплату протягом перших 6 місяців (пропозиція діє тільки для нових абонентів).
              </p>
            </div>
          </v-alert>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          v-for="(tariff, index) in businessTariffs"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div :class="['tariff-card pa-6 h-100 d-flex flex-column', tariff.promo ? 'promo-card' : '']">
            <!-- Promo Badge -->
            <div v-if="tariff.promo" class="promo-badge">
              Акційна ціна
            </div>
            
            <!-- -50% Discount Badge -->
            <div v-if="tariff.price" class="promo-badge-new d-flex align-center">
              <v-icon icon="mdi-fire" size="small" class="mr-1"></v-icon>
              <span>-50% на 6 міс.</span>
            </div>

            <!-- Header -->
            <div class="text-center mb-6 mt-2">
              <div class="icon-circle mx-auto mb-4">
                <v-icon :icon="tariff.icon || 'mdi-briefcase'" size="40" :color="tariff.promo ? '#ffffff' : '#fed100'"></v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold mb-2" :class="tariff.promo ? 'text-white' : 'text-slate-800'">
                {{ tariff.name }}
              </h3>
            </div>

            <!-- Price & Speed -->
            <div class="price-box text-center mb-6 pa-4 rounded-xl" :class="tariff.promo ? 'bg-white-10' : 'bg-slate-50'">
              <div class="d-flex justify-center align-baseline mb-2">
                <span class="text-h4 font-weight-bold" :class="tariff.promo ? 'text-white' : 'text-slate-800'">
                  {{ tariff.price ? tariff.price : 'Індивідуально' }}
                </span>
                <span v-if="tariff.price" class="text-body-1 ml-1" :class="tariff.promo ? 'text-white-70' : 'text-slate-500'">
                  ₴/міс
                </span>
              </div>
              <div class="d-flex align-center justify-center speed-badge mx-auto">
                <v-icon icon="mdi-speedometer" size="small" class="mr-1"></v-icon>
                <span v-if="typeof tariff.speed === 'number'">до {{ tariff.speed }} Мбіт/с</span>
                <span v-else>{{ tariff.speed }}</span>
              </div>
            </div>

            <!-- Features List -->
            <ul class="feature-list mb-6 flex-grow-1">
              <li class="d-flex align-center mb-3" :class="tariff.promo ? 'text-white-80' : 'text-slate-600'">
                <v-icon icon="mdi-check-circle" size="small" :color="tariff.promo ? '#fed100' : '#10b981'" class="mr-3"></v-icon>
                <span>Симетричний канал</span>
              </li>
              <li class="d-flex align-center mb-3" :class="tariff.promo ? 'text-white-80' : 'text-slate-600'">
                <v-icon icon="mdi-check-circle" size="small" :color="tariff.promo ? '#fed100' : '#10b981'" class="mr-3"></v-icon>
                <span>Пріоритетна підтримка 24/7</span>
              </li>
              <li v-if="tariff.hasRealIp" class="d-flex align-center mb-3" :class="tariff.promo ? 'text-white-80' : 'text-slate-600'">
                <v-icon icon="mdi-check-circle" size="small" :color="tariff.promo ? '#fed100' : '#10b981'" class="mr-3"></v-icon>
                <span>Реальна IP-адреса</span>
              </li>
            </ul>

            <!-- Order Button -->
            <RequestForm
              :FormData="`Заявка на тариф для бізнесу: ${tariff.name}`"
              ButtonTitle="Залишити заявку"
              ButtonColor=""
              :ButtonClass="tariff.promo ? 'btn-promo' : 'btn-standard'"
              ButtonVariant="flat"
              ButtonSize="x-large"
              ButtonRounded="pill"
              ButtonElevation="0"
              :ButtonBlock="true"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Тематичний Банер -->
      <v-row justify="center" class="mt-6 mb-16">
        <v-col cols="12" md="10">
          <div class="rounded-xl overflow-hidden shadow-lg">
            <v-img :src="businessBanner" cover height="400" class="align-end rounded-xl"></v-img>
          </div>
        </v-col>
      </v-row>

    </v-container>



  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';
import businessBanner from '@/assets/banners/business.png';

export default {
  name: "BusinessPrice",
  components: {
    RequestForm
  },
  data() {
    return {
      businessBanner,
      features: [
        { title: 'Резервування', desc: 'Автономна робота мережі під час відключень електроенергії (PON).', icon: 'mdi-battery-charging' },
        { title: 'SLA Гарантії', desc: 'Гарантована якість зв\'язку та швидке усунення несправностей.', icon: 'mdi-shield-check-outline' },
        { title: 'Виділений менеджер', desc: 'Персональний спеціаліст для вирішення будь-яких питань.', icon: 'mdi-account-tie' },
        { title: 'Реальна IP-адреса', desc: 'Можливість підключення статичної IP-адреси для серверів.', icon: 'mdi-web' },
      ],
      businessTariffs: [
        { name: "Базовий", price: 498, speed: 50, icon: 'mdi-office-building-outline', hasRealIp: false },
        { name: "Оптимальний", price: 798, speed: 100, icon: 'mdi-city-variant-outline', hasRealIp: true },
        { name: "Преміальний", price: 1500, speed: 1000, icon: 'mdi-rocket-launch-outline', hasRealIp: true },
        { name: "Індивідуальний", price: null, speed: "Індивідуальна", icon: 'mdi-handshake-outline', hasRealIp: true },
      ]
    }
  }
}
</script>

<style scoped>
.business-section {
  padding: 60px 0;
  background-color: #f8fafc; /* slate-50 */
  min-height: calc(100vh - 100px);
}

.text-slate-800 { color: #1e293b !important; }
.text-slate-600 { color: #475569 !important; }
.text-slate-500 { color: #64748b !important; }
.bg-slate-50 { background-color: #f8fafc !important; }
.bg-white-10 { background-color: rgba(255, 255, 255, 0.1) !important; }
.text-white-80 { color: rgba(255, 255, 255, 0.8) !important; }
.text-white-70 { color: rgba(255, 255, 255, 0.7) !important; }

.highlight-text {
  background: linear-gradient(135deg, #fed100, #ffb300);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.feature-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon-wrapper {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(254, 209, 0, 0.15), rgba(254, 209, 0, 0.3));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}
.feature-card:hover .feature-icon-wrapper {
  transform: rotate(0deg) scale(1.05);
}

.tariff-card {
  background: #ffffff;
  border-radius: 28px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.tariff-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: rgba(254, 209, 0, 0.3);
}

.promo-card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: none;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.2);
}

.promo-card:hover {
  border-color: transparent;
  box-shadow: 0 25px 50px rgba(15, 23, 42, 0.3);
}

.promo-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #fed100, #ffb300);
  color: #1e293b;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 6px 16px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 28px;
  box-shadow: -2px 2px 10px rgba(254, 209, 0, 0.3);
}

.promo-badge-new {
  position: absolute;
  top: 6px;
  right: 6px;
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

.border-accent {
  border: 2px solid #fed100 !important;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(254, 209, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.promo-card .icon-circle {
  background: rgba(255, 255, 255, 0.1);
}

.speed-badge {
  display: inline-flex;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.promo-card .speed-badge {
  background: rgba(254, 209, 0, 0.2);
  color: #fed100;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.btn-standard {
  background: #f1f5f9 !important;
  color: #1e293b !important;
  font-weight: 700 !important;
  transition: all 0.3s ease !important;
}

.btn-standard:hover {
  background: #fed100 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(254, 209, 0, 0.3) !important;
}

.btn-promo {
  background: linear-gradient(135deg, #fed100, #ffb300) !important;
  color: #1e293b !important;
  font-weight: 700 !important;
  transition: all 0.3s ease !important;
}

.btn-promo:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(254, 209, 0, 0.4) !important;
}
</style>
