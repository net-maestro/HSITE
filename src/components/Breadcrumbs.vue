<!-- src/components/Breadcrumbs.vue -->
<template>
    <v-breadcrumbs >
      <v-spacer></v-spacer>
      <v-breadcrumbs-item v-if="previousRoute" :to="previousRoute.path">
      {{ previousRoute.name }} <span v-if="previousRoute.name">/</span>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :disabled="index === breadcrumbs.length - 1"
        :to="breadcrumb.path"
      >
      {{ breadcrumb.name}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import store from '@/store';
  
  export default {
    name: 'Breadcrumbs',
    setup() {
      const route = useRoute();
  
      const breadcrumbs = computed(() => {
        let matched = route.matched.filter((route) => route.name);
        return matched.map((route) => ({
          name: route.name,
          path: route.path,
        }));
      });
  
      const previousRoute = computed(() => store.previousRoute);
  
      return { breadcrumbs, previousRoute };
    },
  };
  </script>
  
  <style scoped>
  .v-breadcrumbs-item {
    text-decoration: none;
  }
  </style>
  