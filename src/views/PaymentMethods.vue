<!-- PaymentMethods.vue -->
<template>
  <div class="payment-section bg-grey-lighten-4 py-12">
    <v-container>
      <div class="text-center mb-12">
        <h2 class="hl-section-title">
          {{ $t('menu.payment') }}
        </h2>
        <p class="text-body-1 text-grey-darken-1 mt-4">Оберіть найзручніший для вас спосіб оплати</p>
      </div>

      <v-row class="justify-center g-4">
        <v-col
          v-for="(method, index) in localizedPaymentMethods"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex"
          @mouseenter="hoveredCard = index"
          @mouseleave="hoveredCard = null"
        >
          <v-card
            :href="method.link"
            target="_blank"
            class="payment-card hl-card pa-6 text-center w-100 d-flex flex-column align-center justify-space-between"
            elevation="0"
            rounded="xl"
          >
            <!-- Фоновий градієнт для ховеру -->
            <div class="hover-bg" :style="{ background: method.gradient }"></div>

            <div class="content-wrapper">
              <!-- Іконка / Логотип -->
              <div class="img-container mb-4">
                <v-img
                  :src="method.image"
                  :alt="method.title"
                  height="80"
                  contain
                  class="payment-image"
                />
              </div>

              <!-- Заголовок -->
              <h3 class="payment-title text-h6 font-weight-bold mb-3 d-flex align-center justify-center">
                {{ method.title }}
              </h3>

              <!-- Опис -->
              <p v-if="method.description" class="text-body-2 text-grey-darken-1 mb-4 px-2">
                {{ method.description }}
              </p>
            </div>

            <!-- Кнопка -->
            <div class="mt-auto w-100">
              <v-btn
                :variant="hoveredCard === index ? 'flat' : 'outlined'"
                :color="method.btnColor"
                rounded="pill"
                class="w-100 font-weight-bold action-btn"
                :class="hoveredCard === index ? 'text-white' : ''"
                append-icon="mdi-arrow-right"
              >
                Оплатити
              </v-btn>
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
  data() {
    return {
      hoveredCard: null,
      paymentMethods_ua: [
        {
          title: 'QR код Приват24',
          link: 'https://privatbank.ua/apps',
          image: 'http://happylink.net.ua/static/payment-methods/Privat24_QR_Code.png',
          description: 'Швидка оплата смартфоном через сканування QR-коду.',
          gradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
          btnColor: '#2e7d32'
        },
        {
          title: 'ПриватБанк',
          link: 'https://next.privat24.ua/payments/form/%7B%22token%22%3A%22b9b67f5b-1f2c-47c4-bb1f-be8d48609dc0%22%7D',
          image: 'http://happylink.net.ua/static/payment-methods/privatbank.png',
          description: 'Зручно оплатити через термінал або застосунок Приват24.',
          gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          btnColor: '#1565c0'
        },
        {
          title: 'EasyPay',
          link: 'https://easypay.ua/ru/catalog/internet/happylink',
          image: 'http://happylink.net.ua/static/payment-methods/easypay.png',
          description: 'Оплата без комісії у мережі терміналів та на сайті EasyPay.',
          gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          btnColor: '#ef6c00'
        },
        {
          title: 'City24',
          link: 'https://city24.ua/',
          image: 'http://happylink.net.ua/static/payment-methods/city24.png',
          description: 'Внесення готівки через широку мережу терміналів City24.',
          gradient: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
          btnColor: '#c62828'
        },
      ],
      paymentMethods_en: [
        {
          title: 'Privat24 QR Code',
          link: 'https://privatbank.ua/apps',
          image: 'http://happylink.net.ua/static/payment-methods/Privat24_QR_Code.png',
          description: 'Quick payment using your smartphone to scan the QR code.',
          gradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
          btnColor: '#2e7d32'
        },
        {
          title: 'PrivatBank',
          link: 'https://next.privat24.ua/payments/form/%7B%22token%22%3A%22b9b67f5b-1f2c-47c4-bb1f-be8d48609dc0%22%7D',
          image: 'http://happylink.net.ua/static/payment-methods/privatbank.png',
          description: 'Convenient payment via terminal or Privat24 app.',
          gradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          btnColor: '#1565c0'
        },
        {
          title: 'EasyPay',
          link: 'https://easypay.ua/ru/catalog/internet/happylink',
          image: 'http://happylink.net.ua/static/payment-methods/easypay.png',
          description: 'Commission-free payment at EasyPay terminals and website.',
          gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          btnColor: '#ef6c00'
        },
        {
          title: 'City24',
          link: 'https://city24.ua/',
          image: 'http://happylink.net.ua/static/payment-methods/city24.png',
          description: 'Cash deposit through the wide network of City24 terminals.',
          gradient: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
          btnColor: '#c62828'
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
.payment-card {
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  border: 1px solid rgba(0,0,0,0.04);
}

.payment-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
  border-color: transparent;
}

.hover-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.payment-card:hover .hover-bg {
  opacity: 0.6;
}

.content-wrapper, .action-btn {
  position: relative;
  z-index: 1;
}

.img-container {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  transition: transform 0.3s ease;
}

.payment-card:hover .img-container {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

.action-btn {
  transition: all 0.3s ease;
  background: white;
}

.payment-title {
  color: #2c3e50;
  font-size: 1.15rem;
}
</style>