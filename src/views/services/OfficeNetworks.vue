<template>
  <div class="office-networks-page">
    <v-container>
      <v-row class="mb-10 mt-6 text-center" justify="center">
        <v-col cols="12" md="10">
          <h1 class="text-h3 font-weight-black text-slate-800 mb-4">
            Монтаж телекомунікаційних мереж <span class="highlight-text">(СКС)</span>
          </h1>
          <p class="text-h6 text-slate-500 font-weight-regular">
            Проєктування та монтаж локальної офісної мережі під ключ для швидкої та безпечної комунікації.
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <h2 class="text-h4 font-weight-bold mb-6">Офісні мережі для Вашого бізнесу</h2>
          <p class="text-body-1 mb-4 text-slate-600">
            Від правильно спроєктованої і побудованої локальної мережі залежить ефективне функціонування офісів, підприємств та бізнесу в цілому. Фахівці <strong>HappyLink</strong> здійснять якісний монтаж та налаштують комп'ютерну мережу, а також розроблять проєкт згідно Ваших завдань.
          </p>
          <p class="text-body-1 mb-4 text-slate-600">
            Наша компанія дотримується комплексного підходу: забезпечує проєктування, безпосередній монтаж мережі, організовує її подальше обслуговування.
          </p>
          <RequestForm
            FormData="Прорахування офісних мереж (СКС)"
            ButtonTitle="Замовити прорахування"
            ButtonColor="#fed100"
            ButtonClass="btn-promo align-self-start mt-4"
            ButtonVariant="flat"
            ButtonSize="x-large"
            ButtonRounded="pill"
            ButtonElevation="0"
          />
        </v-col>
        <v-col cols="12" md="6">
           <div class="image-wrapper rounded-xl overflow-hidden shadow-lg h-100">
             <v-img :src="officeNetworksBanner" cover class="h-100" min-height="300"></v-img>
           </div>
        </v-col>
      </v-row>

      <v-row class="mb-12 bg-slate-50 py-12 rounded-xl">
        <v-col cols="12" md="6" class="px-8">
          <h2 class="text-h4 font-weight-bold mb-6">Локальна мережа під ключ для об'єктів:</h2>
          <v-row>
            <v-col cols="12" sm="6">
              <ul class="custom-list">
                <li>Офісні приміщення</li>
                <li>Бізнес-центри</li>
                <li>Торгові центри</li>
                <li>Медичні установи</li>
                <li>Готельно-рестораний бізнес</li>
              </ul>
            </v-col>
            <v-col cols="12" sm="6">
              <ul class="custom-list">
                <li>Житлові комплекси</li>
                <li>Складські приміщення</li>
                <li>Виробничі об'єкти</li>
                <li>Спортивні об'єкти</li>
                <li>АЗС</li>
              </ul>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="px-8 mt-6 mt-md-0 d-flex flex-column justify-center">
          <div class="pa-6 border-left-accent bg-white rounded-lg mb-6 shadow-sm">
            <h4 class="text-h6 font-weight-bold mb-2">Гарантія якості</h4>
            <p class="text-body-2 text-slate-600 mb-0">Залежно від виду робіт, використовуваного обладнання та матеріалів на всю локальну мережу надається від 1 до 5 років гарантії.</p>
          </div>
          <div class="pa-6 border-left-accent bg-white rounded-lg shadow-sm">
            <h4 class="text-h6 font-weight-bold mb-2">Технічне обслуговування</h4>
            <p class="text-body-2 text-slate-600 mb-0">Забезпечуємо постійну і безперебійну роботу Вашого IT-обладнання, підтримку користувачів, оновлення ПЗ та відновлення після збоїв.</p>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold mb-8 text-center">Переваги роботи з нами</h2>
        </v-col>
        <v-col v-for="(item, i) in advantages" :key="i" cols="12" sm="6" md="4">
          <div class="feature-card pa-6 h-100 d-flex flex-column text-center align-center">
            <v-icon :icon="item.icon" size="48" color="#fed100" class="mb-4"></v-icon>
            <h3 class="text-h6 font-weight-bold mb-3">{{ item.title }}</h3>
            <p class="text-body-2 text-slate-500">{{ item.desc }}</p>
          </div>
        </v-col>
      </v-row>

    </v-container>


  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';
import officeNetworksBanner from '@/assets/banners/office_networks.png';

export default {
  name: "OfficeNetworks",
  components: {
    RequestForm
  },
  data() {
    return {
      officeNetworksBanner,
      advantages: [
        { icon: "mdi-briefcase-check-outline", title: "Багаторічний досвід", desc: "Сотні реалізованих проєктів різної складності." },
        { icon: "mdi-puzzle-outline", title: "Індивідуальні рішення", desc: "Проєктування під унікальні потреби кожного замовника." },
        { icon: "mdi-cash-check", title: "Оптимальна вартість", desc: "Ідеальне співвідношення ціни і високої якості." },
        { icon: "mdi-key-variant", title: "Під ключ", desc: "Виконання всього комплексу робіт від проєкту до запуску." },
        { icon: "mdi-account-hard-hat-outline", title: "Власні бригади", desc: "Роботи виконуються виключно штатними фахівцями." },
        { icon: "mdi-shield-check-outline", title: "Надійність", desc: "Обслуговування та гарантія безперебійної роботи мережі." }
      ]
    }
  }
}
</script>

<style scoped>
.office-networks-page {
  padding-bottom: 60px;
  background-color: #ffffff;
}

.text-slate-800 { color: #1e293b !important; }
.text-slate-600 { color: #475569 !important; }
.text-slate-500 { color: #64748b !important; }
.bg-slate-50 { background-color: #f8fafc !important; }

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
  border: 1px solid rgba(0,0,0,0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.custom-list {
  list-style: none;
  padding-left: 0;
}
.custom-list li {
  position: relative;
  padding-left: 32px;
  margin-bottom: 12px;
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.5;
}
.custom-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: #fed100;
  font-weight: bold;
  font-size: 1.2rem;
  background: rgba(254, 209, 0, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-left-accent {
  border-left: 4px solid #fed100;
}

.btn-promo {
  background: linear-gradient(135deg, #fed100, #ffb300) !important;
  color: #1e293b !important;
  font-weight: 700 !important;
  transition: all 0.3s ease !important;
}
.btn-promo:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(254, 209, 0, 0.4) !important;
}

.shadow-lg {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
.shadow-sm {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}
</style>
