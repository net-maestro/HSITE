<!-- Documents.vue -->
<template>
  <div class="documents-section">
    <h2 class="section-title">
      {{ $t('footer.docs') }}
    </h2>

    <v-container>
      <!-- Фільтр за категоріями -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" class="text-center">
          <v-btn-toggle
            v-model="activeCategory"
            mandatory
            variant="outlined"
            rounded="pill"
            color="blue"
            class="category-toggle"
          >
            <v-btn
              v-for="cat in categories"
              :key="cat.value"
              :value="cat.value"
              size="small"
              class="text-none px-4"
            >
              {{ cat.label }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <!-- Сітка документів: 1 колонка на моб., 2 на десктопі -->
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
          v-for="(doc, index) in filteredDocuments"
          :key="doc.id"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 100"
        >
          <v-card
            class="document-card card-hover pa-6 card-animate h-100 d-flex flex-column"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентна полоса зліва -->
            <div class="accent-bar"></div>

            <!-- Бейдж категорії -->
            <v-chip
              size="small"
              :color="getCategoryColor(doc.category)"
              variant="tonal"
              class="mb-3 align-self-start"
            >
              {{ getCategoryLabel(doc.category) }}
            </v-chip>

            <!-- Заголовок -->
            <h3 class="document-title text-h6 font-weight-bold mb-3 d-flex align-center">
              <v-icon
                icon="mdi-file-document"
                size="large"
                color="blue-darken-2"
                class="me-3"
              ></v-icon>
              {{ doc.title }}
            </h3>

            <!-- Опис -->
            <div class="document-description text-body-2 text-grey-darken-1 mb-4 flex-grow-1">
              {{ doc.description }}
            </div>

            <v-divider class="mb-4"></v-divider>

            <!-- Кнопки дій -->
            <div class="d-flex flex-wrap gap-3 mt-auto">
              <v-btn
                prepend-icon="mdi-open-in-new"
                color="blue"
                variant="tonal"
                :href="doc.file"
                target="_blank"
                class="text-none flex-grow-1"
              >
                {{ $t('documents.view') }}
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Повідомлення, якщо нічого не знайдено -->
      <v-row v-if="filteredDocuments.length === 0" justify="center">
        <v-col cols="12" class="text-center py-8">
          <v-icon size="large" color="grey" class="mb-2">mdi-file-remove</v-icon>
          <p class="text-grey-darken-1">{{ $t('documents.noDocuments') }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Documents',
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { value: 'all', label: this.$t('documents.all') || 'Всі' },
        { value: 'contracts', label: this.$t('documents.contracts') || 'Договори' },
        { value: 'reports', label: this.$t('documents.reports') || 'Звітність' }
      ],
      documents_ua: [
        {
          id: 1,
          category: 'contracts',
          title: "Публічний договір надання послуг доступу до Інтернету",
          description: "Ознайомтеся з умовами користування послугами HappyLink. Дійсний для всіх абонентів.",
          file: "https://happylink.net.ua/static/files/pub_ofert.pdf",
          filename: "pub_ofert.pdf"
        },
        {
          id: 2,
          category: 'contracts',
          title: "Договір на надання послуг домофонії",
          description: "Умови підключення та обслуговування системи домофону у вашому будинку.",
          file: "https://happylink.net.ua/static/files/pub_ofert_intercom.pdf",
          filename: "pub_ofert_intercom.pdf"
        },
        {
          id: 3,
          category: 'reports',
          title: "Замір якості послуг доступу до Інтернету за 2025 рік",
          description: "Звіт про результати вимірювання швидкості та якості надання послуг доступу до Інтернету відповідно до вимог НКЕК.",
          file: "https://happylink.net.ua/static/files/zamir_jakosti25.pdf",
          filename: "zamir_jakosti25.pdf"
        },
      ],
      documents_en: [
        {
          id: 1,
          category: 'contracts',
          title: "Public Contract for Internet Access Services",
          description: "Review the terms of using HappyLink services. Valid for all subscribers.",
          file: "https://happylink.net.ua/static/files/pub_ofert.pdf",
          filename: "pub_ofert.pdf"
        },
        {
          id: 2,
          category: 'contracts',
          title: "Intercom Services Agreement",
          description: "Terms for connecting and maintaining the intercom system in your building.",
          file: "https://happylink.net.ua/static/files/pub_ofert_intercom.pdf",
          filename: "pub_ofert_intercom.pdf"
        },
        {
          id: 3,
          category: 'reports',
          title: "Internet Access Service Quality Measurement Report 2025",
          description: "Report on speed and quality measurements of Internet access services in compliance with NCEP requirements.",
          file: "https://happylink.net.ua/static/files/zamir_jakosti25.pdf",
          filename: "zamir_jakosti25.pdf"
        },
      ]
    };
  },
  computed: {
    localizedDocuments() {
      return this.$i18n.locale === 'ua' ? this.documents_ua : this.documents_en;
    },
    filteredDocuments() {
      if (this.activeCategory === 'all') {
        return this.localizedDocuments;
      }
      return this.localizedDocuments.filter(doc => doc.category === this.activeCategory);
    }
  },
  methods: {
    getCategoryColor(category) {
      const colors = {
        contracts: 'blue',
        reports: 'green'
      };
      return colors[category] || 'grey';
    },
    getCategoryLabel(category) {
      const labels = {
        contracts: this.$t('documents.contracts') || 'Договори',
        reports: this.$t('documents.reports') || 'Звітність'
      };
      return labels[category] || category;
    }
  }
};
</script>

<style scoped>
.documents-section {
  padding: 40px 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
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

.category-toggle {
  display: inline-flex;
  border: 1px solid #e0e0e0;
}

.category-toggle :deep(.v-btn) {
  border-color: transparent !important;
}

.category-toggle :deep(.v-btn.v-btn--active) {
  border-color: #1976d2 !important;
  background-color: #1976d2 !important;
  color: white !important;
}

.document-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.document-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентна полоса зліва */
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

.document-title {
  color: #2c3e50;
  line-height: 1.3;
}

.document-description {
  line-height: 1.6;
  color: #546e7a;
}

/* Адаптив */
@media (max-width: 960px) {
  .document-card {
    margin-bottom: 16px;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .document-card {
    padding: 16px !important;
  }

  .document-title {
    font-size: 1.1rem;
  }

  .document-description {
    font-size: 0.9rem;
  }

  .category-toggle :deep(.v-btn) {
    padding: 0 12px;
    font-size: 0.85rem;
  }
}

/* Utility: gap for flex containers */
.gap-3 {
  gap: 12px;
}
</style>