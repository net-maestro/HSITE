<!-- src/components/Breadcrumbs.vue -->
<template>
  <div class="breadcrumbs-wrapper py-2 px-4 mb-6 rounded-lg d-flex align-center bg-white" v-if="route.path !== '/' && route.name !== 'Домашня'">
    
    <!-- Кнопка Назад (Історія) -->
    <v-tooltip text="Повернутися назад" location="top">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-arrow-left"
          variant="tonal"
          size="small"
          color="secondary"
          class="mr-4 back-btn"
          @click="goBack"
        ></v-btn>
      </template>
    </v-tooltip>

    <!-- Справжня ієрархія (Хлібні крихти) -->
    <v-breadcrumbs :items="breadcrumbItems" class="pa-0 flex-grow-1">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right" size="small" color="grey-lighten-1"></v-icon>
      </template>

      <template v-slot:title="{ item }">
        <div class="d-flex align-center breadcrumb-item" :class="{ 'text-primary font-weight-medium': !item.disabled, 'text-grey-darken-1': item.disabled }">
          <v-icon v-if="item.icon" size="small" class="mr-1" :color="item.disabled ? 'grey-darken-1' : 'primary'">{{ item.icon }}</v-icon>
          <span v-if="item.title" class="text-body-2">{{ item.title }}</span>
        </div>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const goBack = () => {
  // Використовуємо нативний History API для справжнього повернення назад
  if (window.history.length > 2) {
    router.back();
  } else {
    router.push('/');
  }
};

const breadcrumbItems = computed(() => {
  const items = [
    {
      title: 'Головна',
      disabled: route.path === '/',
      to: '/',
      icon: 'mdi-home-outline'
    }
  ];
  
  if (route.path !== '/') {
    // Аналізуємо URL для створення ієрархії
    const pathParts = route.path.split('/').filter(p => p);
    
    // Якщо ми в розділі тарифів
    if (pathParts[0] === 'price' && pathParts.length > 1) {
      items.push({
        title: 'Тарифи',
        disabled: false,
        to: '/price/internet-price', 
        icon: 'mdi-format-list-bulleted'
      });
    }

    // Поточна сторінка
    if (route.name && route.name !== 'Домашня') {
      items.push({
        title: route.meta?.title || route.name,
        disabled: true,
        to: route.path
      });
    }
  }
  
  return items;
});
</script>

<style scoped>
.breadcrumbs-wrapper {
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important;
  transition: all 0.3s ease;
  max-width: 100%;
  overflow-x: auto;
}

.breadcrumbs-wrapper:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.06) !important;
  border-color: #e0e0e0;
}

.back-btn {
  transition: transform 0.2s ease;
}

.back-btn:hover {
  transform: translateX(-3px);
}

.breadcrumb-item {
  transition: opacity 0.2s, color 0.2s;
}

.v-breadcrumbs-item--link .breadcrumb-item:hover {
  opacity: 0.8;
  color: var(--hl-secondary) !important;
}

/* Сховати скролбар для мобільних */
.breadcrumbs-wrapper::-webkit-scrollbar {
  display: none;
}
.breadcrumbs-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>