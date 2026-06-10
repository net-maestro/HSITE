<!-- Faq.vue -->
<template>
  <div class="faq-section">
    <h2 class="hl-section-title">
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
              class="faq-panel card-hover card-animate mb-4"
              :data-aos="animated ? 'fade-up' : null"
              :data-aos-delay="index * 100"
            >
              <v-expansion-panel-title class="faq-title" expand-icon="">
                <template v-slot:default="{ expanded }">
                  <div class="d-flex justify-space-between align-center w-100">
                    <span class="question-text">{{ item.question }}</span>
                    <v-icon :class="{ 'icon-rotated': expanded }" color="secondary" size="large">
                      mdi-plus
                    </v-icon>
                  </div>
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




/* Панели */
.faq-panels {
  width: 100%;
}

.faq-panel {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 24px !important;
  overflow: hidden;
  margin-bottom: 24px !important;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 10px 30px rgba(0,0,0,0.03) !important;
}

.faq-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.06) !important;
}

/* Заголовок вопроса */
.faq-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
  padding: 24px 32px !important;
  background: transparent;
}

.faq-title :deep(.v-expansion-panel-title__overlay) {
  opacity: 0;
}

.question-text {
  flex-grow: 1;
  padding-right: 16px;
}

.icon-rotated {
  transform: rotate(45deg);
  color: #e91e63 !important;
}

/* Ответ */
.faq-answer {
  padding: 0 32px 24px 32px !important;
  font-size: 1rem;
  line-height: 1.7;
  color: #475569;
  background: transparent;
}

/* Адаптив */
@media (max-width: 600px) {
  

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