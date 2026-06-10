<!-- Services.vue -->
<template>
  <div class="services-section">
    <h2 class="hl-section-title">
      {{ $t("menu.service") }}
    </h2>

    <!-- Категории как кнопки -->
    <div class="categories-bar mb-6 d-flex justify-center align-center gap-4">
      <button
        v-for="(category, index) in localizedCategories"
        :key="index"
        :class="['category-btn', { active: selectedTab === index }]"
        @click="selectedTab = index"
      >
        {{ category }}
      </button>
    </div>

    <v-container>
      <!-- Карточки услуг -->
      <v-row>
        <v-col
          v-for="(service, index) in filteredItems"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 50"
        >
          <v-card
            class="service-card card-hover card-animate"
            elevation="0"
            rounded="xl"
          >
            <v-card-title class="pa-5">
              <v-avatar
                class="service-avatar"
                size="64"
                rounded="lg"
              >
                <v-img :src="service.img" cover />
              </v-avatar>

              <div class="service-info ml-4">
                <h3 class="service-title text-h6 font-weight-bold mb-1">
                  {{ service.title }}
                </h3>
                <p class="service-description text-body-2 text-grey-darken-1 mb-2">
                  {{ service.description }}
                </p>
                <div class="service-price font-weight-bold" style="color: #b38800;">
                  {{ service.price }}
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Services",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      selectedTab: 0,
      categories: {
        ua: ["ІНТЕРНЕТ", "ІНШЕ", "ВСІ ПОСЛУГИ"],
        en: ["INTERNET", "OTHER", "ALL SERVICES"],
      },
      services: {
        ua: [
          {
            title: "Виклик майстра",
            category: "Інше",
            description: "Виклик фахівця для консультації.",
            price: "Безкоштовно",
            img: "http://happylink.net.ua/static/internet-service/master.svg",
          },
          {
            title: "Налаштування пристроїв",
            category: "Інтернет",
            description: "Виклик спеціаліста для налаштування роутера, смарт телевізора, медіаплеєра",
            price: "від 160 ₴",
            img: "http://happylink.net.ua/static/internet-service/router.svg",
          },
          {
            title: "Провід по квартирі",
            category: "Інше",
            description: "провід по квартирі без прокладання",
            price: "від 15 ₴/метр",
            img: "http://happylink.net.ua/static/internet-service/cable.svg",
          },
          {
            title: "Встановлення інтернет розетки",
            category: "Інтернет",
            description: "Встановлення комп'ютерної розетки RJ-45",
            price: "від 80 ₴",
            img: "http://happylink.net.ua/static/internet-service/socket.svg",
          },
          {
            title: "IP‐адреса",
            category: "Інтернет",
            description: "Cтатична IP-адреса",
            price: "75 ₴/30 дн.",
            img: "http://happylink.net.ua/static/internet-service/ip.svg",
          },
          {
            title: "Налаштування мережевої карти",
            category: "Інтернет",
            description: "Встановлення та налаштування Ethernet-адаптера",
            price: "від 149 ₴",
            img: "http://happylink.net.ua/static/internet-service/network_adapter.svg",
          },
          {
            title: "Пробивання отворів",
            category: "Інше",
            description:
              "Буріння отворів окрім двух передбачених при стандартному підключенні",
            price: "30 ₴/шт.",
            img: "http://happylink.net.ua/static/internet-service/drill.svg",
          },
          {
            title: "Додатковий патчкорд",
            category: "Інтернет",
            description: "до 5 метрів",
            price: "80 ₴/шт.",
            img: "http://happylink.net.ua/static/internet-service/ethernet_patch.svg",
          },
          {
            title: "Заміна конектора",
            category: "Інтернет",
            description: "обжимання додаткових коннекторів RJ-45",
            price: "30 ₴",
            img: "http://happylink.net.ua/static/internet-service/connector.svg",
          },
          {
            title: "Встановлення драйверів",
            category: "Інтернет",
            description:
              "Встановлення драйверів, програм пов'язанних з обладнанням або послугами.",
            price: "від 150 ₴",
            img: "http://happylink.net.ua/static/internet-service/driver_installation.svg",
          },
        ],
        en: [
          {
            title: "Master Call",
            category: "Other",
            description: "Call a specialist for consultation.",
            price: "Free",
            img: "http://happylink.net.ua/static/internet-service/master.svg",
          },
          {
            title: "Device Setup",
            category: "Internet",
            description: "Call a specialist to set up a router, smart TV, media player.",
            price: "from 160 ₴",
            img: "http://happylink.net.ua/static/internet-service/router.svg",
          },
          {
            title: "Wiring in Apartment",
            category: "Other",
            description: "Wiring in the apartment without installation.",
            price: "from 15 ₴/meter",
            img: "http://happylink.net.ua/static/internet-service/cable.svg",
          },
          {
            title: "Internet Socket Installation",
            category: "Internet",
            description: "Installation of an RJ-45 computer socket.",
            price: "from 80 ₴",
            img: "http://happylink.net.ua/static/internet-service/socket.svg",
          },
          {
            title: "IP Address",
            category: "Internet",
            description: "Static IP address.",
            price: "75 ₴/30 days",
            img: "http://happylink.net.ua/static/internet-service/ip.svg",
          },
          {
            title: "Network Card Setup",
            category: "Internet",
            description: "Installation and configuration of an Ethernet adapter.",
            price: "from 149 ₴",
            img: "http://happylink.net.ua/static/internet-service/network_adapter.svg",
          },
          {
            title: "Hole Drilling",
            category: "Other",
            description:
              "Drilling additional holes beyond the two provided with standard installation.",
            price: "30 ₴/each",
            img: "http://happylink.net.ua/static/internet-service/drill.svg",
          },
          {
            title: "Additional Patch Cord",
            category: "Internet",
            description: "Up to 5 meters.",
            price: "80 ₴/each",
            img: "http://happylink.net.ua/static/internet-service/ethernet_patch.svg",
          },
          {
            title: "Connector Replacement",
            category: "Internet",
            description: "Crimping additional RJ-45 connectors.",
            price: "30 ₴",
            img: "http://happylink.net.ua/static/internet-service/connector.svg",
          },
          {
            title: "Driver Installation",
            category: "Internet",
            description:
              "Installing drivers or software related to equipment or services.",
            price: "from 150 ₴",
            img: "http://happylink.net.ua/static/internet-service/driver_installation.svg",
          },
        ],
      },
    };
  },
  computed: {
    localizedCategories() {
      const locale = this.$i18n.locale;
      return this.categories[locale] || this.categories["en"];
    },
    localizedServices() {
      const locale = this.$i18n.locale;
      return this.services[locale] || this.services["en"];
    },
    filteredItems() {
      if (this.selectedTab === 2) return this.localizedServices;

      const selectedCategory = this.localizedCategories[this.selectedTab];
      // Приводим к нижнему регистру для сравнения
      const normalizedCategory = selectedCategory.toLowerCase();

      return this.localizedServices.filter(item => {
        return item.category.toLowerCase() === normalizedCategory;
      });
    },
  },
};
</script>

<style scoped>
.services-section {
  padding: 40px 0;
}





/* Панель категорий */
.categories-bar {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.category-btn {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #424242;
  background: transparent;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.875rem;
}

.category-btn:hover {
  color: #b38800;
}

.category-btn.active {
  color: #b38800;
  font-weight: 700;
}

.category-btn.active::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #fed100;
  border-radius: 1px;
}

/* Карточка услуги */
.service-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.service-avatar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.service-avatar:hover {
  transform: scale(1.05);
}

.service-info {
  flex: 1;
}

.service-title {
  color: #2c3e50;
  line-height: 1.3;
}

.service-description {
  line-height: 1.5;
}

/* Адаптив */
@media (max-width: 600px) {
  

  .categories-bar {
    gap: 12px;
  }

  .category-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .service-card .v-card-title {
    flex-direction: column;
    align-items: flex-start;
  }

  .service-avatar {
    margin-bottom: 16px;
  }

  .service-info {
    margin-left: 0 !important;
    width: 100%;
  }
}
</style>