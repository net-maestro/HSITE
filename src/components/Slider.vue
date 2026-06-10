<template>
  <div class="carousel-container">
    <v-carousel
      class="custom-carousel"
      :show-arrows="false"
      delimiter-icon="mdi-circle"
      hide-delimiter-background
      cycle
    >
      <v-carousel-item>
        <v-row class="d-flex align-center" justify="center">
          <!-- Text and Button Section -->
          <v-col
            class="text-content d-flex flex-column align-center justify-center"
            cols="12"
            xxl="6"
            xl="6"
            lg="6"
            md="6"
            sm="12"
          >
            <h1 class="slider-title">Приєднуйтесь до мережі Інтернет з Happylink</h1>
            <RequestForm
              class="request-button"
              :ButtonIcon="'mdi-phone-incoming mdi-24px'"
              :ButtonTitle="$t('menu.leave-request')"
              ButtonVariant="text"
              :CommentField="true"
            />
          </v-col>
          <!-- Carousel Image Section -->
          <v-col
            class="d-flex align-center justify-center"
            cols="12"
            xxl="6"
            xl="6"
            lg="6"
            md="6"
            sm="12"
          >
            <v-carousel
              class="image-carousel"
              hide-delimiter-background
              cycle
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
              >
              <a :href="slide.promo_link || '#'" target="_blank" class="image-link">
               <v-img :src="slide.link" :cover="slide.cover" class="rounded-image" />
              </a>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
         { promo_link:'/promo', link: 'http://happylink.net.ua/static/slider/PROMO_Autumn2025.jpg', cover: false },
         { promo_link:'/promo', link: 'http://happylink.net.ua/static/slider/PROMO_Bussines2025.jpg', cover: false },
        { promo_link:'/promo', link: 'http://happylink.net.ua/static/slider/PROMO-PROGRAM.jpg', cover: false },
        { promo_link:'/promo', link: 'http://happylink.net.ua/static/slider/LOGO1.jpg', cover: true },
        { promo_link:'/promo', link: 'http://happylink.net.ua/static/slider/PROMO_10+2.jpg', cover: false },
      ],
    };
  },
};
</script>

<style scoped>

.carousel-container {
  position: relative;
  max-height: 50%;
  background-color: #FEDF59;
}

.custom-carousel {
  max-height: 50%;
}

.slider-title {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 32px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
}

.text-content {
  padding: 20px;
  text-align: center;
}

.request-button {
  margin-top: 20px;
  padding: 5px 10px;
  border-radius: 20px;
  color: #26A69A;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.request-button:hover {
  color: #ffffff;
  background-color: #26A69A;
}

.image-carousel {
  max-width: 100%;
  height: 250px;
}

.rounded-image img {
  border-radius: 20px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  height: 100%;
  width: auto;
  object-fit: contain;
}

.rounded-image img:hover {
  opacity: 1;
}
</style>
