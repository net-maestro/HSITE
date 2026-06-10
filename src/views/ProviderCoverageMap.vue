<template>
  <div class="map-section bg-grey-lighten-4 py-12">
    <v-container>
      <!-- Заголовок сторінки -->
      <div class="text-center mb-12">
        <h2 class="hl-section-title">
          {{ $t('menu.coverage-map') }}
        </h2>
        <p class="text-body-1 text-grey-darken-1 mt-4">Перевірте можливість підключення за вашою адресою</p>
      </div>

      <!-- Інфо-картки статистики мережі -->
      <v-row class="mb-10" justify="center">
        <v-col cols="12" sm="4" md="4" v-for="(stat, i) in networkStats" :key="i">
          <v-card class="hl-card text-center pa-6 h-100 d-flex flex-column justify-center" rounded="xl" elevation="0" :data-aos="animated ? 'fade-up' : null" :data-aos-delay="i * 100">
            <v-icon :icon="stat.icon" size="48" :color="stat.color" class="mb-4 mx-auto"></v-icon>
            <h3 class="text-h5 font-weight-bold mb-2">{{ stat.value }}</h3>
            <p class="text-body-2 text-grey-darken-1 mb-0">{{ stat.label }}</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Карта Leaflet -->
      <v-row justify="center">
        <v-col
          cols="12"
          lg="10"
          :data-aos="animated ? 'fade-up' : null"
        >
          <v-card
            class="map-card hl-card p-0"
            elevation="0"
            rounded="xl"
          >
            <div id="map" class="map-container"></div>
            
            <!-- Легенда на карті -->
            <div class="map-legend bg-white pa-3 rounded-lg elevation-2 d-none d-sm-block">
              <h4 class="text-caption font-weight-bold mb-2 text-uppercase">Зони покриття</h4>
              <div class="d-flex align-center mb-1">
                <span class="legend-color" style="background: rgba(73, 203, 214, 0.4); border: 2px solid #49CBD6;"></span>
                <span class="text-caption">Софіївська Борщагівка</span>
              </div>
              <div class="d-flex align-center mb-1">
                <span class="legend-color" style="background: rgba(254, 209, 0, 0.4); border: 2px solid #FED100;"></span>
                <span class="text-caption">Крюківщина</span>
              </div>
              <div class="d-flex align-center">
                <span class="legend-color" style="background: rgba(38, 166, 154, 0.4); border: 2px solid #26A69A;"></span>
                <span class="text-caption">П. Борщагівка</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "CoverageMap",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      map: null,
      searchQuery: '',
      isSearching: false,
      searchResult: false,
      networkStats: [
        { icon: 'mdi-home-group', value: '3+', label: 'Населених пункти', color: '#49CBD6' },
        { icon: 'mdi-flash', value: 'GPON', label: 'Сучасна технологія', color: '#FED100' },
        { icon: 'mdi-battery-charging-100', value: '72 год', label: 'Резервування без світла', color: '#26A69A' }
      ],
      providers: [
        { 
          position: [50.405286, 30.340234], 
          label: "Софіївська Борщагівка", 
          color: "#49CBD6",
          radius: 1800
        },
        { 
          position: [50.378882, 30.370421], 
          label: "Крюківщина", 
          color: "#FED100",
          radius: 1500
        },
        { 
          position: [50.438391, 30.350885], 
          label: "Петропавлівська Борщагівка", 
          color: "#26A69A",
          radius: 1600
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    checkAddress() {
      if (!this.searchQuery.trim()) return;
      this.isSearching = true;
      this.searchResult = false;
      
      // Імітація запиту до БД
      setTimeout(() => {
        this.isSearching = false;
        this.searchResult = true;
        
        // Скрол до результату
        if(window.innerWidth < 600) {
           window.scrollBy({ top: 100, behavior: 'smooth' });
        }
      }, 1200);
    },
    initMap() {
      // Initialize the map
      this.map = L.map("map", {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false // Вимикаємо зум скролом для зручності на мобільних
      }).setView([50.4100, 30.3550], 12);

      // Add zoom control
      L.control.zoom({
        position: 'topright'
      }).addTo(this.map);

      // Add a clean light map
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(this.map);

      // Add Zones (Circles) and Markers
      this.providers.forEach(provider => {
        // Зона покриття (Круг)
        L.circle(provider.position, {
          color: provider.color,
          fillColor: provider.color,
          fillOpacity: 0.25,
          weight: 2,
          radius: provider.radius
        }).addTo(this.map);

        // Центральний маркер
        const icon = this.createCustomIcon(provider.color);
        L.marker(provider.position, { icon })
          .bindPopup(this.createPopupContent(provider.label), {
            className: 'happylink-popup',
            closeButton: true,
            minWidth: 220
          })
          .addTo(this.map);
      });
    },
    createCustomIcon(color) {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
          <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>`;

      const iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);

      return L.icon({
        iconUrl: iconUrl,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });
    },
    createPopupContent(label) {
      return `
        <div class="popup-container">
          <div class="popup-header">
            <h3 class="popup-title">${label}</h3>
          </div>
          <div class="popup-body">
            <p class="popup-text"><strong>GPON & Ethernet</strong> мережа доступна.<br>100% резервування живлення.</p>
          </div>
        </div>
      `;
    }
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
.map-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.03);
}

.map-container {
  width: 100%;
  height: 550px;
  z-index: 1; /* Для правильного відображення підказок */
}

/* Легенда на карті */
.map-legend {
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(0,0,0,0.05);
}

.legend-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}

/* Кастомные стили Leaflet попапов */
:deep(.happylink-popup .leaflet-popup-content-wrapper) {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 0;
  overflow: hidden;
}

:deep(.happylink-popup .leaflet-popup-content) {
  margin: 0 !important;
  width: 100% !important;
}

:deep(.happylink-popup .leaflet-popup-tip-container) {
  display: none; /* Ховаємо стандартний трикутник, бо він псує дизайн */
}

.popup-header {
  background: linear-gradient(135deg, var(--hl-bg-light) 0%, #f0f0f0 100%);
  padding: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.popup-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--hl-text-main);
  text-align: center;
}

.popup-body {
  padding: 16px;
  text-align: center;
}

.popup-text {
  margin: 0;
  color: var(--hl-text-muted);
  line-height: 1.5;
  font-size: 0.95rem;
}

.border-green {
  border: 1px solid #c8e6c9;
}

/* Адаптив */
@media (max-width: 600px) {
  .map-container {
    height: 400px;
  }
}
</style>