<template>
  <div class="shop-filter mb-6">
    <!-- Сортировка через чипы -->
    <div class="d-flex justify-center flex-wrap gap-2 mb-4">
      <v-chip
        v-for="option in sortOptions"
        :key="option"
        :color="modelValue.sort === option ? 'secondary' : 'grey-lighten-3'"
        :text-color="modelValue.sort === option ? 'white' : 'grey-darken-2'"
        variant="flat"
        @click="updateFilter('sort', option)"
        class="font-weight-medium"
      >
        {{ option }}
      </v-chip>
    </div>

    <!-- Категории -->
    <div class="d-flex justify-center align-center gap-4 flex-wrap">
      <v-btn
        v-for="(category, index) in categories"
        :key="index"
        :variant="modelValue.category === category ? 'tonal' : 'text'"
        :color="modelValue.category === category ? 'secondary' : 'grey-darken-1'"
        class="category-btn text-none font-weight-bold"
        rounded="pill"
        @click="updateFilter('category', category)"
      >
        {{ category }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true // { sort: '', category: '' }
  },
  sortOptions: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const updateFilter = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>

<style scoped>
.category-btn {
  letter-spacing: 0.5px;
}
</style>
