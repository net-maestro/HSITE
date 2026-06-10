<template>
         <nav id="GoToHeader">
          <SpeedDial/>
        <v-toolbar :elevation="2" rounded  style="z-index: 999; position: fixed ; border-bottom: 3px solid #49CBD6">

        <!-- <v-avatar class="me-4"size="48" @click="home()">
         <v-img alt="Avatar"
          lazy-src="https://www.shareicon.net/data/128x128/2016/12/21/865536_cool_512x512.png"
          src="https://www.shareicon.net/data/128x128/2016/12/21/865536_cool_512x512.png">
          </v-img>
        </v-avatar> -->

        <!-- <v-divider 
          :thickness="1"
          class="border-opacity-100"
          color="primary"
          vertical>
        </v-divider> -->

        <v-toolbar-title class="text-uppercase grey--text" @click="$router.push('/')" style="cursor: pointer, visible !important;">
          <span class="font-weight-light" style="color: #49CBD6;">Happy</span>
          <span style="color: #FED100;">link</span>
        </v-toolbar-title>
       

        <v-spacer></v-spacer>

      <v-row class="v-toolbar__items hidden-sm-and-down">
          <v-col
           cols="12"
           class="py-2">

      <v-btn-toggle color="cyan-darken-1" >
        
  <v-btn flat  @click="$router.push('/service')">
    
    <span>Послуги</span>
    <i class="mdi-folder-open mdi 
    v-icon notranslate v-theme--light v-icon--size-default"
     aria-hidden="true" density="default"></i>
  </v-btn>

  <v-btn flat @click="$router.push('/blog')">
    <span>Новини</span>
    <i class="mdi-newspaper mdi 
    v-icon notranslate v-theme--light v-icon--size-default"
     aria-hidden="true" density="default"></i>
  </v-btn>

  <v-btn flat @click="$router.push('/shop')">
    <span>Пристрої</span>
    <i class="mdi-cellphone mdi 
    v-icon notranslate v-theme--light v-icon--size-default"
     aria-hidden="true" density="default"></i>
  </v-btn>

      </v-btn-toggle>
  

    </v-col>
  </v-row>
  <v-spacer class="hidden-sm-and-down"></v-spacer>

  <div class="hidden-sm-and-down">
  <v-menu location="start">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          dark
          v-bind="props"
          prepend-icon="mdi-phone"
        >
        <span style="color: #49CBD6;">  (067)131-90-72 </span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <a href="tel:0671319072" style="text-decoration: none;color: #49CBD6;">(067)131-90-72</a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a href="tel:0731319072" style="text-decoration: none; color:red;">(073)131-90-72</a>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <a href="tel:099189-37-10" style="text-decoration: none; color:#FED100;">(099)189-37-10</a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
  

  <v-btn flat color="grey" href="https://my.happylink.net.ua" target="_blank">
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
          :style="{ opacity: '0.95', maxHeight: '100%'}"
        >
   
        <v-container class="">
        <v-spacer></v-spacer>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <v-toolbar-title flat>
            <v-img
                lazy-src="https://www.shareicon.net/data/128x128/2016/12/21/865536_cool_512x512.png"
                max-height="60"
                max-width="100"
                src="https://www.shareicon.net/data/128x128/2016/12/21/865536_cool_512x512.png"
            ></v-img>
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
    
      <v-list v-model:opened="open">
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-phone"
          >
          <span style="color: #49CBD6;">  (067)131-90-72 </span>
        </v-list-item>
        </template>

      <v-list>
      <v-list-subheader>Контакти:</v-list-subheader>
      <v-list-item>
            <v-list-item-title>
              <a href="tel:0671319072" style="text-decoration: none;color: #49CBD6;">(067)131-90-72</a>
            </v-list-item-title>
      </v-list-item>
      
      <v-list-item>
            <v-list-item-title>
              <a href="tel:0731319072" style="text-decoration: none; color:red;">(073)131-90-72</a>
            </v-list-item-title>
      </v-list-item>

      <v-list-item>
            <v-list-item-title>
              <a href="tel:099189-37-10" style="text-decoration: none; color:#FED100;">(099)189-37-10</a>
            </v-list-item-title>
      </v-list-item>

       </v-list>

      </v-list-group>

    </v-list>

    <v-list>
      <v-list-item> <v-list-item-title @click="$router.push('/blog')"> Новини </v-list-item-title> </v-list-item>
      <v-list-item> <v-list-item-title @click="$router.push('/service')"> Послуги </v-list-item-title> </v-list-item>
      <v-list-item> <v-list-item-title @click="$router.push('/shop')"> Пристрої </v-list-item-title> </v-list-item>
      <v-list-item> <v-list-item-title> 
        <a href="https://my.happylink.net.ua" target="_blank" style="text-decoration: none;"> Особистий Кабінет </a>
        </v-list-item-title> </v-list-item>
    </v-list>

    <v-divider></v-divider>

        <v-card-text class="black--text">
          <span>Всі права захищені © 2014 - {{ new Date().getFullYear() }}</span>
      <strong class="text-uppercase grey--text">
      <span class="font-weight-light" style="color: #49CBD6;"> Happy</span>
      <span style="color: #FED100;">link</span>
      </strong>
        </v-card-text>
      </v-container>
  </v-navigation-drawer>
  
    
  </template>
  <script>
    export default {
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

