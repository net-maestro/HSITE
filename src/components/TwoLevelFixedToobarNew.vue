<template>
  <nav>
    <!-- First level toolbar -->
    <v-app-bar app flat color="secondary" style="z-index: 998; position: fixed">
      <div
        variant="text"
        @click.stop="drawer = !drawer"
        v-if="$vuetify.display.mdAndDown"
        class="custom-icon-button"
      >
        <div :class="{ 'icon-line': true, line1: true, open: drawer }"></div>
        <div :class="{ 'icon-line': true, line2: true, open: drawer }"></div>
        <div :class="{ 'icon-line': true, line3: true, open: drawer }"></div>
      </div>

      <v-img
        @click="$router.push('/')"
        lazy-src="@/assets/logo/happylinkLogo.svg"
        min-height="120"
        min-width="150"
        max-height="120"
        max-width="150"
        src="@/assets/logo/happylinkLogo.svg"
      ></v-img>

      <div class="hidden-sm-and-down">
        <v-menu location="center">
          <template v-slot:activator="{ props }">
            <v-btn
              dark
              v-bind="props"
              prepend-icon="mdi-phone-in-talk mdi-dark mdi-24px"
            >
              <span style="color: #7a7a7a"> (067)131-90-72 </span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a href="tel:0671319072" class="phone-link">(067)131-90-72</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="tel:0731319072" class="phone-link">(073)131-90-72</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a href="tel:099189-37-10" class="phone-link">(099)189-37-10</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <SwitchLocale />

      <v-btn
        prepend-icon="mdi-account-circle mdi-dark mdi-24px"
        flat
        href="https://my.happylink.net.ua"
        target="_blank"
      >
        <span class="hidden-sm-and-down">{{ $t("menu.cabinet") }}</span>
      </v-btn>
    </v-app-bar>
    <!-- Second level toolbar -->
    <v-app-bar
     v-if="$vuetify.display.mdAndUp"
      app
      rounded
      height="45"
      style="z-index: 999; position: fixed"
    >
      <v-spacer></v-spacer>
      <v-btn
        color="my-grey"
        :text="$t('menu.internet')"
        @click="$router.push('/price/internet-price')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.tv-list')"
        @click="$router.push('/price/tv-list')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.intercom')"
        @click="$router.push('/price/intercom-price')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.service')"
        @click="$router.push('/service/test')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.coverage-map')"
        @click="$router.push('/coverage-map')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.promo')"
        @click="$router.push('/promotions')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.news')"
        @click="$router.push('/blog')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.device')"
        @click="$router.push('/shop')"
      ></v-btn>
      <v-btn
        color="my-grey"
        :text="$t('menu.payment')"
        @click="$router.push('/payment-methods')"
      ></v-btn>
      <BuzzMenu />
      <v-spacer></v-spacer>
    </v-app-bar>
  </nav>

  <v-navigation-drawer
    v-if="$vuetify.display.mdAndDown"
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    :width="300"
  >
    <v-container>
      <v-list v-model:opened="open" style="margin-top: 52px">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" color="teal-lighten-1"
              ><v-icon color="teal-lighten-1">mdi-phone-in-talk</v-icon>
              (067)131-90-72</v-list-item
            >
          </template>

          <v-list>
            <v-list-item prepend-icon="mdi-cellphone mdi-dark">
              <v-list-item-title>
                <a href="tel:0671319072" class="phone-link">(067)131-90-72</a>
              </v-list-item-title>
            </v-list-item>

            <v-list-item prepend-icon="mdi-cellphone mdi-dark">
              <v-list-item-title>
                <a href="tel:0731319072" class="phone-link">(073)131-90-72</a>
              </v-list-item-title>
            </v-list-item>

            <v-list-item prepend-icon="mdi-cellphone mdi-dark">
              <v-list-item-title>
                <a href="tel:099189-37-10" class="phone-link">(099)189-37-10</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>

      <v-list v-model:opened="open">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <span style="color: #7a7a7a">{{ $t("menu.rates") }}</span>
            </v-list-item>
          </template>

          <v-list>
            <v-list-item
              prepend-icon="mdi-microsoft-internet-explorer mdi-dark"
            >
              <v-list-item-title
                @click="$router.push('/price/internet-price')"
                >{{ $t("menu.internet") }}</v-list-item-title
              >
            </v-list-item>

            <v-list-item prepend-icon="mdi-youtube-tv mdi-dark">
              <v-list-item-title @click="$router.push('/price/tv-list')">{{
                $t("menu.tv-list")
              }}</v-list-item-title>
            </v-list-item>

            <v-list-item prepend-icon="mdi-doorbell-video mdi-dark">
              <v-list-item-title
                @click="$router.push('/price/intercom-price')"
                >{{ $t("menu.intercom") }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-list-group>
      </v-list>
      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="mdi-account-wrench-outline mdi-dark">
          <v-list-item-title @click="$router.push('/service/test')">{{
            $t("menu.service")
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-router-wireless mdi-dark">
          <v-list-item-title @click="$router.push('/shop')">{{
            $t("menu.device")
          }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="mdi-bullhorn-outline mdi-dark">
          <v-list-item-title @click="$router.push('/promotions')">{{
            $t("menu.promo")
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-newspaper-variant-outline mdi-dark">
          <v-list-item-title @click="$router.push('/blog')">{{
            $t("menu.news")
          }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="mdi-script-text-outline mdi-dark">
          <v-list-item-title @click="$router.push('/about')">{{
            $t("menu.about-company")
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-currency-uah mdi-dark">
          <v-list-item-title @click="$router.push('/payment-methods')">{{
            $t("menu.payment")
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-map-search-outline mdi-dark">
          <v-list-item-title @click="$router.push('/coverage-map')">{{
            $t("menu.coverage-map")
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item prepend-icon="mdi-contacts-outline mdi-dark">
          <v-list-item-title @click="$router.push('/contact')">{{
            $t("menu.contact")
          }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          href="https://my.happylink.net.ua"
          prepend-icon="mdi-account-multiple-outline mdi-dark"
          target="_blank"
        >
          <v-list-item-title>
            {{ $t("menu.cabinet") }}
          </v-list-item-title>
        </v-list-item>
        
      </v-list>

      <v-divider></v-divider>
      <v-card-text class="black--text">
        <span
          >{{ $t("footer.all-rights-reserved") }} © 2014 -
          {{ new Date().getFullYear() }}</span
        >
        <strong class="text-uppercase grey--text">
          <span class="font-weight-light" style="color: #7a7a7a"> Happy</span>
          <span style="color: #fed100">link</span>
        </strong>
      </v-card-text>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppHeader",
  data: () => ({
    isMobile: false,
    drawer: false,
    groupPhone: false,
    open: ["Тарифи"],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    this.checkScreenWidth();
    window.addEventListener("resize", this.checkScreenWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isMobile = window.innerWidth < 600;
    },
  },
};
</script>

<style scoped>
.custom-icon-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; /* Добавлено для центрирования линий */
  width: 30px; /* Увеличена ширина для лучшего отображения */
  height: 24px; /* Увеличена высота для лучшего отображения */
  margin: 0 0 0 20;
  cursor: pointer;
}

.icon-line {
  width: 100%;
  height: 4px; /* Увеличена высота линий для лучшей видимости */
  background-color: black !important; /* Цвет линий */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.line1 {
  transform-origin: top left;
}

.line2 {
  opacity: 1;
}

.line3 {
  transform-origin: bottom left;
}

.open.line1 {
  transform: rotate(45deg);
}

.open.line2 {
  opacity: 0;
}

.open.line3 {
  transform: rotate(-45deg);
}
</style>
