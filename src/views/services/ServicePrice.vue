<template>
    <v-container> 
          <v-card-subtitle class="text-center text-h5 text-uppercase ma-3">Послуги</v-card-subtitle>
       <v-row>

        <v-col cols="12" md="12" sm="12" xs="12">
    <v-tabs color="primary" v-if="!isMobile" v-model="selectedSortCategory">
      <v-tab  v-for="(tab, index) in sortCategory" :key="index">{{ tab }}</v-tab>
    </v-tabs>
    <v-select 
     v-else 
     v-model="selectedSortCategory" 
     :items="sortCategory"  
     label="Показати"
     outlined
     color="blue">
    </v-select>
  </v-col>
       
       </v-row>

       <v-row>
        <v-col
          v-for="(service, index) in filteredItems"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card hover data-aos="zoom-in" data-aos-easing="ease">
            <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar
                    class="ma-2 pa-2"
                    rounded="0"
                    size="60"
                  >
                    <v-img :src="service.img"></v-img>
                  </v-avatar>
            <div>
            <v-card-title class="no-white-space">{{ service.title }}</v-card-title>
            <v-card-subtitle class="no-white-space">{{ service.description }}</v-card-subtitle>
            <v-card-text class="no-white-space">{{ service.price }}</v-card-text>
            </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {

    data() {
      return {
        selectedSortCategory: 'Всі послуги',
        selectedTab: 0,
        sortCategory: [
      'Всі послуги',
      'Інтернет',
      'IPTV',
      'Інше',
    ], 
    isMobile: false,
        services: [
          {
            title: "Налаштування роутера",
            category: 'Інтернет',
            description: "Виклик спеціаліста для налаштування роутера",
            price: "від 160 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
          {
            title: "Налаштування smart tv",
            category: 'IPTV',
            description: "Налаштування smart tv",
            price: "від 350 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/iptv.svg",
          },
          {
            title: "Провід по квартирі",
            category: 'Інше',
            description: "провід по квартирі без прокладання",
            price: "від 10 ₴/метр",
            img: "http://happylink.netmaestro.tech/static/internet-service/cable.svg",
          },
          {
            title: "Встановлення інтернет розетки",
            category: 'Інтернет',
            description: "Встановлення комп'ютерної розетки RJ-45",
            price: "від 80 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/socket.svg",
          },
          {
            title: "IP‐адреса",
            category: 'Інтернет',
            description: "Додаткова статична IP-адреса",
            price: "100 ₴/30 дн.",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
         
          {
            title: "Монтаж короба",
            category: 'Інше',
            description: "Встановлення та монтаж кабельного короба",
            price: "49 ₴/метр",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
          {
            title: "Налаштування мережевої карти",
            category: 'Інтернет',
            description: "Встановлення та налаштування Ethernet-адаптера",
            price: "від 149 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/network-adapter.svg",
          },
          {
            title: "Пробивання отворів",
            category: 'Інше',
            description: "Буріння отворів окрім трьох передбачених при стандартному підключенні",
            price: "10 ₴/шт.",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
          {
            title: "Додатковий патчкорд",
            category: 'Інтернет',
            description: "Понад три, що надаються при підключенні",
            price: "49 ₴/шт.",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
          {
            title: "Виклик майстра",
            category: 'Інше',
            description: "Виклик фахівця для виконання додаткових робіт.",
            price: "від 100 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
    
          {
            title: "Заміна конектора",
            category: 'Інтернет',
            description: "обжимання додаткових коннекторів RJ-45",
            price: "30 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
          {
            title: "Надання ONU",
            category: 'Інше',
            description: "Надання ONU – заміна несправного абонентського оптичного приймача",
            price: "499 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
          {
            title: "Встановлення драйверів",
            category: 'Інтернет',
            description: "Встановлення драйверів, програм пов'язанних з обладнанням або послугами.",
            price: "від 150 ₴",
            img: "http://happylink.netmaestro.tech/static/internet-service/router.svg",
          },
        ],
      };
    },
    created() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth);
  },
    methods: {
    checkScreenWidth() {
      this.isMobile = window.innerWidth < 600;
    }
  },
    computed: {
      filteredItems() {
      // If 'All' is selected, show all items
      if (this.selectedTab === 0) {
        return this.services;
      }
      // Filter items based on the selected category
      const selectedCategory = this.sortCategory[this.selectedTab];
      return this.services.filter(item => item.category === selectedSortCategory);
    },
    sortedItems() {
      let sorted = [...this.services];
      switch (this.selectedSortCategory) {
        case 'Всі послуги':
          console.log(this.selectedSortCategory)
          sorted = sorted;
          break;
        case 'Інтернет':
          console.log(this.selectedSortCategory)
          sorted = sorted.filter(sorted => sorted.category === this.selectedSortCategory);
          break;
        case 'IPTV':
          console.log(this.selectedSortCategory)
          sorted = sorted.filter(sorted => sorted.category === this.selectedSortCategory);
          break;
        case 'Інше':
          console.log(this.selectedSortCategory)
          sorted = sorted.filter(sorted => sorted.category === this.selectedSortCategory);
          break;          
        }
        return sorted;
    }
  }
  };
  </script>
  
  <style scoped>
  .no-white-space {
    white-space: unset;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  