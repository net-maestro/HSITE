<!-- Contact.vue -->
<template>
  <div class="contact-section">
    <h2 class="section-title">
      {{ $t("menu.contact") }}
    </h2>

    <v-container>
      <v-row justify="center" class="g-6">
        <!-- Контактная информация -->
        <v-col
          cols="12"
          md="6"
          :data-aos="animated ? 'fade-right' : null"
        >
          <v-card
            class="contact-card card-hover pa-6 card-animate"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar accent-info"></div>

            <v-card-title class="contact-title text-h5 font-weight-bold mb-4">
              <v-icon icon="mdi-account-details" size="small" class="me-2"></v-icon>
              {{ $t("contact.contact-info") }}
            </v-card-title>

            <v-list class="contact-list">
              <v-list-item
                v-for="(contact, index) in contacts"
                :key="index"
                class="contact-item"
              >
                <template v-slot:prepend>
                  <v-icon :icon="contact.icon" :color="contact.color" size="small"></v-icon>
                </template>
                <v-list-item-title>
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

              <v-list-item class="schedule-item">
                <template v-slot:prepend>
                  <v-icon icon="mdi-calendar-clock" color="primary" size="small"></v-icon>
                </template>
                <v-list-item-title>
                  <div class="schedule-text">
                    <div>{{ $t("menu.work-schedule") }}:</div>
                    <div>{{ $t("menu.monday-sat") }}.</div>
                    <div>09:00-18:00</div>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Карта -->
        <v-col
          cols="12"
          md="6"
          :data-aos="animated ? 'fade-left' : null"
        >
          <v-card
            class="contact-card card-hover pa-6"
            elevation="0"
            rounded="xl"
          >
            <!-- Акцентная полоса -->
            <div class="accent-bar accent-map"></div>

            <v-card-title class="contact-title text-h5 font-weight-bold mb-4">
              <v-icon icon="mdi-map-marker" size="small" class="me-2"></v-icon>
              {{ $t("contact.location") }}
            </v-card-title>

            <div id="map" class="contact-map"></div>
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
  name: "Contact",
  props: {
    animated: { type: Boolean, default: true },
  },
  data() {
    return {
      contacts: [
        {
          icon: "mdi-cellphone",
          color: "#26A69A",
          href: "tel:0671319072",
          text: "(067) 131-90-72"
        },
        {
          icon: "mdi-cellphone",
          color: "#26A69A",
          href: "tel:0731319072",
          text: "(073) 131-90-72"
        },
        {
          icon: "mdi-cellphone",
          color: "#26A69A",
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
            background: linear-gradient(135deg, #49CBD6, #26A69A);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          ">HL</div>
        `,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      // Add marker
      const marker = L.marker([50.43839163743875, 30.350885357851297], { icon }).addTo(map);
      marker.bindPopup(`
        <div class="popup-content">
          <h3 style="color: #2c3e50; margin: 0 0 8px 0;">HappyLink</h3>
          <p style="color: #424242; margin: 0;">Петропавлівська Борщагівка</p>
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

.contact-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Акцентные полосы */
.accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.accent-info {
  background: linear-gradient(to bottom, #49CBD6, #26A69A);
}

.accent-map {
  background: linear-gradient(to bottom, #FED100, #feb700);
}

.contact-title {
  color: #2c3e50;
  padding: 0;
}

.contact-list {
  padding: 0;
}

.contact-item {
  padding: 8px 0;
}

.contact-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-bottom: 1px dashed transparent;
}

.contact-link:hover {
  color: #26A69A;
  border-bottom-color: #26A69A;
}

.schedule-item {
  padding: 16px 0 8px;
}

.schedule-text {
  color: #424242;
  line-height: 1.6;
}

.contact-map {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Адаптив */
@media (max-width: 600px) {
  .section-title {
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .contact-card {
    padding: 16px !important;
  }

  .contact-title {
    font-size: 1.25rem;
  }

  .contact-map {
    height: 250px;
  }
}
</style>