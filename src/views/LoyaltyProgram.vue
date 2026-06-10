<!-- LoyaltyProgram.vue -->
<template>
  <div class="loyalty-section">
    <h2 class="section-title">
      {{ $t('loyalty.title') }}
    </h2>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="0"
        >
          <v-card
            class="loyalty-card card-hover pa-6 card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса слева (градиентная) -->
            <div class="accent-bar"></div>

            <!-- Изображение -->
            <v-img
              v-if="localizedLoyalty.image"
              :src="localizedLoyalty.image.trim()"
              :alt="localizedLoyalty.title"
              class="loyalty-image rounded-lg mb-4"
              height="180"
              cover
            ></v-img>

            <!-- Заголовок -->
            <h3 class="loyalty-title text-h5 font-weight-bold mb-4">
              {{ localizedLoyalty.title }}
            </h3>

            <!-- Текст программы лояльности -->
            <div class="loyalty-content text-body-1">
              <p v-html="localizedLoyalty.description" class="mb-4"></p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LoyaltyProgram',
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      loyalty_ua: {
        id: 'loyalty-program',
        title: 'Акції програми лояльності для наших абонентів від HappyLink',
        description: `1. "Запроси друга – отримай бонус" <br>
&#x2714; Приведи друга – отримай 2 місяці безкоштовного інтернету. <br>
&#x2714; Друг також отримує знижку 50% на 3 місяці. <br>
Акція не зараховується автоматично та не сумується з іншими акціями, для нарахування бонусів необхідно звернутися до кол-центру. <br><br>

2. "Стабільне користування" <br>
&#x2714; Після 6 місяців безперервного користування – 15% знижки на наступний платіж (одноразово). <br>
&#x2714; Після 1 року користування – 20% знижки на наступний платіж (одноразово). <br>
Акція не зараховується автоматично та не сумується з іншими акціями, для нарахування бонусів необхідно звернутися до кол-центру. <br><br>

3. "Швидкісний бонус" <br>
&#x2714; Постійним абонентам (користування більше 6 місяців) – збільшення швидкості на 1 місяць безкоштовно. <br>
Акція не зараховується автоматично та не сумується з іншими акціями, для нарахування бонусів необхідно звернутися до кол-центру. <br><br>

4. "День народження з HappyLink" <br>
&#x2714; При оплаті інтернету в день народження – знижка 20%. <br>
&#x2714; Для отримання знижки потрібно надати підтверджуючий документ. <br>
Акція не зараховується автоматично та не сумується з іншими акціями, для нарахування бонусів необхідно звернутися до кол-центру. <br><br>

5. "Супер-приз" <br>
Розігруємо впродовж року безкоштовне користування інтернетом, слідкуйте за нашими новинами та беріть участь у розіграшах. <br><br>

6. "Знижки для пільгових категорій від HappyLink" <br>
&#x2714; Учасники бойових дій – знижка 20% на щомісячну оплату інтернету. <br>
&#x2714; Пенсіонери (60+) – знижка 10% на тарифний план. <br>
&#x2714; Для отримання знижки потрібно надати підтверджуючий документ (посвідчення УБД або пенсійне посвідчення). <br>
Акція не зараховується автоматично та не сумується з іншими акціями, для нарахування бонусів необхідно звернутися до кол-центру.`,
        image: 'https://happylink.net.ua/static/slider/PROMO-PROGRAM.jpg'
      },
      loyalty_en: {
        id: 'loyalty-program',
        title: 'Loyalty Program Promotions for Our HappyLink Subscribers',
        description: `1. "Refer a Friend – Get a Bonus" <br>
&#x2714; Refer a friend and get 2 months of free internet. <br>
&#x2714; Your friend also receives a 50% discount for 3 months. <br>
This promotion is not applied automatically and cannot be combined with other offers. To claim your bonus, please contact our call center. <br><br>

2. "Stable Usage" <br>
&#x2714; After 6 months of continuous service – 15% discount on your next payment (one-time). <br>
&#x2714; After 1 year of service – 20% discount on your next payment (one-time). <br>
This promotion is not applied automatically and cannot be combined with other offers. To claim your bonus, please contact our call center. <br><br>

3. "Speed Bonus" <br>
&#x2714; Long-term subscribers (6+ months) receive a free 1-month speed upgrade. <br>
This promotion is not applied automatically and cannot be combined with other offers. To claim your bonus, please contact our call center. <br><br>

4. "Birthday with HappyLink" <br>
&#x2714; Pay for your internet on your birthday and get a 20% discount. <br>
&#x2714; A valid ID is required to confirm your date of birth. <br>
This promotion is not applied automatically and cannot be combined with other offers. To claim your bonus, please contact our call center. <br><br>

5. "Super Prize" <br>
We’re giving away free internet throughout the year! Follow our news and participate in our giveaways. <br><br>

6. "Discounts for Eligible Groups from HappyLink" <br>
&#x2714; Veterans of combat operations – 20% monthly internet discount. <br>
&#x2714; Pensioners (60+) – 10% discount on tariff plans. <br>
&#x2714; Valid documentation (veteran ID or pension certificate) is required. <br>
This promotion is not applied automatically and cannot be combined with other offers. To claim your bonus, please contact our call center.`,
        image: 'https://happylink.net.ua/static/slider/PROMO-PROGRAM.jpg'
      }
    };
  },
  computed: {
    localizedLoyalty() {
      return this.$i18n.locale === 'ua' ? this.loyalty_ua : this.loyalty_en;
    }
  }
};
</script>

<style scoped>
.loyalty-section {
  padding: 40px 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #fed100, #feb700);
  margin: 12px auto 0;
  border-radius: 2px;
}

.loyalty-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.loyalty-card:hover {
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

.loyalty-image {
  transition: transform 0.3s ease;
}

.loyalty-image:hover {
  transform: scale(1.02);
}

.loyalty-title {
  color: #2c3e50;
  line-height: 1.3;
}

.loyalty-content {
  line-height: 1.7;
  color: #424242;
}

.loyalty-content a {
  color: #26A69A;
  text-decoration: none;
  border-bottom: 1px dashed #26A69A;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.loyalty-content a:hover {
  background-color: #e8f5f3;
  border-bottom-style: solid;
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .loyalty-card {
    padding: 16px !important;
  }

  .loyalty-title {
    font-size: 1.25rem;
  }

  .loyalty-content {
    font-size: 0.95rem;
  }
}
</style>