<!-- Blog.vue -->
<template>
  <div class="blog-section">
    <h2 class="section-title">
      {{ $t('menu.news') }}
    </h2>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
          v-for="(n, index) in localizedNews"
          :key="index"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <v-card
            class="blog-card card-hover pa-6 card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса слева (градиентная) -->
            <div class="accent-bar"></div>

            <!-- Изображение -->
            <v-img
              v-if="n.img"
              :src="n.img"
              :alt="n.title"
              class="blog-image rounded-lg mb-4"
              height="180"
              cover
            ></v-img>

            <!-- Заголовок -->
            <h3 class="blog-title text-h5 font-weight-bold mb-2">
              {{ n.title }}
            </h3>

            <!-- Мета-информация -->
            <div class="blog-meta text-caption text-grey-darken-1 mb-4 d-flex align-center">
              <v-icon size="small" class="me-1">mdi-account</v-icon>
              <span>Author {{ n.author }}</span>
              <v-divider vertical class="mx-3" />
              <v-icon size="small" class="me-1">mdi-calendar</v-icon>
              <span>{{ n.date }}</span>
            </div>

            <v-divider class="mb-4"></v-divider>

            <!-- Текст -->
            <div class="blog-content text-body-1">
              <p
                v-for="(paragraph, pIndex) in n.text"
                :key="pIndex"
                v-html="paragraph"
                class="mb-4"
              ></p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      news_ua: [
        {
          id: 1,
          img: 'https://happylink.net.ua/assets/happylinkLogo-D70amuHX.svg',
          title: "Шановні клієнти!",
          author: "HAPPYLINK",
          date: "06.12.2024",
          text: [
            `Ми завжди прагнемо забезпечити вас якісним і надійним інтернет-зв’язком. Наша команда HappyLink постійно інвестує в розвиток інфраструктури, вдосконалення технологій і покращення сервісу.<br><br>
            Однак, у зв’язку зі зростанням витрат на підтримку мережі та оновлення обладнання, ми змушені переглянути вартість послуг. Це рішення далося нам нелегко, але воно необхідне, щоб і надалі забезпечувати вас стабільним, швидким та безперебійним інтернетом.<br><br>
            Зміни тарифів вступлять у силу з 1 січня 2025 року. Деталі щодо нових тарифів ви можете знайти на нашому сайті або звернутися до служби підтримки.<br><br>
            Ми вдячні вам за розуміння і довіру до HappyLink. Наша мета — залишатися вашим надійним партнером у світі зв’язку та технологій.<br><br>
            З повагою,<br>Команда HappyLink`
          ]
        },
        {
          id: 2,
          img: '',
          title: "Шалений листопад від HAPPYLINK",
          author: "HAPPYLINK",
          date: "01.11.2024",
          text: [
            `Підключайте гігабітний інтернет від HAPPYLINK у листопаді та отримайте безкоштовне користування до 1 січня 2025 року! Деталі акції можна знайти <a href="/promo" class="internal-link">тут</a>.`
          ]
        },
        {
          id: 3,
          img: '',
          title: "Оновлення сайту",
          author: "HAPPYLINK",
          date: "25.10.2024",
          text: [`Новий сучасний сайт з покращеним дизайном та швидкодією.`]
        },
      ],
      news_en: [
        {
          id: 1,
          img: 'https://happylink.net.ua/assets/happylinkLogo-D70amuHX.svg',
          title: "Dear Customers!",
          author: "HAPPYLINK",
          date: "06.12.2024",
          text: [
            `We always strive to provide you with high-quality and reliable internet connectivity. Our HappyLink team continually invests in infrastructure development, technology improvements, and service enhancements.<br><br>
            However, due to increasing costs of maintaining the network and upgrading equipment, we are forced to review the pricing of our services. This decision was not easy for us, but it is necessary to continue providing you with stable, fast, and uninterrupted internet access.<br><br>
            The tariff changes will take effect on January 1, 2025. You can find details about the new tariffs on our website or by contacting our support team.<br><br>
            We appreciate your understanding and trust in HappyLink. Our goal is to remain your reliable partner in the world of connectivity and technology.<br><br>
            Sincerely,<br>The HappyLink Team`
          ]
        },
        {
          id: 2,
          img: '',
          title: "November Madness by HAPPYLINK",
          author: "HAPPYLINK",
          date: "01.11.2024",
          text: [
            `Connect to HAPPYLINK's gigabit internet in November and enjoy free service until January 1, 2025! Find more details about the promotion <a href="/promo" class="internal-link">here</a>.`
          ]
        },
        {
          id: 3,
          img: '',
          title: "New site",
          author: "HAPPYLINK",
          date: "25.10.2024",
          text: [`Brand new modern website with improved design and performance.`]
        }
      ]
    };
  },
  computed: {
    localizedNews() {
      return this.$i18n.locale === 'ua' ? this.news_ua : this.news_en;
    }
  }
};
</script>

<style scoped>
.blog-section {
  padding: 40px 0;
  margin-bottom: 100px;
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

.blog-image {
  transition: transform 0.3s ease;
}

.blog-image:hover {
  transform: scale(1.02);
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

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
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
}
</style>