<!-- Contact.vue -->
<template>
  <div class="contact-section">
    <h2 class="hl-section-title mb-10">
      {{ $t("menu.contact") }}
    </h2>

    <v-container class="max-width-container">
      <div class="map-wrapper" :data-aos="animated ? 'fade-up' : null">
        <!-- Карта -->
        <div id="map" class="contact-map"></div>

        <!-- Плавающая карточка контактов -->
        <v-card
          class="floating-contact-card pa-8"
          elevation="4"
          rounded="xl"
        >
          <div class="accent-bar accent-map"></div>
          
          <v-card-title class="contact-title text-h4 font-weight-bold mb-6 pa-0">
            Зв'яжіться з нами
          </v-card-title>

          <v-list class="contact-list bg-transparent pa-0">
            <!-- Телефоны и Email -->
            <v-list-item
              v-for="(contact, index) in contacts"
              :key="index"
              class="contact-item px-0 mb-4"
            >
              <template v-slot:prepend>
                <div class="icon-wrapper mr-4" :style="{ backgroundColor: contact.color + '15' }">
                  <v-icon :icon="contact.icon" :color="contact.color" size="x-large"></v-icon>
                </div>
              </template>
              <v-list-item-title class="text-h6 font-weight-medium">
                <a
                  :href="contact.href"
                  class="contact-link"
                  target="_blank"
                  rel="noopener"
                >
                  {{ contact.text }}
                </a>
              </v-list-item-title>
            </v-list-item>

            <v-divider class="my-6"></v-divider>

            <!-- График работы -->
            <v-list-item class="schedule-item px-0">
              <template v-slot:prepend>
                <div class="icon-wrapper mr-4" style="background-color: rgba(254, 209, 0, 0.15)">
                  <v-icon icon="mdi-calendar-clock" color="#fed100" size="x-large"></v-icon>
                </div>
              </template>
              <v-list-item-title>
                <div class="schedule-text text-body-1">
                  <div class="font-weight-bold text-h6 mb-1">{{ $t("menu.work-schedule") }}</div>
                  <div class="text-grey-darken-2">{{ $t("menu.monday-sat") }}.</div>
                  <div class="font-weight-medium" style="color: #1e293b">09:00 - 18:00</div>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Contact",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      contacts: [
        {
          icon: "mdi-cellphone",
          color: "#1e293b",
          href: "tel:0671319072",
          text: "(067) 131-90-72"
        },
        {
          icon: "mdi-cellphone",
          color: "#1e293b",
          href: "tel:0731319072",
          text: "(073) 131-90-72"
        },
        {
          icon: "mdi-cellphone",
          color: "#1e293b",
          href: "tel:0991893710",
          text: "(099) 189-37-10"
        },
        {
          icon: "mdi-email",
          color: "#49CBD6",
          href: "mailto:info@happylink.net.ua",
          text: "info@happylink.net.ua"
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
      if (!document.getElementById('map')) return;

      const map = L.map("map", {
        zoomControl: false,
        attributionControl: false
      }).setView([50.43839163743875, 30.350885357851297], 13);

      // Add zoom control
      L.control.zoom({
        position: 'topright'
      }).addTo(map);

      // Add tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Create custom icon
      const icon = L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #fed100, #ff9800);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e293b;
            font-weight: 800;
            font-size: 16px;
            box-shadow: 0 6px 12px rgba(254, 209, 0, 0.4);
            border: 3px solid #fff;
          ">HL</div>
        `,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      // Add marker
      const marker = L.marker([50.43839163743875, 30.350885357851297], { icon }).addTo(map);
      marker.bindPopup(`
        <div class="popup-content" style="text-align: center; padding: 4px;">
          <h3 style="color: #1e293b; margin: 0 0 4px 0; font-weight: 800;">HappyLink</h3>
          <p style="color: #64748b; margin: 0; font-size: 14px;">Петропавлівська Борщагівка</p>
        </div>
      `, {
        className: 'contact-popup'
      });
    }
  }
};
</script>

<style scoped>
.contact-section {
  padding: 60px 0 100px;
}

.max-width-container {
  max-width: 1200px;
}

.map-wrapper {
  position: relative;
  width: 100%;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.contact-map {
  width: 100%;
  height: 650px;
  z-index: 1;
}

/* Плавающая карточка */
.floating-contact-card {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 420px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15) !important;
  transition: transform 0.3s ease;
}

.floating-contact-card:hover {
  transform: translateY(-5px);
}

.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
}
.accent-map {
  background: linear-gradient(to bottom, #fed100, #ff9800);
}

.contact-title {
  color: #1e293b;
  letter-spacing: -0.5px;
}

/* Иконки */
.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact-item:hover .icon-wrapper,
.schedule-item:hover .icon-wrapper {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 8px 16px rgba(0,0,0,0.05);
}

/* Ссылки */
.contact-link {
  color: #1e293b;
  text-decoration: none;
  transition: all 0.3s ease;
  background-image: linear-gradient(#fed100, #fed100);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 3px;
  padding-bottom: 2px;
}
.contact-link:hover {
  color: #b45309;
  background-size: 100% 3px;
}

.schedule-text {
  line-height: 1.5;
}

/* Leaflet кастомизация попапа */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}
:deep(.leaflet-popup-tip) {
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

/* Адаптив */
@media (max-width: 959px) {
  .map-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
  }
  
  .contact-map {
    height: 450px;
    order: 2;
    border-radius: 24px;
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  }
  
  .floating-contact-card {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    order: 1;
    margin-bottom: 32px;
    box-shadow: 0 16px 32px rgba(0,0,0,0.08) !important;
  }
}
</style>