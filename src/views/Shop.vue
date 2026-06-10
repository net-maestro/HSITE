<template>
  <div class="equipment-section">
    <h2 class="section-title">
      {{ $t("menu.recommendet-equipment") }}
    </h2>

    <!-- Сортировка через чипы -->
    <div class="sort-chips d-flex justify-center flex-wrap gap-2 mb-4">
      <v-chip
        v-for="option in sortOptions"
        :key="option"
        :color="selectedSortOption === option ? '#fed100' : 'grey-lighten-3'"
        :text-color="selectedSortOption === option ? '#b38800' : 'grey-darken-2'"
        variant="flat"
        @click="selectedSortOption = option"
        class="sort-chip"
      >
        {{ option }}
      </v-chip>
    </div>

    <!-- Категории как кнопки -->
    <div class="categories-bar mb-6 d-flex justify-center align-center gap-4 flex-wrap">
      <button
        v-for="(category, index) in categoriesList"
        :key="index"
        :class="['category-btn', { active: selectedCategory === category }]"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <v-container>
      <!-- Список оборудования -->
      <v-row>
        <v-col
          v-for="(item, index) in sortedAndFilteredItems"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          :data-aos="animated ? 'fade-up' : null"
          :data-aos-delay="index * 50"
          class="equipment-col"
        >
          <v-card
            class="equipment-card card-hover pa-4 card-animate"
            elevation="0"
            rounded="xl"
            @click="onCardClick(item)"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar"></div>

            <!-- Название и категория -->
            <v-card-title class="equipment-title text-h6 font-weight-bold mb-1 pa-0">
              {{ item.name }}
            </v-card-title>
            <v-card-subtitle class="equipment-category text-body-2 text-grey-darken-1 pa-0 mb-3">
              {{ item.category }}
            </v-card-subtitle>

            <!-- Изображение — всегда сверху -->
            <div class="image-container mb-3">
              <div class="image-wrapper rounded-lg">
                <v-img
                  :src="getCurrentImage(item)"
                  :alt="item.name"
                  aspect-ratio="4/3"
                  class="equipment-image"
                  style="background-color: #f9f9f9;"
                  cover
                ></v-img>
                <!-- Плавный фейд-эффект при переключении -->
                <div class="image-fade"></div>
              </div>

              <!-- Галерея: только индикаторы (без стрелок) -->
              <div v-if="item.images" class="gallery-indicators-wrapper">
                <div class="gallery-indicators">
                  <button 
                    v-for="(img, idx) in item.images" 
                    :key="idx"
                    :class="['indicator', { active: item._currentImageIndex === idx }]"
                    @click.stop="goToImage(item, idx)"
                    :aria-label="`Фото ${idx + 1}`"
                  >
                    <span class="indicator-dot"></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Рейтинг -->
            <div class="text-center mb-3">
              <v-rating
                v-model="item.rating"
                active-color="#FFC107"
                color="#E0E0E0"
                size="small"
                readonly
                density="comfortable"
              ></v-rating>
            </div>

            <!-- Цена -->
            <div class="equipment-price text-h5 font-weight-bold mb-3" style="color: #b38800; text-align: center;">
              {{ item.price }} ₴
            </div>

            <!-- Характеристики — ВСЕГДА видны -->
            <div class="equipment-specs text-body-2 mb-4" v-html="item.Info"></div>

            <!-- Кнопка заказа -->
            <v-card-actions class="justify-center pa-0">
              <RequestForm
                :FormData="`${item.name}. Ціна: ${item.price} ₴`"
                :ButtonTitle="$t('prices.to-buy')"
                :ButtonColor="'#2c3e50'"
                :ButtonIcon="'mdi-cart-outline'"
                size="small"
                class="request-btn"
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import RequestForm from '@/components/RequestForm.vue';

export default {
  name: "RecommendedEquipment",
  components: { RequestForm },
  props: { 
    animated: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedCategory: "Всі пристрої",
      selectedSortOption: "За рейтингом",
      sortOptions: [
        "За рейтингом",
        "Від дешевих до дорогих",
        "Від дорогих до дешевих"
      ],
      devices: [
        // WI-FI Роутери
        {
          name: "TP-LINK Archer C54",
          category: "WI-FI Роутери",
          price: 1150,
          rating: 4.7,
          img: "https://happylink.net.ua/static/shop/archerc54.jpg",
          Info: `<div class="spec"><span class="spec-title">Стандарт:</span> <span class="spec-value">Wi-Fi 5 (802.11ac)</span></div>
                 <div class="spec"><span class="spec-title">Швидкість:</span> <span class="spec-value">867 Мбіт/с</span></div>
                 <div class="spec"><span class="spec-title">Порти:</span> <span class="spec-value">4×LAN100 Мбіт/с + 1×WAN</span></div>`
        },
        {
          name: "TP-LINK Archer C64",
          category: "WI-FI Роутери",
          price: 1600,
          rating: 4.3,
          img: "https://happylink.net.ua/static/shop/archerc64.jpg",
          Info: `<div class="spec"><span class="spec-title">Стандарт:</span> <span class="spec-value">Wi-Fi 5 (802.11ac)</span></div>
                 <div class="spec"><span class="spec-title">Швидкість:</span> <span class="spec-value">1267 Мбіт/с</span></div>
                 <div class="spec"><span class="spec-title">Порти:</span> <span class="spec-value">4×LAN100 Мбіт/с + 1×WAN</span></div>`
        },
        {
          name: "TP-LINK Archer AX20",
          category: "WI-FI Роутери",
          price: 2999,
          rating: 4.8,
          img: "https://happylink.net.ua/static/shop/ax20.jpg",
          Info: `<div class="spec"><span class="spec-title">Стандарт:</span> <span class="spec-value">WiFi 6 (802.11 g/n/ac/ax)</span></div>
                 <div class="spec"><span class="spec-title">Швидкість:</span> <span class="spec-value">1800 Мбіт/с</span></div>
                 <div class="spec"><span class="spec-title">Порти:</span> <span class="spec-value">4×LAN1000 Мбіт/с + 1×WAN</span></div>`
        },
        // PON термінали
        {
          name: "Абонентський термінал Foxgate XPON ONU",
          category: "PON",
          price: 700,
          rating: 4.6,
          img: "https://happylink.net.ua/static/shop/foxgate-onu.jpg",
          Info: `<div class="spec"><span class="spec-title">Стандарти:</span> <span class="spec-value">EPON (802.3ah), GPON (ITU-T G.984.2)</span></div>
<div class="spec"><span class="spec-title">Порти:</span> <span class="spec-value">1×Gigabit Ethernet (10/100/1000 Mbps), 1× оптичний SC/UPC</span></div>
<div class="spec"><span class="spec-title">Корпус:</span> <span class="spec-value">Компактний, для будь-якого інтер'єру</span></div>`
        },
        {
  name: "Абонентський термінал Foxgate XG-PON ONU XG3102R",
  category: "PON",
  price: 2500,
  rating: 4.8,
  img: "https://happylink.net.ua/static/shop/foxgate-xg-pon-onu-xg3102r-1.jpg",
  Info: `<div class="spec"><span class="spec-title">Стандарт:</span> <span class="spec-value">XG-PON (ITU-T G.987)</span></div>
<div class="spec"><span class="spec-title">Порти:</span> <span class="spec-value">1×10GE, 1×GE (RJ45), 1×SC/UPC</span></div>
<div class="spec"><span class="spec-title">Швидкість:</span> <span class="spec-value">до 10 Гбіт/с (Downstream), до 2.5 Гбіт/с (Upstream)</span></div>
<div class="spec"><span class="spec-title">Режим роботи:</span> <span class="spec-value">Bridge (міст)</span></div>
<div class="spec"><span class="spec-title">Мережеві функції:</span> <span class="spec-value">VLAN, IGMP Snooping, QoS, DBA, Loop Detection</span></div>
<div class="spec"><span class="spec-title">Керування:</span> <span class="spec-value">WEB, Telnet, SSH, OMCI</span></div>
<div class="spec"><span class="spec-title">Дальність зв'язку:</span> <span class="spec-value">до 20 км</span></div>
<div class="spec"><span class="spec-title">Монтаж:</span> <span class="spec-value">настільний або настінний</span></div>`
},
{
  name: "Абонентський термінал C-DATA XGS/XG-PON ONU FD511T-R460S",
  category: "PON",
  price: 2400,
  rating: 4.8,
  img: "https://happylink.net.ua/static/shop/c-data-xg-xgs-pon-onu-fd511t-r460s-1.jpg",
  Info: `<div class="spec"><span class="spec-title">Стандарти:</span> <span class="spec-value">XGS-PON / XG-PON (FSAN G.9807.1)</span></div>
<div class="spec"><span class="spec-title">Порти:</span> <span class="spec-value">1×10GE (RJ45), 1×SC/UPC</span></div>
<div class="spec"><span class="spec-title">Швидкість:</span> <span class="spec-value">до 10 Гбіт/с (XGS-PON) або 10/2.5 Гбіт/с (XG-PON)</span></div>
<div class="spec"><span class="spec-title">Сумісність:</span> <span class="spec-value">Huawei, ZTE та інші XG/XGS-PON OLT</span></div>
<div class="spec"><span class="spec-title">Оптичний бюджет:</span> <span class="spec-value">TX +4...+9 dBm, RX до -28 dBm</span></div>
<div class="spec"><span class="spec-title">LAN-порт:</span> <span class="spec-value">1×10 Gigabit Ethernet</span></div>
<div class="spec"><span class="spec-title">Енергоспоживання:</span> <span class="spec-value">до 8.1 Вт</span></div>`
},
        // Mini UPS
        {
          name: "Mini UPS 12V 5A",
          category: "Mini UPS Для Роутерів",
          price: 1499,
          rating: 4.2,
          img: "https://via.placeholder.com/300x200?text=Mini+UPS",
          Info: `<div class="spec"><span class="spec-title">Напруга:</span> <span class="spec-value">12V</span></div>
                 <div class="spec"><span class="spec-title">Струм:</span> <span class="spec-value">5A</span></div>
                 <div class="spec"><span class="spec-title">Час роботи:</span> <span class="spec-value">до 8 годин</span></div>`
        },
        // IPTV
        {
          name: "Sweet.TV Box",
          category: "IPTV-Обладнання",
          price: 1799,
          rating: 4.7,
          img: "https://sweet-tv-static.sweet.tv/web/img/LP/inext/tv_free.png",
          Info: `<div class="spec"><span class="spec-title">Операційна система:</span> <span class="spec-value">Android 10</span></div>
                 <div class="spec"><span class="spec-title">Пам'ять:</span> <span class="spec-value">2 ГБ RAM, 8 ГБ ROM</span></div>
                 <div class="spec"><span class="spec-title">Канали:</span> <span class="spec-value">300+ каналів</span></div>`
        },
        // Кабель
        {
          name: "Кабель UTP Cat 5e CCA",
          category: "Кабель",
          price: '15/м',
          rating: 4,
          img: "https://via.placeholder.com/300x200?text=Cat5e+CCA",
          Info: `<div class="spec"><span class="spec-title">Тип:</span> <span class="spec-value">UTP Cat 5e CCA</span></div>
<div class="spec"><span class="spec-title">Матеріал:</span> <span class="spec-value">Алюміній, покритий міддю (CCA)</span></div>
<div class="spec"><span class="spec-title">Екранування:</span> <span class="spec-value">Немає (UTP)</span></div>`
        },

        // Кабель UTP Cat 5e CU (новий айтем)
        {
          name: "Кабель UTP Cat 5e CU",
          category: "Кабель",
          price: '25/м',
          rating: 4.1,
          img: "https://via.placeholder.com/300x200?text=Cat5e+CU",
          Info: `<div class="spec"><span class="spec-title">Тип:</span> <span class="spec-value">UTP Cat 5e CU</span></div>
<div class="spec"><span class="spec-title">Матеріал:</span> <span class="spec-value">Чиста мідь (CU)</span></div>
<div class="spec"><span class="spec-title">Екранування:</span> <span class="spec-value">Немає (UTP)</span></div>`
        },
        // PoE
        {
          name: "Комплект Gigabit Passive PoE (Інжектор + Сплітер)",
          category: "PoE обладнання",
          price: 400,
          rating: 4.8,
          img: "https://happylink.net.ua/static/shop/poe-1.jpg",
          Info: `<div class="spec"><span class="spec-title">Швидкість Ethernet:</span> <span class="spec-value">10/100/1000 Мбіт/с</span></div>
<div class="spec"><span class="spec-title">Живлення:</span> <span class="spec-value">DC 9-56В, макс. 2А (піни 4,5/7,8)</span></div>
<div class="spec"><span class="spec-title">Роз'єм живлення:</span> <span class="spec-value">5.5×2.1 мм</span></div>
<div class="spec"><span class="spec-title">Дальність:</span> <span class="spec-value">до 250 м</span></div>
<div class="spec"><span class="spec-title">Комплектація:</span> <span class="spec-value">PoE інжектор + PoE сплітер (БЖ не входить)</span></div>
<div class="spec"><span class="spec-title">Призначення:</span> <span class="spec-value">Для точок доступу, маршрутизаторів, комутаторів, IP-телефонів, камер</span></div>`
        },
        {
          name: "PoE Інжектор Gigabit Passive",
          category: "PoE обладнання",
          price: 400,
          rating: 4.8,
          img: "https://happylink.net.ua/static/shop/poe-2.jpg",
          Info: `<div class="spec"><span class="spec-title">Тип:</span> <span class="spec-value">Інжектор</span></div>
<div class="spec"><span class="spec-title">Швидкість LAN:</span> <span class="spec-value">100/1000 Мбіт/с</span></div>
<div class="spec"><span class="spec-title">Вихідна напруга:</span> <span class="spec-value">48 В</span></div>
<div class="spec"><span class="spec-title">Роз'єми:</span> <span class="spec-value">2 × RJ45</span></div>
<div class="spec"><span class="spec-title">Піни живлення:</span> <span class="spec-value">4,5/7,8</span></div>`
        },
        // Домофоны с галереей
        {
          name: "Універсальний адаптер Neolight",
          category: "Домофони",
          price: 360,
          rating: 4.4,
          images: [
            "https://happylink.net.ua/static/shop/video_kit_1_1.jpg",
            "https://happylink.net.ua/static/shop/video_kit_1_2.jpg",
          ],
          _currentImageIndex: 0,
          Info: `<div class="spec"><span class="spec-title">Адаптер:</span> <span class="spec-value">для підключення аналогових домофонів до системи Vizit. </span></div>`
        },
        {
  name: "Трубка для домофону Cyfral SMART-U",
  category: "Домофони",
  price: 600,
  rating: 5,
  images: [
    "https://happylink.net.ua/static/shop/Cyfral Smart-U_1.webp",
    "https://happylink.net.ua/static/shop/Cyfral Smart-U_2.webp",
  ],
  _currentImageIndex: 0,
  Info: `
    <div class="spec">
      <span class="spec-title">Опис:</span>
      <span class="spec-value">
        Настінна трубка для домофону Cyfral SMART-U (Біла) з регулюванням гучності.
      </span>
    </div>

    <div class="spec">
      <span class="spec-title">Сумісність:</span>
      <span class="spec-value">
        Cyfral, Vizit, KC, Eltis, Метаком.
      </span>
    </div>

    <div class="spec">
      <span class="spec-title">Розміри:</span>
      <span class="spec-value">
        198 × 83 × 30 мм.
      </span>
    </div>
  `
},
        // Інше
        {
          name: "Зовнішній Wi-Fi адаптер",
          category: "Інше",
          price: 449,
          rating: 4.4,
          img: "https://via.placeholder.com/300x200?text=WiFi+Adapter",
          Info: `<div class="spec"><span class="spec-title">Стандарт:</span> <span class="spec-value">Wi-Fi 5</span></div>
                 <div class="spec"><span class="spec-title">Інтерфейс:</span> <span class="spec-value">USB 2.0</span></div>`
        }
      ]
    };
  },
  computed: {
    categoriesList() {
      const allCategories = this.devices.map(item => item.category);
      const uniqueCategories = [...new Set(allCategories)];
      return ["Всі пристрої", ...uniqueCategories.sort()];
    },
    filteredItems() {
      if (this.selectedCategory === "Всі пристрої") {
        return this.devices;
      }
      return this.devices.filter(item => item.category === this.selectedCategory);
    },
    sortedAndFilteredItems() {
      let items = [...this.filteredItems];

      switch (this.selectedSortOption) {
        case "Від дешевих до дорогих":
          items.sort((a, b) => a.price - b.price);
          break;
        case "Від дорогих до дешевих":
          items.sort((a, b) => b.price - a.price);
          break;
        case "За рейтингом":
        default:
          items.sort((a, b) => b.rating - a.rating);
          break;
      }

      return items;
    }
  },
  methods: {
    // Получить текущее изображение (для галереи или обычного img)
    getCurrentImage(item) {
      if (item.category === 'Домофони' && item.images && item.images.length > 0) {
        return item.images[item._currentImageIndex] || item.images[0];
      }
      return item.img;
    },
    
    // Переключение на предыдущее фото (только для домофонов)
    prevImage(item) {
      if (!item.images || item.images.length === 0) return;
      item._currentImageIndex = (item._currentImageIndex - 1 + item.images.length) % item.images.length;
    },
    
    // Переключение на следующее фото (только для домофонов)
    nextImage(item) {
      if (!item.images || item.images.length === 0) return;
      item._currentImageIndex = (item._currentImageIndex + 1) % item.images.length;
    },
    
    // Переход к конкретному фото (только для домофонов)
    goToImage(item, index) {
      if (!item.images || item.images.length === 0) return;
      item._currentImageIndex = index;
    },
    
    onCardClick(item) {
      console.log('Обрано пристрій:', item.name);
    }
  }
}
</script>


<style scoped>
.v-card-title{
  white-space: unset;
}
.equipment-section {
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

/* Сортировка через чипы */
.sort-chips {
  margin-bottom: 20px;
}

.sort-chip {
  font-weight: 600;
  text-transform: none;
  border-radius: 20px;
  height: 32px;
  transition: all 0.2s ease;
}

.sort-chip:hover {
  transform: translateY(-1px);
}

/* Панель категорий */
.categories-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.category-btn {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #616161;
  background: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-size: 0.875rem;
  border-radius: 8px;
}

.category-btn:hover {
  color: #b38800;
  background: rgba(254, 209, 0, 0.08);
}

.category-btn.active {
  color: #b38800;
  font-weight: 700;
  background: rgba(254, 209, 0, 0.12);
}

.category-btn.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: #fed100;
  border-radius: 1px;
}

/* Сетка карточек */
.equipment-col {
  display: flex;
  flex-direction: column;
}

.equipment-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f5f5f5;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 16px !important;
}

.equipment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border-color: #eeeeee;
}

/* Акцентная полоса слева */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(135deg, #fed100, #feb700);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  opacity: 0.9;
}

.equipment-title {
  color: #2c3e50;
  line-height: 1.3;
  font-size: 1.05rem;
  word-break: break-word;
}

.equipment-category {
  color: #757575;
  font-size: 0.85rem;
}

/* Контейнер изображения — минималистичный */
.image-container {
  position: relative;
  width: 90%;
  margin-bottom: 12px;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.equipment-image {
  transition: transform 0.3s ease;
  object-fit: cover;
  width: 100%;
  min-height: 140px;
  display: block;
}

.image-wrapper:hover .equipment-image {
  transform: scale(1.03);
}

/* Фейд-эффект при переключении */
.image-fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: fadeEffect 0.25s ease;
}

@keyframes fadeEffect {
  from { opacity: 0.6; }
  to { opacity: 0; }
}

/* === ГАЛЕРЕЯ: только индикаторы (без стрелок) === */
.gallery-indicators-wrapper {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

.gallery-indicators {
  display: flex;
  gap: 6px;
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.92);
  padding: 6px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
}

.indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
  min-width: 28px;
  min-height: 28px;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #bdbdbd;
  transition: all 0.2s ease;
}

.indicator:hover .indicator-dot {
  background: #9e9e9e;
  transform: scale(1.3);
}

.indicator.active .indicator-dot {
  background: #fed100;
  transform: scale(1.5);
  box-shadow: 0 0 0 2px rgba(254, 209, 0, 0.2);
}

/* Цена и характеристики */
.equipment-price {
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.equipment-specs {
  line-height: 1.5;
  color: #424242;
  font-size: 0.85rem;
  overflow: hidden;
  max-height: 190px;
  margin-bottom: 16px;
}

.equipment-specs .spec {
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2px 8px;
}

.equipment-specs .spec-title {
  font-weight: 600;
  min-width: 85px;
  color: #2c3e50;
  flex-shrink: 0;
}

.equipment-specs .spec-value {
  color: #545454;
  flex: 1;
}

.request-btn {
  width: 100%;
  margin-top: auto;
}

/* === MOBILE-FIRST: адаптив === */
@media (max-width: 600px) {
  .equipment-section {
    padding: 24px 0;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 28px;
  }

  .sort-chips {
    gap: 6px !important;
  }

  .sort-chip {
    height: 30px;
    font-size: 0.8rem;
    padding: 0 12px;
  }

  .categories-bar {
    gap: 8px;
  }

  .category-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }

  .equipment-card {
    padding: 14px !important;
    border-radius: 14px !important;
  }

  .equipment-title {
    font-size: 1rem !important;
  }

  .equipment-category {
    font-size: 0.8rem !important;
    margin-bottom: 8px !important;
  }

  .image-container {
    margin-bottom: 10px;
  }

  .equipment-image {
    min-height: 130px;
  }

  .equipment-price {
    font-size: 1.3rem !important;
    margin-bottom: 10px !important;
  }

  .equipment-specs {
    font-size: 0.82rem;
    max-height: 85px;
    margin-bottom: 12px;
  }

  /* Индикаторы на мобильных — крупнее для удобного тапа */
  .gallery-indicators {
    padding: 5px 8px;
    gap: 8px;
  }
  
  .indicator {
    min-width: 32px;
    min-height: 32px;
    padding: 6px;
  }
  
  .indicator-dot {
    width: 7px;
    height: 7px;
  }
  
  .indicator.active .indicator-dot {
    transform: scale(1.6);
  }

  .v-rating {
    --v-rating-size: 18px;
  }
}

/* Desktop: можно вернуть стрелки при ховере, если очень нужно */
@media (min-width: 960px) {
  /* Если захотите вернуть стрелки только на десктопе при наведении:
  .image-wrapper:hover .gallery-controls { opacity: 1; }
  .gallery-controls { opacity: 0; transition: opacity 0.2s; }
  */
}
</style>