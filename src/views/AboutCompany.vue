<!-- AboutCompany.vue -->
<template>
  <div class="about-section">
    <h2 class="section-title">
      {{ $t('menu.about') }}
    </h2>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="10"
          lg="8"
          xl="8"
          :data-aos="animated ? 'fade-up' : null"
        >
          <v-card
            class="about-card card-hover card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса слева -->
            <div class="accent-bar"></div>

            <v-row class="align-start" no-gutters>
              <!-- Изображение -->
              <v-col
                cols="12"
                md="5"
                class="d-flex align-center justify-center py-5 py-md-6 px-4 px-md-4"
              >
                <img
                  src="@/assets/about-company/cyberspace.jpg"
                  alt="HappyLink — надійний інтернет та домофонія"
                  class="about-image"
                />
              </v-col>

              <!-- Текст -->
              <v-col
                cols="12"
                md="7"
                class="py-5 py-md-6 px-4 px-md-6"
              >
                <div class="about-content text-body-1" v-html="localizedText"></div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutCompany",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      text_ua: `
        <p>
          Компанія <strong>HappyLink</strong> надає доступ до мережі інтернет за технологією FTTB (Fiber to the Building) та PON (Passive Optical Network).<br>
          Також ми виконуємо роботи з монтажу та обслуговування систем домофонії та контролю доступу.
        </p>
        <h4 class="about-subtitle">Наші переваги:</h4>
        <ul class="about-list">
          <li>швидка реакція на звернення абонентів та виклики сьогодення (всі комутатори в нас повністю запущені також ми активно розбудовуємо мережу PON);</li>
          <li>найбільша швидкість доступу – до 1000 Мбіт/сек;</li>
          <li>стабільність і надійність зв’язку;</li>
          <li>безкоштовний виклик майстра;</li>
          <li>доступні ціни.</li>
        </ul>
        <h4 class="about-subtitle">Документи:</h4>
        <ul class="about-list">
          <li><a href="/static/files/pub_ofert.pdf" target="_blank" class="internal-link">Публічний договір</a></li>
          <li><a href="/static/files/pub_ofert_intercom.pdf" target="_blank" class="internal-link">Договір домофон</a></li>
        </ul>
      `,
      text_en: `
        <p>
          The company <strong>HappyLink</strong> provides access to the internet using FTTB (Fiber to the Building) and PON (Passive Optical Network) technologies.<br>
          We also perform installation and maintenance of intercom systems and access control.
        </p>
        <h4 class="about-subtitle">Our advantages:</h4>
        <ul class="about-list">
          <li>quick response to subscriber requests and today's challenges (all switches are fully operational, and we are actively expanding the PON network);</li>
          <li>the highest access speed - up to 1000 Mbps;</li>
          <li>stability and reliability of the connection;</li>
          <li>free technician visits;</li>
          <li>affordable prices.</li>
        </ul>
        <h4 class="about-subtitle">Documents:</h4>
        <ul class="about-list">
          <li><a href="/static/files/pub_ofert.pdf" target="_blank" class="internal-link">Public contract</a></li>
          <li><a href="/static/files/pub_ofert_intercom.pdf" target="_blank" class="internal-link">Intercom contract</a></li>
        </ul>
      `,
    };
  },
  computed: {
    localizedText() {
      return this.$i18n.locale === 'ua' ? this.text_ua : this.text_en;
    }
  }
};
</script>

<style scoped>
.about-section {
  padding: 48px 0;
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

.about-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

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

.about-image {
  max-width: 100%;
  height: auto;
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.about-image:hover {
  transform: scale(1.02);
}

.about-content {
  line-height: 1.7;
  color: #424242;
}

.about-content h4.about-subtitle {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 24px 0 12px;
}

.about-content ul.about-list {
  padding-left: 24px;
  margin-bottom: 20px;
  line-height: 1.6;
}

.about-content ul.about-list li {
  margin-bottom: 10px;
}

.about-content ul.about-list li::before {
  content: "•";
  color: #26A69A;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.about-content a.internal-link {
  color: #26A69A;
  text-decoration: none;
  border-bottom: 1px dashed #26A69A;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.about-content a.internal-link:hover {
  background-color: #e8f5f3;
  border-bottom-style: solid;
}

/* Адаптивность — улучшенная логика */
@media (max-width: 960px) {
  .about-card {
    border-radius: 16px;
  }

  .about-image {
    max-height: 280px;
    border-radius: 10px;
  }

  .about-content h4.about-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 1.35rem;
    margin-bottom: 32px;
  }

  .about-image {
    max-height: 240px;
    border-radius: 8px;
  }

  .about-content {
    font-size: 0.95rem;
  }

  .about-content h4.about-subtitle {
    font-size: 1.05rem;
    margin: 20px 0 10px;
  }

  .about-content ul.about-list {
    padding-left: 20px;
  }

  .about-content ul.about-list li {
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 32px 0;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 28px;
  }

  .about-image {
    max-height: 200px;
    border-radius: 6px;
  }

  .about-content {
    font-size: 0.9rem;
    line-height: 1.65;
  }

  .about-content h4.about-subtitle {
    font-size: 1rem;
    margin: 18px 0 8px;
  }

  .about-content ul.about-list {
    padding-left: 18px;
  }
}
</style>