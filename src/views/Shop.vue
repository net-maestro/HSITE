<template>
  <div class="equipment-section">
    <h2 class="hl-section-title">
      {{ $t("menu.recommendet-equipment") }}
    </h2>

    <ShopFilter
      v-model="filterState"
      :sort-options="sortOptions"
      :categories="categoriesList"
    />

    <v-container>
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
          <ShopItemCard :item="item" @click="onCardClick" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ShopFilter from '@/components/shop/ShopFilter.vue'
import ShopItemCard from '@/components/shop/ShopItemCard.vue'

const props = defineProps({
  animated: {
    type: Boolean,
    default: true,
  },
})

const sortOptions = [
  "За рейтингом",
  "Від дешевих до дорогих",
  "Від дорогих до дешевих"
]

const filterState = ref({
  sort: "За рейтингом",
  category: "Всі пристрої"
})

// ============================================================================
// БАЗА ДАНИХ ТОВАРІВ
// Щоб додати новий товар, просто скопіюйте один з об'єктів нижче і змініть дані.
// Обов'язкові поля:
// - name: Назва товару
// - category: Категорія (має співпадати з існуючою, або створиться нова)
// - price: Ціна (число)
// - img: URL головного зображення
// - Info: HTML-рядок з характеристиками
// ============================================================================
const devices = ref([
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
      ])

const categoriesList = computed(() => {
  const allCategories = devices.value.map(item => item.category)
  const uniqueCategories = [...new Set(allCategories)]
  return ["Всі пристрої", ...uniqueCategories.sort()]
})

const filteredItems = computed(() => {
  if (filterState.value.category === "Всі пристрої") {
    return devices.value
  }
  return devices.value.filter(item => item.category === filterState.value.category)
})

const sortedAndFilteredItems = computed(() => {
  let items = [...filteredItems.value]

  switch (filterState.value.sort) {
    case "Від дешевих до дорогих":
      items.sort((a, b) => parseInt(a.price) - parseInt(b.price))
      break
    case "Від дорогих до дешевих":
      items.sort((a, b) => parseInt(b.price) - parseInt(a.price))
      break
    case "За рейтингом":
    default:
      items.sort((a, b) => b.rating - a.rating)
      break
  }

  return items
})

const onCardClick = (item) => {
  console.log('Обрано пристрій:', item.name)
}
</script>

<style scoped>
.equipment-section {
  padding: 40px 0;
}





@media (max-width: 600px) {
  .equipment-section {
    padding: 24px 0;
  }
  
}
</style>