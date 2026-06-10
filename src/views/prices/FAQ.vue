<!-- Faq.vue -->
<template>
  <div class="faq-section">
    <h2 class="section-title">
      {{ $t('faq.title') }}
    </h2>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-expansion-panels
            v-model="panel"
            variant="accordion"
            elevation="0"
            class="faq-panels"
          >
            <v-expansion-panel
              v-for="(item, index) in faqItems"
              :key="item.key"
              class="faq-panel card-hover card-animate"
              :data-aos="animated ? 'fade-up' : null"
              :data-aos-delay="index * 100"
            >
              <!-- Акцентная полоса слева -->
              <div class="accent-bar"></div>

              <v-expansion-panel-title class="faq-title">
                <template v-slot:default="{ expanded }">
                  <span class="question-text">{{ item.question }}</span>
                </template>
              </v-expansion-panel-title>

              <v-expansion-panel-text class="faq-answer">
                {{ item.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Faq",
  props: {
    animated: { type: Boolean, default: true }
  },
  data() {
    return {
      panel: null, // только один открытый (accordion)
      faqItems: [
        {
          key: "internetSpeed",
          question: "Яка швидкість інтернету доступна у моєму будинку?",
          answer: "Ми пропонуємо тарифи зі швидкістю до 1000 Мбіт/сек за технологією PON. Точну доступну швидкість можна дізнатися за вашою адресою через нашу службу підтримки або на сторінці «Карта покриття»."
        },
        {
          key: "connectionTime",
          question: "Скільки часу займає підключення?",
          answer: "Підключення зазвичай відбувається протягом 1–3 робочих днів після оформлення заявки. У більшості випадків ми встигаємо підключити вас ще швидше — іноді навіть наступного дня!"
        },
        {
          key: "techSupport",
          question: "Чи працює техпідтримка цілодобово?",
          answer: "Так! Наша служба підтримки доступна 24/7 без вихідних. Ви можете зателефонувати, написати у чат або залишити звернення на сайті — ми завжди на зв’язку."
        }
      ]
    };
  }
};
</script>

<style scoped>
.faq-section {
  padding: 40px 0;
}

/* Заголовок секции — как в Blog.vue */
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

/* Панели */
.faq-panels {
  width: 100%;
}

.faq-panel {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 16px !important;
  overflow: hidden;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.faq-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентная полоса слева — как в Blog.vue */
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

/* Заголовок вопроса */
.faq-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  padding: 18px 24px 18px 32px !important; /* отступ слева больше из-за accent-bar */
  background: transparent;
}

.faq-title :deep(.v-expansion-panel-title__overlay) {
  opacity: 0;
}

/* Ответ */
.faq-answer {
  padding: 0 24px 20px 32px !important;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #424242;
  background: transparent;
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .faq-title {
    font-size: 1rem;
    padding: 16px 20px 16px 28px !important;
  }

  .faq-answer {
    padding: 0 20px 16px 28px !important;
    font-size: 0.9rem;
  }

  .faq-panel {
    border-radius: 12px !important;
  }
}
</style>