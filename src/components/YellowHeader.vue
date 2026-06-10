<template>
   <nav id="GoToHeader">
   
        <v-toolbar color="secondary" rounded  style="z-index: 999; position: fixed ;">
            <v-img
                @click="$router.push('/')"
                lazy-src="@/assets/logo/happylinkLogo.svg"
                min-height="120"
                min-width="150"
                max-height="120"
                max-width="150"
                src="@/assets/logo/happylinkLogo.svg"
            ></v-img>
            
  <v-spacer></v-spacer>
  <BuzzMenu/>
  <v-spacer class="hidden-md-and-up"></v-spacer>

  <div class="hidden-sm-and-down">
  <v-menu location="center">
      <template v-slot:activator="{ props }">
        <v-btn
          dark
          v-bind="props"
          prepend-icon="mdi-phone mdi-dark"
        >
        <span style="color: #7A7A7A;">  (067)131-90-72 </span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <a href="tel:0671319072" style="text-decoration: none; color:steelblue;">(067)131-90-72</a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a href="tel:0731319072" style="text-decoration: none; color:steelblue;">(073)131-90-72</a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a href="tel:099189-37-10" style="text-decoration: none; color:steelblue;">(099)189-37-10</a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
  

  <v-btn flat color="my-grey" href="https://my.happylink.net.ua" target="_blank">
    <span class="hidden-sm-and-down">Кабінет</span>
    <i class="mdi-account-multiple-outline mdi 
    v-icon notranslate v-theme--light v-icon--size-default"
     aria-hidden="true" density="default"></i>
  </v-btn>


<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
    </v-toolbar>

    
</nav>



        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'top' : undefined"
          temporary
          :width="300"
          :style="{ opacity: '0.98', maxHeight: '100%'}"
        >
   
        <v-container>
        <span class="rotate-effect" @click.stop="drawer = !drawer">X</span>

      <v-list v-model:opened="open" style="margin-top: 40px;">
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-phone mdi-dark"
          >
          <span style="color: #7A7A7A;">  (067)131-90-72 </span>
        </v-list-item>
        </template>

      <v-list>
      <v-list-subheader>Контакти:</v-list-subheader>
      <v-list-item>
            <v-list-item-title>
              <a href="tel:0671319072" style="text-decoration: none;color:steelblue;">(067)131-90-72</a>
            </v-list-item-title>
      </v-list-item>
      
      <v-list-item>
            <v-list-item-title>
              <a href="tel:0731319072" style="text-decoration: none; color:steelblue;">(073)131-90-72</a>
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
            <v-list-item-title>
              <a href="tel:099189-37-10" style="text-decoration: none; color:steelblue;">(099)189-37-10</a>
            </v-list-item-title>
      </v-list-item>

       </v-list>

      </v-list-group>

    </v-list>

    <v-list v-model:opened="open">

<v-list-group>

  <template v-slot:activator="{ props }">
    <v-list-item
      v-bind="props"
    >
    <span style="color: #7A7A7A;">Тарифи</span>
  </v-list-item>
  </template>

<v-list>

<v-list-item>
<v-list-item-title @click="$router.push('/price/internet-price')">Інтернет</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/price/iptv')">IPTV</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/price/intercom')">Домофон</v-list-item-title>
</v-list-item>

 </v-list>
</v-list-group>

</v-list>

    <v-list v-model:opened="open">

<v-list-group>

  <template v-slot:activator="{ props }">
    <v-list-item
      v-bind="props"
    >
    <span style="color: #7A7A7A;">Послуги</span>
  </v-list-item>
  </template>

<v-list>

<v-list-item>
<v-list-item-title @click="$router.push('/service/price')">Інтернет</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/')">Оптоволокно</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/')">IPTV</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/service/intercom')">Домофон</v-list-item-title>
</v-list-item>

 </v-list>
</v-list-group>

</v-list>

<v-list>

<v-list-item>
<v-list-item-title @click="$router.push('/about  ')">Про компанію</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/shop')">Магазин</v-list-item-title>
</v-list-item>

<v-list-item>
<v-list-item-title @click="$router.push('/contact')">Контакти</v-list-item-title>
</v-list-item>

 </v-list>

    <v-list>
      <v-list-item> 
        <v-list-item-title>
        <i class="mdi-account-multiple-outline mdi v-icon notranslate v-theme--light v-icon--size-default"
     aria-hidden="true" density="default"></i> 
        <a href="https://my.happylink.net.ua" target="_blank" style="text-decoration: none;"> Особистий Кабінет </a>
        </v-list-item-title> 
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

        <v-card-text class="black--text">
          <span>Всі права захищені © 2014 - {{ new Date().getFullYear() }}</span>
      <strong class="text-uppercase grey--text">
      <span class="font-weight-light" style="color: #7A7A7A;"> Happy</span>
      <span style="color: #FED100;">link</span>
      </strong>
        </v-card-text>
      </v-container>
  </v-navigation-drawer>
      
   
  </template>
  
  
<script>
export default {
  name: 'AppHeader',
  data: () => ({
    drawer: false,
    groupPhone: false,
    open: ['Контакти'],
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
methods: {
}
}
</script>

  
  <style scoped>
  .v-app-bar {
    background-color: #fff;
  }

  .rotate-effect {
  color: #7A7A7A;
  position: fixed;
  top: 17px; /* Adjust top position as needed */
  right: 23px; /* Adjust right position as needed */
  font-size: 1.7em;
  font-weight: 500;
  transform: rotate(90deg);
  transition: transform 0.5s ease; /* Smooth transition for transform property */
}

.rotate-effect:hover {
  transition-property: none;
  transform: rotate(180deg); /* Rotate the span 180 degrees on click */
  transition: transform 0.5s ease; /* Apply the same transition */
}
.rotate-effect:checked {
  transition-property: none;
  transform: rotate(180deg); /* Rotate the span 180 degrees on click */
  transition: transform 0.5s ease; /* Apply the same transition */
}
  </style>
  