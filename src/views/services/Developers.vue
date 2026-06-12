<template>
  <div class="developers-page">
    <v-container>
      <v-row class="mb-10 mt-6 text-center" justify="center">
        <v-col cols="12" md="10">
          <h1 class="text-h3 font-weight-black text-slate-800 mb-4">
            Телеком-рішення для <span class="highlight-text">Забудовників</span>
          </h1>
          <p class="text-h6 text-slate-500 font-weight-regular">
            Повний комплекс робіт зі створення телекомунікаційної інфраструктури для житлових комплексів та бізнес-центрів.
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <h2 class="text-h4 font-weight-bold mb-6">Що ми пропонуємо забудовникам?</h2>
          <p class="text-body-1 mb-4 text-slate-600">
            Компанія <strong>HappyLink</strong> пропонує послуги під ключ для забудовників. Побудова сучасних волоконно-оптичних мереж (GPON) у будинках, житлових комплексах, бізнес-центрах, адміністративних будівлях та інших об'єктах. Ми забезпечуємо повний цикл робіт: від проєктування до здачі в експлуатацію.
          </p>
          <p class="text-body-1 mb-4 text-slate-600">
            Ми маємо успішний досвід роботи та пропонуємо гнучкі, зручні та взаємовигідні умови співпраці, а також оптимальні телекомунікаційні рішення саме для Вашого об'єкта нерухомості.
          </p>
          <RequestForm
            FormData="Консультація для забудовників"
            ButtonTitle="Замовити консультацію"
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
             <v-img :src="developersBanner" cover class="h-100" min-height="300"></v-img>
           </div>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold mb-8 text-center">Весь обсяг телекомунікаційних робіт</h2>
        </v-col>
        <v-col v-for="(item, i) in services" :key="i" cols="12" sm="6" md="4">
          <div class="feature-card pa-6 h-100 d-flex flex-column">
            <v-icon :icon="item.icon" size="48" color="#fed100" class="mb-4"></v-icon>
            <h3 class="text-h6 font-weight-bold mb-3">{{ item.title }}</h3>
            <p class="text-body-2 text-slate-500">{{ item.desc }}</p>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-12 bg-slate-50 py-12 rounded-xl">
        <v-col cols="12" md="6" class="px-8">
          <h2 class="text-h4 font-weight-bold mb-6">Будівництво та проєктування інфраструктури</h2>
          <ul class="custom-list">
            <li>Будівництво внутрішніх та зовнішніх мереж будь-якої складності</li>
            <li>Підведення високошвидкісних магістральних оптоволоконних ліній до об'єкта</li>
            <li>Проєктування та будівництво сучасних енергонезалежних мереж (GPON)</li>
            <li>Впровадження систем безперебійного живлення для мережевого обладнання</li>
            <li>Проєктування та встановлення сучасних багатоквартирних домофонних систем</li>
            <li>Проєктування та монтаж структурованих кабельних систем (СКС)</li>
          </ul>
        </v-col>
        <v-col cols="12" md="6" class="px-8 mt-6 mt-md-0">
          <h2 class="text-h4 font-weight-bold mb-6">Переваги для Ваших інвесторів</h2>
          <ul class="custom-list">
            <li>В кожне приміщення заведено волоконно-оптичний кабель</li>
            <li>Високошвидкісний інтернет та резервне живлення мережі</li>
            <li>Безкоштовний Wi-Fi в холах, на ресепшені та у внутрішньому дворі Вашого ЖК</li>
            <li>Безкоштовний доступ до камер відеоспостереження на вхідних групах</li>
          </ul>
          <div class="mt-8 pa-6 border-left-accent bg-white rounded-lg">
            <h4 class="text-h6 font-weight-bold mb-2">Агентська схема співпраці</h4>
            <p class="text-body-2 text-slate-600 mb-0">Ми пропонуємо взаємовигідні умови співпраці, які дозволять Вам отримувати додатковий прибуток з підключень.</p>
          </div>
        </v-col>
      </v-row>

    </v-container>


  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';
import developersBanner from '@/assets/banners/developers.png';

export default {
  name: "Developers",
  components: {
    RequestForm
  },
  data() {
    return {
      developersBanner,
      services: [
        { icon: "mdi-file-document-outline", title: "Технічні умови", desc: "Видача технічних умов на будівництво телекомунікаційних мереж." },
        { icon: "mdi-draw", title: "Проєктування", desc: "Проєктно-кошторисні роботи, розробка та погодження робочого проєкту." },
        { icon: "mdi-folder-open-outline", title: "Документація", desc: "Підготовка всієї необхідної виконавчої документації для здачі об'єкта." },
        { icon: "mdi-clipboard-check-outline", title: "Контроль", desc: "Контроль виконаних робіт зі складанням відповідних актів." },
        { icon: "mdi-doorbell-video", title: "Домофонні системи", desc: "Проєктування та встановлення сучасних багатоквартирних домофонних систем з контролем доступу." },
        { icon: "mdi-cctv", title: "Відеоспостереження", desc: "Організація відеоспостереження за процесом будівництва для контролю." }
      ]
    }
  }
}
</script>

<style scoped>
.developers-page {
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
  margin-bottom: 16px;
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
</style>
