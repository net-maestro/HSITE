<template>
  <div class="checkout-page py-10">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="hl-card pa-6" rounded="xl" elevation="0">
            <h2 class="text-h5 font-weight-bold mb-6">Оформлення замовлення</h2>
            
            <v-form ref="formRef" v-model="isFormValid" @submit.prevent="submitOrder">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.name"
                    label="Ім'я та Прізвище"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Поле обов\'язкове']"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="formData.phone"
                    label="Номер телефону"
                    variant="outlined"
                    density="comfortable"
                    v-mask="'(###) ###-##-##'"
                    :rules="[v => !!v || 'Поле обов\'язкове', v => v && v.length === 14 || 'Некоректний номер']"
                    prepend-inner-icon="mdi-phone"
                    placeholder="(___) ___-__-__"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.email"
                    label="Email (необов'язково)"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.address"
                    label="Адреса підключення / доставки"
                    variant="outlined"
                    density="comfortable"
                    :rules="[v => !!v || 'Поле обов\'язкове']"
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.comment"
                    label="Коментар до замовлення"
                    variant="outlined"
                    rows="3"
                    auto-grow
                    prepend-inner-icon="mdi-comment"
                  ></v-textarea>
                </v-col>
              </v-row>
              
              <v-btn
                type="submit"
                color="primary"
                size="x-large"
                block
                class="mt-4 font-weight-bold"
                rounded="lg"
                :loading="isSubmitting"
                :disabled="cartStore.items.length === 0"
              >
                Підтвердити замовлення
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="hl-card pa-6" rounded="xl" elevation="0">
            <h3 class="text-h6 font-weight-bold mb-4">Ваше замовлення</h3>
            
            <div v-if="cartStore.items.length === 0" class="text-center text-grey py-4">
              Кошик порожній
            </div>
            
            <v-list v-else lines="two" bg-color="transparent" class="pa-0">
              <v-list-item
                v-for="item in cartStore.items"
                :key="item.id"
                class="px-0 border-bottom mb-2"
              >
                <v-list-item-title class="font-weight-medium text-wrap">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-1 d-flex justify-space-between align-center">
                  <span>{{ item.quantity }} шт. × {{ item.price }} ₴</span>
                  <span class="font-weight-bold text-black">{{ item.price * item.quantity }} ₴</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            
            <v-divider class="my-4"></v-divider>
            
            <div class="d-flex justify-space-between align-center text-h6">
              <span>До сплати:</span>
              <span class="font-weight-bold text-primary">{{ cartStore.totalPrice }} ₴</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Dialog -->
    <v-dialog v-model="showSuccess" max-width="400" persistent>
      <v-card rounded="xl" class="pa-4 text-center">
        <v-card-text>
          <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
          <h3 class="text-h5 font-weight-bold mb-2">Дякуємо!</h3>
          <p class="text-body-1 text-grey-darken-1">
            Ваше замовлення успішно оформлено. Наш менеджер зв'яжеться з вами найближчим часом.
          </p>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" variant="flat" rounded="pill" @click="finishCheckout">
            На головну
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'

const router = useRouter()
const cartStore = useCartStore()

const formRef = ref(null)
const isFormValid = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)

const formData = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  comment: ''
})

// ============================================================================
// ВІДПРАВКА ДАНИХ (АПІ)
// Ця функція збирає дані користувача та кошика в один об'єкт.
// Замініть `setTimeout` на реальний запит (напр., через axios або fetch).
// ============================================================================
const submitOrder = async () => {
  const { valid } = await formRef.value.validate()
  
  if (!valid || cartStore.items.length === 0) return
  
  isSubmitting.value = true
  
  // Create JSON payload
  const payload = {
    customer: { ...formData.value },
    cart: {
      items: cartStore.items,
      totalItems: cartStore.totalItems,
      totalPrice: cartStore.totalPrice
    },
    createdAt: new Date().toISOString()
  }
  
  console.log('--- ORDER PAYLOAD ---', JSON.stringify(payload, null, 2))
  
  // Імітація запиту на сервер (тут має бути ваш POST запит)
  setTimeout(() => {
    isSubmitting.value = false
    showSuccess.value = true
  }, 1000)
}

const finishCheckout = () => {
  cartStore.clearCart()
  showSuccess.value = false
  router.push('/')
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px dashed #e0e0e0;
}
</style>
