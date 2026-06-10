<!-- CoverageMap.vue -->
<template>
  <div class="map-section">
    <h2 class="section-title">
      {{ $t('menu.coverage-map') }}
    </h2>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          lg="10"
          xl="8"
          :data-aos="animated ? 'fade-up' : null"
        >
          <v-card
            class="map-card card-hover pa-2 card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar"></div>
            <div id="map" class="map-container"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";

export default {
  name: "CoverageMap",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      map: null,
      providers: [
        { 
          position: [50.405286709026306, 30.340234541191517], 
          label: "Софіївська Борщагівка", 
          color: "#49CBD6"
        },
        { 
          position: [50.37888222297798, 30.3704213348619], 
          label: "Крюківщина", 
          color: "#FED100"
        },
        { 
          position: [50.43839163743875, 30.350885357851297], 
          label: "Петропавлівська Борщагівка", 
          color: "#26A69A"
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
    initMap() {
      // Initialize the map
      this.map = L.map("map", {
        zoomControl: false,
        attributionControl: false
      }).setView([50.4100, 30.3550], 11);

      // Add zoom control
      L.control.zoom({
        position: 'topright'
      }).addTo(this.map);

      // Add a custom tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(this.map);

      // Create a marker cluster group
      const markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 50
      });

      // Add markers with custom icons and popups
      this.providers.forEach(provider => {
        const icon = this.createCustomIcon(provider.color);
        const marker = L.marker(provider.position, { icon })
          .bindPopup(this.createPopupContent(provider.label), {
            className: 'happylink-popup',
            closeButton: true,
            autoClose: false
          });
        markers.addLayer(marker);
      });

      this.map.addLayer(markers);
    },
    createCustomIcon(color) {
      // Create SVG icon
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
          <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5" fill="white"/>
        </svg>`;

      const iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);

      return L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
    },
    createPopupContent(label) {
      return `
        <div class="popup-container">
          <div class="popup-header">
            <h3 class="popup-title">${label}</h3>
          </div>
          <div class="popup-body">
            <p class="popup-text">Інтернет та цифрове телебачення доступні в цьому районі.</p>
          </div>
          <div class="popup-footer">
            <a href="#" class="popup-button" onclick="window.dispatchEvent(new CustomEvent('map-marker-clicked', { detail: '${label}' })); return false;">
              Детальніше
            </a>
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
.map-section {
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

.map-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.map-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентная полоса слева */
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

.map-container {
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
}

/* Кастомные попапы */
.happylink-popup .leaflet-popup-content-wrapper {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.happylink-popup .leaflet-popup-content {
  padding: 0 !important;
  margin: 0 !important;
}

.popup-container {
  min-width: 250px;
  font-family: 'Roboto', sans-serif;
}

.popup-header {
  background: linear-gradient(135deg, #49CBD6, #26A69A);
  padding: 16px;
  color: white;
}

.popup-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.popup-body {
  padding: 16px;
}

.popup-text {
  margin: 0;
  color: #424242;
  line-height: 1.5;
  font-size: 0.95rem;
}

.popup-footer {
  padding: 12px 16px 16px;
  text-align: center;
}

.popup-button {
  display: inline-block;
  background: linear-gradient(135deg, #49CBD6, #26A69A);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(38, 166, 154, 0.3);
}

.popup-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(38, 166, 154, 0.4);
  background: linear-gradient(135deg, #3da5b1, #1e8a7d);
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .map-container {
    height: 350px;
  }

  .popup-container {
    min-width: 220px;
  }

  .popup-title {
    font-size: 1rem;
  }

  .popup-text {
    font-size: 0.9rem;
  }
}
</style>