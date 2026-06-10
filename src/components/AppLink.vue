<!-- components/AppLink.vue -->
<template>
  <component
    :is="isExternal ? 'a' : 'nuxt-link'"
    :to="to"
    :href="isExternal ? href : undefined"
    :target="isExternal ? '_blank' : undefined"
    class="app-link"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" :icon="icon" size="20" class="me-2" />
    <span>{{ label }}</span>
  </component>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    to: String,
    href: String,
    icon: String,
    label: String,
    isExternal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isNuxtLink() {
      return !this.isExternal;
    },
  },
};
</script>

<style scoped>
.app-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.app-link:hover {
  background-color: #f8f9fa;
  color: #fed100;
  transform: translateX(4px);
}

.app-link .v-icon {
  color: #7a7a7a;
}

.app-link:hover .v-icon {
  color: #fed100;
}
</style>