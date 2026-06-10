<template>
  <div class="surveillance-section">
    <!-- Банер -->
    <div class="banner-container pa-6 mb-8" :data-aos="animated ? 'fade-up' : null">
      <v-row align="center" no-gutters>
        <v-col cols="12" md="7">
          <h1 class="banner-title text-h3 font-weight-bold mb-4">
            {{ $t('surveillance.bannerTitle') }}
          </h1>
          <p class="banner-subtitle text-body-1 mb-6">
            {{ $t('surveillance.bannerSubtitle') }}
          </p>
          <v-btn
            color="warning"
            size="large"
            rounded="xl"
            class="px-8 py-4 font-weight-bold"
            @click="scrollToConsultation"
          >
            {{ $t('surveillance.ctaButton') }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="5" class="text-center">
          <v-img
            src="https://happylink.net.ua/static/slider/PROMO_Bussines2025.jpg"
            alt="Відеоспостереження"
            max-width="300"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </div>

    <!-- 5 причин -->
    <v-container>
      <h2 class="hl-section-title mb-6">
        {{ $t('surveillance.reasonsTitle') }}
      </h2>

      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(reason, index) in localizedReasons"
          :key="index"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <v-card
            class="blog-card card-hover pa-6 card-animate"
            elevation="0"
            rounded="xl"
          >
            <div class="accent-bar"></div>
            <v-icon size="large" class="mb-3" :color="reason.iconColor">
              {{ reason.icon }}
            </v-icon>
            <h3 class="blog-title text-h6 font-weight-bold mb-3">
              {{ reason.title }}
            </h3>
            <div class="blog-content text-body-1">
              <p v-html="reason.text"></p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Консультація та ціни -->
    <v-container class="mt-10">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card
            class="blog-card card-hover pa-6 card-animate"
            elevation="0"
            rounded="xl"
            :data-aos="animated ? 'fade-up' : null"
          >
            <div class="accent-bar"></div>
            <h3 class="blog-title text-h5 font-weight-bold mb-4">
              {{ $t('surveillance.consultationTitle') }}
            </h3>

            <v-divider class="mb-4"></v-divider>

            <div class="blog-content text-body-1">
              <p v-html="$t('surveillance.priceInfo')"></p>
              <p v-html="$t('surveillance.projectInfo')"></p>
              <p v-html="$t('surveillance.remoteViewInfo')"></p>
            </div>

            <div class="mt-6">
              <h4 class="text-h6 font-weight-bold mb-3">{{ $t('surveillance.contacts') }}</h4>
              <div class="d-flex flex-column gap-2">
                <a href="tel:0671319072" class="contact-link">067 131 90 72</a>
                <a href="tel:0731319072" class="contact-link">073 131 90 72</a>
                <a href="tel:0991893710" class="contact-link">099 189 37 10</a>
              </div>
              <div class="mt-4">
                <a href="https://happylink.net.ua" target="_blank" class="website-link">
                  🌐 happylink.net.ua
                </a>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Surveillance',
  props: {
    animated: { type: Boolean, default: true },
  },
  methods: {
    scrollToConsultation() {
      const el = document.getElementById('consultation-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  data() {
    return {
      reasons_ua: [
        {
          id: 1,
          icon: 'mdi-eye',
          iconColor: '#fed100',
          title: 'Ваші очі та вуха',
          text: 'Камери — це ваші очі та вуха. З них можна спостерігати за місцями зберігання дорогоцінного товару або важливої документації, контролювати ситуацію в офісі, торговому приміщенні або на складі.'
        },
        {
          id: 2,
          icon: 'mdi-shield-lock',
          iconColor: '#feb700',
          title: 'Психологічний ефект стримування',
          text: 'Наявність камер має психологічний ефект стримування. Знаючи, що кожен крок буде записаний, зловмисник навряд чи ризикне проникнути на об’єкт під охороною.'
        },
        {
          id: 3,
          icon: 'mdi-file-document-check',
          iconColor: '#f5a623',
          title: 'Розв’язання конфліктів',
          text: 'При спірних ситуаціях з клієнтами наявність відеозапису стане вирішальним фактором. Це допоможе захистити вашу компанію та оскаржити необґрунтовані скарги.'
        },
        {
          id: 4,
          icon: 'mdi-store',
          iconColor: '#e67e22',
          title: 'Контроль розрізнених точок',
          text: 'Для великих мереж відеоспостереження через Інтернет дозволяє організувати єдину систему безпеки, що веде запис подій з усіх точок — навіть у різних містах.'
        },
        {
          id: 5,
          icon: 'mdi-account-group',
          iconColor: '#d35400',
          title: 'Контроль продуктивності',
          text: 'Можна контролювати роботу співробітників. Коли працівники знають, що за ними спостерігають, зникає проблема з низькою продуктивністю та дисципліною.'
        }
      ],
      reasons_en: [
        {
          id: 1,
          icon: 'mdi-eye',
          iconColor: '#fed100',
          title: 'Your Eyes and Ears',
          text: 'Cameras are your eyes and ears. You can monitor areas where valuable goods or important documents are stored, control the situation in offices, retail spaces, or warehouses.'
        },
        {
          id: 2,
          icon: 'mdi-shield-lock',
          iconColor: '#feb700',
          title: 'Deterrence Effect',
          text: 'The presence of cameras has a psychological deterrent effect. Knowing every step is recorded, criminals are unlikely to risk entering a secured object.'
        },
        {
          id: 3,
          icon: 'mdi-file-document-check',
          iconColor: '#f5a623',
          title: 'Conflict Resolution',
          text: 'In disputes with clients, video footage becomes a decisive factor. It helps protect your company and refute unfounded complaints.'
        },
        {
          id: 4,
          icon: 'mdi-store',
          iconColor: '#e67e22',
          title: 'Control of Remote Locations',
          text: 'For large networks, internet-based surveillance allows organizing a unified security system that records events from all locations — even across cities.'
        },
        {
          id: 5,
          icon: 'mdi-account-group',
          iconColor: '#d35400',
          title: 'Productivity Monitoring',
          text: 'You can monitor employee performance. When staff know they’re being watched, issues with low productivity and discipline disappear.'
        }
      ]
    };
  },
  computed: {
    localizedReasons() {
      return this.$i18n.locale === 'ua' ? this.reasons_ua : this.reasons_en;
    }
  }
};
</script>

<style scoped>
.surveillance-section {
  padding: 40px 0;
}

.banner-container {
  background: linear-gradient(135deg, #fffaf0, #fef3c7);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.banner-title {
  color: #2c3e50;
  line-height: 1.3;
}

.banner-subtitle {
  color: #424242;
  line-height: 1.7;
}





.blog-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.blog-card:hover {
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

.blog-title {
  color: #2c3e50;
  line-height: 1.3;
}

.blog-meta {
  font-size: 0.875rem;
}

.blog-content {
  line-height: 1.7;
  color: #424242;
}

.blog-content a {
  color: #26A69A;
  text-decoration: none;
  border-bottom: 1px dashed #26A69A;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.blog-content a:hover {
  background-color: #e8f5f3;
  border-bottom-style: solid;
}

/* Контакти */
.contact-link {
  color: #2c3e50;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding: 2px 4px;
  transition: all 0.2s ease;
}

.contact-link:hover {
  color: #fed100;
  border-bottom: 1px solid #fed100;
}

.website-link {
  color: #2c3e50;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding: 2px 4px;
  transition: all 0.2s ease;
}

.website-link:hover {
  color: #fed100;
  border-bottom: 1px solid #fed100;
}

/* Адаптив */
@media (max-width: 600px) {
  .banner-title {
    font-size: 1.5rem;
  }

  .banner-subtitle {
    font-size: 0.95rem;
  }

  

  .blog-card {
    padding: 16px !important;
  }

  .blog-title {
    font-size: 1.25rem;
  }

  .blog-content {
    font-size: 0.95rem;
  }

  .contact-link,
  .website-link {
    font-size: 0.95rem;
  }
}
</style>