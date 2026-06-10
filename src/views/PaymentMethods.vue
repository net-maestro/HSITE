<!-- PaymentMethods.vue -->
<template>
  <div class="payment-section">
    <h2 class="section-title">
      {{ $t('menu.payment') }}
    </h2>

    <v-container>
      <v-row class="justify-center">
        <v-col
          v-for="(paymentMethod, index) in localizedPaymentMethods"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <v-card
            :href="paymentMethod.link"
            target="_blank"
            class="payment-card card-hover pa-6 text-center card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса слева -->
            <div class="accent-bar"></div>

            <!-- Изображение -->
            <v-img
              :src="paymentMethod.image"
              :alt="paymentMethod.title"
              :height="paymentMethod.height || 120"
              :max-height="paymentMethod.height || 120"
              contain
              class="payment-image rounded-lg mb-4"
            />

            <!-- Заголовок -->
            <h3 class="payment-title text-h6 font-weight-bold mb-2">
              {{ paymentMethod.title }}
              <v-icon
                icon="mdi-arrow-right"
                size="small"
                class="ml-1"
                color="#26A69A"
              ></v-icon>
            </h3>

            <!-- Описание -->
            <div v-if="paymentMethod.description" class="payment-description text-body-2">
              <v-icon
                icon="mdi-apps"
                size="small"
                color="primary"
                class="me-1"
              ></v-icon>
              {{ paymentMethod.description }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PaymentMethods",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      paymentMethods_ua: [
        {
          height: 200,
          title: 'Оплата по QR коду',
          link: 'https://privatbank.ua/apps',
          image: 'http://happylink.net.ua/static/payment-methods/Privat24_QR_Code.png',
          description: ''
        },
        {
          height: 100,
          title: 'Оплата ПриватБанк',
          link: 'https://next.privat24.ua/payments/form/%7B%22token%22%3A%22b9b67f5b-1f2c-47c4-bb1f-be8d48609dc0%22%7D',
          image: 'http://happylink.net.ua/static/payment-methods/privatbank.png',
          description: 'Оплатити послуги через термінал або Приват24'
        },
        {
          height: 100,
          title: 'Оплата EasyPay',
          link: 'https://easypay.ua/ru/catalog/internet/happylink',
          image: 'http://happylink.net.ua/static/payment-methods/easypay.png',
          description: 'Використання терміналів EasyPay для оплати'
        },
        {
          height: 100,
          title: 'Оплата City24',
          link: 'https://city24.ua/',
          image: 'http://happylink.net.ua/static/payment-methods/city24.png',
          description: 'Внести оплату через мережу терміналів City24'
        },
      ],
      paymentMethods_en: [
        {
          height: 200,
          title: 'Payment via QR Code',
          link: 'https://privatbank.ua/apps',
          image: 'http://happylink.net.ua/static/payment-methods/Privat24_QR_Code.png',
          description: ''
        },
        {
          height: 100,
          title: 'Payment via PrivatBank',
          link: 'https://next.privat24.ua/payments/form/%7B%22token%22%3A%22b9b67f5b-1f2c-47c4-bb1f-be8d48609dc0%22%7D',
          image: 'http://happylink.net.ua/static/payment-methods/privatbank.png',
          description: 'Pay for services via terminal or Privat24'
        },
        {
          height: 100,
          title: 'Payment via EasyPay',
          link: 'https://easypay.ua/ru/catalog/internet/happylink',
          image: 'http://happylink.net.ua/static/payment-methods/easypay.png',
          description: 'Use EasyPay terminals for payment'
        },
        {
          height: 100,
          title: 'Payment via City24',
          link: 'https://city24.ua/',
          image: 'http://happylink.net.ua/static/payment-methods/city24.png',
          description: 'Make payments through the City24 terminal network'
        },
      ]
    };
  },
  computed: {
    localizedPaymentMethods() {
      return this.$i18n.locale === 'ua' ? this.paymentMethods_ua : this.paymentMethods_en;
    }
  }
};
</script>

<style scoped>
.payment-section {
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

.payment-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.payment-card:hover {
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

.payment-image {
  transition: transform 0.3s ease;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.payment-image:hover {
  transform: scale(1.03);
}

.payment-title {
  color: #2c3e50;
  line-height: 1.3;
}

.payment-description {
  color: #424242;
  line-height: 1.5;
  margin-top: 8px;
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .payment-card {
    padding: 16px !important;
  }

  .payment-title {
    font-size: 1.1rem;
  }

  .payment-description {
    font-size: 0.9rem;
  }

  /* QR-код на мобильных — не слишком большой */
  .payment-image {
    max-height: 160px !important;
    height: auto !important;
  }
}
</style>