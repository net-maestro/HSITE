<template>
  <!-- Заголовок -->
  <v-card-subtitle class="subtitle-slider text-center text-h6 text-uppercase mt-2">
    {{ $t('menu.promo') }}
  </v-card-subtitle>

  <div class="promotions-wrapper">
    <!-- Активные акции -->
    <v-container>
      <v-row>
        <v-col
          v-for="(promo, index) in activePromos"
          :key="'active-' + index"
          cols="12"
          md="6"
        >
          <!-- Встроенный PromoCard -->
          <v-card
            class="promo-card pa-5 rounded-xl card-hover card-animate"
            hover
            elevation="2"
          >
            <!-- Лента статуса -->
            <div :class="['ribbon', !promo.status ? 'ribbon-inactive' : 'ribbon-active']">
              {{ !promo.status ? $t('promo.inactive') : $t('promo.active') }}
            </div>

            <!-- Изображение -->
            <div class="text-center mb-4">
              <v-img
                :src="promo.image"
                :height="promo.size || 300"
                contain
                class="promo-image rounded-lg mx-auto"
                :class="{ 'grayscale': !promo.status }"
              ></v-img>
            </div>

            <!-- Заголовок -->
            <v-card-title class="text-h6 font-weight-bold text-center mb-3 px-2">
              {{ promo.title }}
            </v-card-title>

            <!-- Описание с прокруткой -->
            <v-card-text class="text-body-1 text-grey-darken-1 px-4 pb-4 description-scroll">
              <div v-html="promo.description"></div>
            </v-card-text>

            <!-- Кнопка (только если активная и есть button=true) -->
            <v-card-actions v-if="promo.button && promo.status" class="pt-2">
              <div class="w-100 text-center">
                <RequestForm
                  :FormData="promo.title"
                  :ButtonTitle="$t('promo.join-the-promotion')"
                  ButtonColor="#26A69A"
                  ButtonIcon="mdi-arrow-right"
                />
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Неактивные акции -->
      <v-card-subtitle class="text-center text-h6 text-uppercase font-weight-medium mt-8 mb-4 text-grey">
        {{ $t('promo.inactive-promotions') }}
      </v-card-subtitle>

      <v-row>
        <v-col
          v-for="(promo, index) in inactivePromos"
          :key="'inactive-' + index"
          cols="12"
          md="6"
        >
          <!-- Встроенный PromoCard (неактивный) -->
          <v-card
            class="promo-card pa-5 rounded-xl"
            elevation="2"
          >
            <!-- Лента статуса -->
            <div class="ribbon ribbon-inactive">
              {{ $t('promo.inactive') }}
            </div>

            <!-- Изображение -->
            <div class="text-center mb-4">
              <v-img
                :src="promo.image"
                :height="promo.size || 300"
                contain
                class="promo-image rounded-lg mx-auto grayscale"
              ></v-img>
            </div>

            <!-- Заголовок -->
            <v-card-title class="text-h6 font-weight-bold text-center mb-3 px-2">
              {{ promo.title }}
            </v-card-title>

            <!-- Описание с прокруткой -->
            <v-card-text class="text-body-1 text-grey-darken-1 px-4 pb-4 description-scroll">
              <div v-html="promo.description"></div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>


export default {

  props: {
    animated: { type: Boolean, default: true }
  },
  computed: {
    localizedPromos() {
      return this.$i18n.locale === 'ua' ? this.promos_ua : this.promos_en;
    },
    activePromos() {
      return this.localizedPromos.filter((promo) => promo.status);
    },
    inactivePromos() {
      return this.localizedPromos.filter((promo) => !promo.status);
    }
  },
  data() {
    return {
      promos_ua: [
        {
          title: 'Бізнес старт від HappyLink – час для швидкого інтернету!',
          size: 300,
          status: true,
          button: true,
          description: `🚀 Підключайте оптоволоконний інтернет GPON для бізнесу: <br>
⚡️ Швидкість до 1 Гбіт/с <br>
💸 Сплатіть лише 50% вартості перші 6 місяців <br>
🎁 Безкоштовне підключення <br>
📅 Акція діє 6 місяців <br><br>

<strong>Деталі акції:</strong> <br>
- Підключення безкоштовне, окрім вартості обладнання (оптичний термінал, роутер, дбж), що надається при підключенні і залишається у власності абонента. <br>
- Акція діє лише для нових бізнес-абонентів, які мають технічну можливість підключення та не користувались послугами HappyLink протягом останніх 6 місяців. <br>
- Умови акції не поширюються на адреси, де протягом останніх 6 місяців надавалися послуги від HappyLink. <br>
- Акція призначена виключно для приміщень комерційного призначення (офіси, магазини, сервіси тощо). <br>
- Після закінчення акційного періоду абонент сплачуватиме повну вартість обраного тарифу. <br><br>

📞 Для підключення та консультації: <br>
<a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
<a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a> <br>
<a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br><br>

HappyLink — ваш надійний інтернет для бізнесу з першого дня! 💼`,
          image: 'https://happylink.net.ua/static/slider/PROMO_Bussines2025.jpg'
        },
        {
          title: 'Осінь з HappyLink – час для швидкого інтернету!',
          size: 300,
          status: true,
          button: true,
          description: `🍂  Підключайте оптоволоконний інтернет GPON: <br>
⚡️ Швидкість до 1 Гбіт/с <br>
💛 Всього 89 грн/міс <br>
🎁 Безкоштовне підключення <br>
📅 Акція діє 6 місяців <br><br>

<strong>Деталі акції:</strong> <br>
- Підключення безкоштовне, окрім вартості обладнання (оптичний термінал, роутер, дбж), що надається при підключенні і залишається у власності абонента. <br>
- Акція діє лише для нових абонентів компанії, які мають технічну можливість підключення та не користувались послугами компанії HappyLink протягом останніх 6 місяців. <br>
- Умови акції не поширюються на адреси підключення, де протягом останніх 6 місяців надавалися послуги від HappyLink. <br>
- Дія акції не поширюється на приміщення комерційного призначення (офіси, магазини тощо). <br>
- Після закінчення акційного періоду абонент сплачуватиме стандартну вартість тарифу. <br><br>

📞 Замовлення підключення: <br>
<a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
<a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a> <br>
<a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br><br>

HappyLink — нехай ваша осінь буде швидкою та затишною! 🍁`,
          image: 'https://happylink.net.ua/static/slider/PROMO_Autumn2025.jpg' 
        },
        {
          title: "Весна швидкості з HappyLink!",
          size: 300,
          status: false,
          button: false,
          description: `Весна – це час оновлення, легкості та нових можливостей! 
  <br><br>💛Лише 99 грн/міс впродовж року! 
  <br>🔌 Безкоштовне підключення – просто насолоджуйтесь якісним інтернетом! 
  <br>🌐 GPON-технологія – стабільність, швидкість і комфорт! 
  <br><br> Акція діє для нових абонентів компанії, тільки для квартир. Для діючих абонентів діє програма лояльності. 
  <br><br> 📞 Замовлення підключення: <br>
  <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
  <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a><br>
  <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . 
  <br><br>HappyLink – нехай ваш інтернет буде таким же швидким, як весняний вітерець! 💨`,
          image: "https://happylink.net.ua/static/slider/Spring2.jpg" 
        },
        {
          title: "109 причин підключити HappyLink!",
          size: 300,
          status: false,
          button: false,
          description: `Шукаєш надійний інтернет? Ми маємо для тебе гарне рішення! <br><br>
    Підключайте гігабітний GPON-інтернет всього за 109 грн/місяць впродовж року! <br><br>
    ✅ 1. Працюємо без світла – залишайся онлайн за будь-яких умов <br>
    ✅ 2. Безкоштовне підключення, оплата лише за обладнання (600 грн абонентський термінал). <br>
    ✅ 3. Швидкість до 1 Гб/с – працюй, грай, дивись відео без затримок <br>
    ✅ 4. Технологія GPON – сучасне оптоволокно для стабільного зв’язку <br>
    ✅ 5. Усього 109 грн/міс впродовж року! <br>
    ✅ ... <br>
    ✅ 109. Команда HappyLink працює для вас з❤️.<br><br>
    <strong style="color: red;">📅 Акція діє впродовж березня.</strong> <br>
    📞 <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a> <br>
    📞 <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br>
    📞 <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> <br>
    Команда HappyLink` ,
          image: "https://happylink.net.ua/static/slider/PROMO-109.jpg"
        },
        {
          title: 'Акція "Теплий зв’язок з HappyLink!"',
          size: 300,
          status: false,
          button: false,
          description: `Цієї зими підключайте оптоволоконновий інтернет безкоштовно. Швидкість до 1 Гбіт/с для комфортного користування. <br>
  Отримайте: <br>
  - Стабільний зв’язок навіть у морозні дні. <br>
  - Знижку 50% на абонплату за перші 6 місяці! <br>
  - <strong style="color: red;">📅 Акція діє з 13 грудня до 29 лютого лише для нових абонентів або  при переключенні від іншого провайдера.</strong> <br>
  📞 Замовлення підключення: <br>
  <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
  <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a><br>
  <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br>
  HappyLink — ваш затишний інтернет на всю зиму!`,
          image: 'https://happylink.net.ua/static/slider/promo5.jpg'
        },
        {
          title: 'Акція Шалений листопад від HAPPYLINK',
          size: 300,
          status: false,
          button: false,
          description: `Підключайте гігабітний оптоволоконний інтернет від HAPPYLINK впродовж листопада та користуйтесь до 1 січня 2025 безкоштовно. Підключення безкоштовне, оплата лише за обладнання. Акція актуальна для нових абонентів. <br> Деталі за номерами:  <br>
        <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
        <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a><br>
        <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br>`,
          image: 'https://happylink.net.ua/static/news/promo4.webp'
        },
        {
          title: 'Акції програми лояльності для наших абонентів від HappyLink',
          size: 300,
          status: true,
          button: false,
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
        {
          title: 'Акція День Народження!',
          size: 300,
          status: true,
          button: true,
          description: 'Ми раді привітати Вас в цей день ;)',
          image: 'https://happylink.net.ua/static/slider/BIRTHDAY.jpg'
        },
        {
          title: 'Акція 10 + 2',
          size: 300,
          status: true,
          button: true,
          description: 'Швидкий інтернет на всі випадки життя 10 + 2',
          image: 'https://happylink.net.ua/static/slider/PROMO_10+2.jpg'
        },
        {
          title: 'Акція "Приведи друга"',
          size: 300,
          status: true,
          button: true,
          description: 'Запроси друга підключитися до нашого інтернету та отримай додаткову знижку наступного місяця.',
          image: 'https://happylink.net.ua/static/slider/friend-dog.jpg'
        },
      ],
      promos_en: [
        {
          title: 'Business Start by HappyLink – Time for Fast Internet!',
          size: 300,
          status: true,
          button: true,
          description: `🚀 Connect GPON fiber-optic internet for your business: <br>
⚡️ Speed up to 1 Gbps <br>
💸 Pay only 50% of the tariff for the first 6 months <br>
🎁 Free connection <br>
📅 Promotion valid for 6 months <br><br>

<strong>Terms & Conditions:</strong> <br>
- Connection is free, except for equipment cost (optical terminal, router, upc), provided during setup and remains the subscriber's property. <br>
- The offer is available only for new business customers with technical connectivity who haven’t used HappyLink services in the last 6 months. <br>
- The promotion does not apply to addresses where HappyLink services were active in the past 6 months. <br>
- This offer is intended exclusively for commercial premises (offices, shops, service centers, etc.). <br>
- After the promotional period, the full tariff rate applies. <br><br>

📞 For connection and consultation: <br>
<a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
<a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a> <br>
<a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br><br>

HappyLink — reliable internet for your business from day one! 💼`,
          image: 'https://happylink.net.ua/static/slider/PROMO_Bussines2025.jpg'
        },
        {
          title: 'Autumn with HappyLink – Time for Fast Internet!',
          size: 300,
          status: true,
          button: true,
          description: `🍂 Connect to GPON fiber-optic internet: <br>
⚡️ Speed up to 1 Gbps <br>
💛 Only 89 UAH/month <br>
🎁 Free connection <br>
📅 Promotion valid for 6 months <br><br>

<strong>Terms & Conditions:</strong> <br>
- Connection is free, except for equipment cost (optical terminal, router, upc), which is provided during setup and remains the property of the subscriber. <br>
- The promotion is available only for new customers who have technical connectivity and haven’t used HappyLink services in the last 6 months. <br>
- The offer does not apply to addresses where HappyLink services were provided in the past 6 months. <br>
- The promotion is not valid for commercial premises (offices, shops, etc.). <br>
- After the promotional period, the subscriber will pay the standard tariff rate. <br><br>

📞 To order: <br>
<a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
<a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a> <br>
<a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br><br>

HappyLink — may your autumn be fast and cozy! 🍁`,
          image: 'https://happylink.net.ua/static/slider/PROMO_Autumn2025.jpg'
        },
        {
          title: "Spring of Speed with HappyLink!",
          size: 300,
          status: true,
          button: true,
          description: `Spring is a time of renewal, lightness, and new opportunities! 
  <br><br>💛 Only 99 UAH/month for a whole year! 
  <br>🔌 Free connection – just enjoy high-quality internet! 
  <br>🌐 GPON technology – stability, speed, and comfort! 
  <br><br> The offer is valid for new customers only, and only for apartments. Existing customers can enjoy our loyalty program. 
  <br><br> 📞 Order your connection: <br>
  <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
  <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a><br>
  <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a>.
  <br><br>HappyLink – may your internet be as fast as the spring breeze! 💨`,
          image: "https://happylink.net.ua/static/slider/Spring2.jpg"
        },
        {
          title: "109 reasons to connect with HappyLink!",
          size: 300,
          status: false,
          button: false,
          description: `Looking for a reliable internet provider? We have a great solution for you! <br><br>
    Get gigabit GPON internet for just 109 UAH/month for a whole year! <br><br>
    ✅ 1. Works without electricity – stay online under any conditions <br>
    ✅ 2. Free connection, pay only for equipment (600 UAH subscriber terminal). <br>
    ✅ 3. Speed up to 1 Gbps – work, play, and watch videos without delays <br>
    ✅ 4. GPON technology – modern fiber optics for a stable connection <br>
    ✅ 5. Only 109 UAH/month for a year! <br>
    ✅ ... <br>
    ✅ 109. The HappyLink team works for you with ❤️.<br><br>
    <strong style="color: red;">📅 The promotion is valid throughout March.</strong> <br>
    📞 <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a> <br>
    📞 <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br>
    📞 <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> <br>
    The HappyLink Team` ,
          image: "https://happylink.net.ua/static/slider/PROMO-109.jpg"
        },
        {
          title: 'Promo "Warm Connection with HappyLink!"',
          size: 300,
          status: false,
          button: false,
          description: `This winter, connect to our fiber-optic internet for free. Enjoy speeds of up to 1 Gbps for seamless use. <br>
  Benefits: <br>
  - Reliable connection even on the coldest days. <br>
  - 50% discount on subscription fees for the first 6 months! <br>
  - <strong style="color: red;">📅 The promotion is valid from 13 rubles to 29 rubles for new subscribers or when switching to another provider.</strong> <br>
  📞 Order your connection today: <br>
  <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
  <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a><br>
  <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> <br>
  HappyLink — your cozy internet all winter long!`,
          image: 'https://happylink.net.ua/static/slider/promo5.jpg'
        },
        {
          title: 'Loyalty Program Promotions for Our Subscribers from HappyLink',
          size: 300,
          status: true,
          button: false,
          description: `1. "Invite a Friend – Get a Bonus" <br>
&#x2714; Bring a friend – get 2 months of free internet. <br>
&#x2714; Your friend also gets a 50% discount for 3 months. <br>
The promotion is not applied automatically and cannot be combined with other promotions. To receive bonuses, please contact the call center. <br><br>

2. "Stable Usage" <br>
&#x2714; After 6 months of uninterrupted service – 15% discount on the next payment (one-time). <br>
&#x2714; After 1 year of service – 20% discount on the next payment (one-time). <br>
The promotion is not applied automatically and cannot be combined with other promotions. To receive bonuses, please contact the call center. <br><br>

3. "Speed Bonus" <br>
&#x2714; Long-term subscribers (over 6 months of usage) get a free speed upgrade for 1 month. <br>
The promotion is not applied automatically and cannot be combined with other promotions. To receive bonuses, please contact the call center. <br><br>

4. "Birthday with HappyLink" <br>
&#x2714; Pay for your internet service on your birthday and get a 20% discount. <br>
&#x2714; A valid ID is required to receive the discount. <br>
The promotion is not applied automatically and cannot be combined with other promotions. To receive bonuses, please contact the call center. <br><br>

5. "Super Prize" <br>
We hold annual raffles for free internet access. Stay tuned for our news and participate in the giveaways. <br><br>

6. "Discounts for Privileged Categories from HappyLink" <br>
&#x2714; Combat veterans – 20% discount on the monthly internet fee. <br>
&#x2714; Pensioners (60+) – 10% discount on the tariff plan. <br>
&#x2714; A valid document (combat veteran ID or pension certificate) is required to receive the discount. <br>
The promotion is not applied automatically and cannot be combined with other promotions. To receive bonuses, please contact the call center.`,
          image: "https://happylink.net.ua/static/slider/PROMO-PROGRAM.jpg"
        },
        {
          title: 'Promo November Madness by HAPPYLINK',
          size: 300,
          status: false,
          description: `Connect to HAPPYLINK’s gigabit fiber internet in November and enjoy free service until January 1, 2025. Connection is free, only pay for the equipment. This offer is valid for new subscribers.  <br> For details, call:  <br>
         <a href="tel:+380671319072" style="text-decoration: none;">(067) 131-90-72</a> <br> 
        <a href="tel:+380731319072" style="text-decoration: none;">(073) 131-90-72</a><br>
        <a href="tel:+380991893710" style="text-decoration: none;">(099) 189-37-10</a> . <br>.`,
          image: 'https://happylink.net.ua/static/news/promo4.webp'
        },
        {
          title: 'Promo Birthday Celebration!',
          size: 300,
          status: true,
          description: 'We are happy to welcome you on this special day ;)',
          image: 'https://happylink.net.ua/static/slider/BIRTHDAY.jpg'
        },
        {
          title: 'Promo 10 + 2',
          size: 300,
          status: true,
          description: 'Fast internet for all occasions 10 + 2',
          image: 'https://happylink.net.ua/static/slider/PROMO_10+2.jpg'
        },
        {
          title: 'Promo Refer a Friend',
          size: 300,
          status: true,
          description: 'Invite a friend to join our internet and receive an additional discount next month.',
          image: 'https://happylink.net.ua/static/slider/friend-dog.jpg'
        },
      ]
    };
  },

};
</script>

<style scoped>
.v-card .v-card-title {white-space: unset;}

.promo-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #eeeeee;
  min-height: 500px;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.promo-image {
  max-height: 280px;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.grayscale {
  filter: grayscale(100%) opacity(0.7);
}

/* Лента статуса */
.ribbon {
  position: absolute;
  top: 16px;
  right: -30px;
  width: 160px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.ribbon-active {
  background: linear-gradient(135deg, #49CBD6 0%, #26A69A 100%);
}

.ribbon-inactive {
  background: linear-gradient(135deg, #D9534F 0%, #C12E27 100%);
  opacity: 0.8;
}

/* Прокрутка текста */
.description-scroll {
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.6;
  font-size: 0.95rem;
  padding: 0 16px;
  margin-bottom: 8px;
}

.description-scroll::-webkit-scrollbar {
  width: 6px;
}

.description-scroll::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 10px;
}

.description-scroll::-webkit-scrollbar-track {
  background: transparent;
}

/* Адаптив */
@media (max-width: 600px) {
  .promo-card {
    min-height: 460px;
    padding: 16px;
  }
  .promo-image {
  max-height: 200px;
}

  .description-scroll {
    max-height: 200px;
    font-size: 0.875rem;
  }
}

.promotions-wrapper {
  background-color: #fafafa;
  padding: 16px 0;
  border-radius: 12px;
}

@media (min-width: 960px) {
  .promotions-wrapper {
    padding: 32px 0;
  }
}
</style>
