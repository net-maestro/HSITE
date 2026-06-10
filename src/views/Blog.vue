<!-- Blog.vue -->
<template>
  <div class="blog-section">
    <h2 class="hl-section-title mb-10">
      {{ $t('menu.news') }}
    </h2>

    <v-container class="max-width-container">
      <v-row class="g-6">
        <v-col
          v-for="(n, index) in localizedNews"
          :key="n.id"
          :cols="12"
          :md="index === 0 ? 12 : 6"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <!-- Featured Post (First Item) -->
          <v-card
            v-if="index === 0"
            class="blog-card featured-card overflow-hidden"
            elevation="10"
            rounded="xl"
          >
            <div class="featured-bg" :style="{ backgroundImage: n.img ? `url(${n.img})` : 'linear-gradient(135deg, #1e293b, #334155)' }"></div>
            <div class="featured-overlay"></div>
            
            <div class="featured-content pa-8 pa-md-16 d-flex flex-column justify-end h-100 position-relative">
              <div class="blog-meta text-white mb-4 d-flex align-center" style="opacity: 0.9">
                <v-chip color="secondary" variant="flat" size="small" class="font-weight-bold mr-4" text-color="#1e293b">
                  НОВЕ
                </v-chip>
                <v-icon size="small" class="me-2">mdi-calendar</v-icon>
                <span>{{ n.date }}</span>
              </div>

              <h3 class="blog-title featured-title text-h4 text-md-h3 font-weight-bold text-white mb-6">
                {{ n.title }}
              </h3>

              <div 
                class="blog-text text-white text-body-1 mb-8" 
                style="opacity: 0.85; max-width: 800px; transition: all 0.3s ease;"
                :class="{ 'line-clamp-3': !n.expanded }"
                v-html="n.text[0]"
              >
              </div>
              
              <div>
                <v-btn 
                  color="secondary" 
                  class="text-none font-weight-bold px-8" 
                  rounded="lg" 
                  size="large"
                  @click="n.expanded = !n.expanded"
                >
                  {{ n.expanded ? 'Згорнути' : 'Читати далі' }}
                  <v-icon right class="ml-2">{{ n.expanded ? 'mdi-chevron-up' : 'mdi-arrow-right' }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>

          <!-- Regular Posts -->
          <v-card
            v-else
            class="blog-card regular-card d-flex flex-column h-100"
            elevation="4"
            rounded="xl"
          >
            <div class="image-wrapper">
              <div class="regular-img" :style="{ backgroundImage: n.img ? `url(${n.img})` : 'linear-gradient(135deg, #f8fafc, #e2e8f0)' }">
                <v-icon v-if="!n.img" size="64" color="#cbd5e1" class="placeholder-icon">mdi-newspaper-variant-outline</v-icon>
              </div>
            </div>

            <div class="pa-6 pa-md-8 d-flex flex-column flex-grow-1 bg-white position-relative">
              <div class="accent-line"></div>
              <div class="blog-meta text-grey-darken-1 mb-4 d-flex align-center">
                <v-icon size="small" class="me-1">mdi-calendar</v-icon>
                <span class="text-caption font-weight-medium">{{ n.date }}</span>
                <v-divider vertical class="mx-3" />
                <v-icon size="small" class="me-1">mdi-account</v-icon>
                <span class="text-caption font-weight-medium">{{ n.author }}</span>
              </div>

              <h3 class="blog-title text-h5 font-weight-bold mb-4" style="color: #1e293b;">
                {{ n.title }}
              </h3>

              <div 
                class="blog-text text-body-1 text-grey-darken-2 mb-6 flex-grow-1"
                :class="{ 'line-clamp-3': !n.expanded }"
                style="transition: all 0.3s ease;"
                v-html="n.text[0]"
              >
              </div>

              <div class="mt-auto">
                <a href="#" @click.prevent="n.expanded = !n.expanded" class="read-more-link font-weight-bold">
                  {{ n.expanded ? 'Згорнути' : 'Читати далі' }} <v-icon size="small" class="ml-1">{{ n.expanded ? 'mdi-chevron-up' : 'mdi-arrow-right' }}</v-icon>
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
  name: 'Blog',
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      news_ua: [
        {
          id: 4,
          img: 'https://happylink.net.ua/assets/cyberspace-3_ZBKj8c.jpg',
          title: "Глобальне оновлення сайту HappyLink",
          author: "HAPPYLINK",
          date: "10.06.2026",
          expanded: false,
          text: [
            `Ми повністю оновили наш сайт! ✨<br><br>Тепер HappyLink має ще більш сучасний дизайн, працює значно швидше та пропонує нові зручні функції для всіх наших клієнтів. Ми переробили дизайн магазину, сторінку тарифів та блок питань-відповідей, щоб ви могли легко знаходити потрібну інформацію та замовляти обладнання в кілька кліків.<br><br>Ми постійно вдосконалюємось, щоб зробити наше обслуговування максимально комфортним для вас. Дякуємо, що ви з нами!`
          ]
        },
        {
          id: 1,
          img: '',
          title: "Шановні клієнти! Зміна тарифів",
          author: "HAPPYLINK",
          date: "06.12.2024",
          expanded: false,
          text: [
            `Ми завжди прагнемо забезпечити вас якісним і надійним інтернет-зв’язком. Наша команда HappyLink постійно інвестує в розвиток інфраструктури, вдосконалення технологій і покращення сервісу.<br><br>Однак, у зв’язку зі зростанням витрат на підтримку мережі та оновлення обладнання, ми змушені переглянути вартість послуг. Це рішення далося нам нелегко, але воно необхідне, щоб і надалі забезпечувати вас стабільним, швидким та безперебійним інтернетом.<br><br>Зміни тарифів вступлять у силу з 1 січня 2025 року. Деталі щодо нових тарифів ви можете знайти на нашому сайті або звернутися до служби підтримки.<br><br>Ми вдячні вам за розуміння і довіру до HappyLink. Наша мета — залишатися вашим надійним партнером у світі зв’язку та технологій.<br><br>З повагою,<br>Команда HappyLink`
          ]
        },
        {
          id: 2,
          img: '',
          title: "Шалений листопад від HAPPYLINK",
          author: "HAPPYLINK",
          date: "01.11.2024",
          expanded: false,
          text: [
            `Підключайте гігабітний інтернет від HAPPYLINK у листопаді та отримайте безкоштовне користування до 1 січня 2025 року! Деталі акції можна знайти у розділі Акції.`
          ]
        }
      ],
      news_en: [
        {
          id: 4,
          img: 'https://happylink.net.ua/assets/cyberspace-3_ZBKj8c.jpg',
          title: "Major HappyLink Website Update",
          author: "HAPPYLINK",
          date: "10.06.2026",
          expanded: false,
          text: [
            `We have completely updated our website! ✨<br><br>HappyLink now features a more modern design, significantly faster loading speeds, and new convenient features for all our customers. We have redesigned the store, tariffs page, and FAQ section so you can easily find the information you need and order equipment in just a few clicks.<br><br>We are constantly improving to make our service as comfortable as possible for you. Thank you for staying with us!`
          ]
        },
        {
          id: 1,
          img: '',
          title: "Dear Customers! Tariff Changes",
          author: "HAPPYLINK",
          date: "06.12.2024",
          expanded: false,
          text: [
            `We always strive to provide you with high-quality and reliable internet connectivity. Our HappyLink team continually invests in infrastructure development, technology improvements, and service enhancements.<br><br>However, due to increasing costs of maintaining the network and upgrading equipment, we are forced to review the pricing of our services starting January 1, 2025. This decision was not easy for us, but it is necessary to continue providing you with stable, fast, and uninterrupted internet access.<br><br>The tariff changes will take effect on January 1, 2025. You can find details about the new tariffs on our website or by contacting our support team.<br><br>We appreciate your understanding and trust in HappyLink. Our goal is to remain your reliable partner in the world of connectivity and technology.<br><br>Sincerely,<br>The HappyLink Team`
          ]
        },
        {
          id: 2,
          img: '',
          title: "November Madness by HAPPYLINK",
          author: "HAPPYLINK",
          date: "01.11.2024",
          expanded: false,
          text: [
            `Connect to HAPPYLINK's gigabit internet in November and enjoy free service until January 1, 2025! Find more details about the promotion in the Promotions section.`
          ]
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
  padding: 60px 0 250px; /* Increased bottom padding to prevent overlapping with footer */
}

.max-width-container {
  max-width: 1200px;
}

/* Featured Card */
.featured-card {
  min-height: 500px;
  position: relative;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 64px rgba(0,0,0,0.2) !important;
}

.featured-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.featured-card:hover .featured-bg {
  transform: scale(1.05);
}

.featured-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(30, 41, 59, 0.95) 0%, rgba(30, 41, 59, 0.4) 100%);
}

.featured-title {
  line-height: 1.2;
  letter-spacing: -0.5px;
}

/* Regular Cards */
.regular-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.05);
}
.regular-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
}

.image-wrapper {
  height: 220px;
  overflow: hidden;
  position: relative;
}
.regular-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
}
.regular-card:hover .regular-img {
  transform: scale(1.08);
}

.accent-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #fed100, #ff9800);
}

/* Текст */
.blog-text p {
  margin-bottom: 0;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ссылка Read More */
.read-more-link {
  color: #1e293b;
  text-decoration: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s ease;
}
.read-more-link:hover {
  color: #b45309;
}
.read-more-link .v-icon {
  transition: transform 0.2s ease;
}
.read-more-link:hover .v-icon {
  transform: translateX(4px);
}

/* Адаптив */
@media (max-width: 959px) {
  .featured-card {
    min-height: 400px;
  }
  .featured-overlay {
    background: linear-gradient(to bottom, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.95) 100%);
  }
  .featured-content {
    padding: 32px !important;
  }
}
</style>