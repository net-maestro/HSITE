<template>
  <v-navigation-drawer
    v-model="cartStore.isOpen"
    location="right"
    temporary
    width="400"
    class="cart-drawer"
  >
    <div class="d-flex flex-column h-100">
      <v-toolbar color="primary" class="text-white">
        <v-toolbar-title class="font-weight-bold">
          Кошик ({{ cartStore.totalItems }})
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="cartStore.toggleCart(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="flex-grow-1 overflow-y-auto pa-4">
        <div v-if="cartStore.items.length === 0" class="text-center mt-10 text-grey">
          <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-cart-outline</v-icon>
          <div class="text-h6">Ваш кошик порожній</div>
          <div class="text-body-2 mt-2">Додайте товари або послуги, щоб оформити замовлення.</div>
        </div>

        <v-list v-else lines="two" bg-color="transparent">
          <v-list-item
            v-for="item in cartStore.items"
            :key="item.id"
            class="mb-3 cart-item-card"
          >
            <template v-slot:prepend>
              <v-avatar rounded="lg" size="64" color="grey-lighten-4">
                <v-img v-if="item.img" :src="item.img" cover></v-img>
                <v-icon v-else>mdi-package-variant</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="font-weight-bold text-wrap line-clamp-2">
              {{ item.name }}
            </v-list-item-title>
            
            <v-list-item-subtitle class="mt-1 d-flex align-center justify-space-between">
              <span class="text-primary font-weight-bold">{{ item.price }} ₴</span>
              
              <div class="quantity-controls d-flex align-center">
                <v-btn
                  icon="mdi-minus"
                  size="x-small"
                  variant="text"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                ></v-btn>
                <span class="mx-2 font-weight-medium">{{ item.quantity }}</span>
                <v-btn
                  icon="mdi-plus"
                  size="x-small"
                  variant="text"
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                ></v-btn>
              </div>
            </v-list-item-subtitle>

            <template v-slot:append>
              <v-btn
                icon="mdi-delete-outline"
                color="error"
                variant="text"
                size="small"
                @click="cartStore.removeItem(item.id)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <div class="pa-4 bg-grey-lighten-5" v-if="cartStore.items.length > 0">
        <div class="d-flex justify-space-between mb-4 align-center">
          <span class="text-h6 text-grey-darken-1">Разом:</span>
          <span class="text-h5 font-weight-bold text-primary">{{ cartStore.totalPrice }} ₴</span>
        </div>
        <v-btn
          block
          color="secondary"
          size="x-large"
          class="font-weight-bold"
          rounded="lg"
          @click="checkout"
        >
          Оформити замовлення
        </v-btn>
        <v-btn
          block
          variant="text"
          color="grey"
          class="mt-2"
          @click="cartStore.clearCart"
        >
          Очистити кошик
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const checkout = () => {
  cartStore.toggleCart(false)
  router.push('/checkout') // We'll need to create this route
}
</script>

<style scoped>
.cart-item-card {
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background: white;
}
.quantity-controls {
  background: #f5f5f5;
  border-radius: 20px;
  padding: 2px;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
