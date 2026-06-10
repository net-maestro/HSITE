import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // { id, name, price, quantity, type (device|service), ...other }
    isOpen: false, // Controls the CartDrawer visibility
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  },
  
  actions: {
    toggleCart(value) {
      this.isOpen = value !== undefined ? value : !this.isOpen
    },

    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveToStorage()
    },
    
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveToStorage()
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeItem(productId)
        } else {
          this.saveToStorage()
        }
      }
    },
    
    clearCart() {
      this.items = []
      this.saveToStorage()
    },
    
    saveToStorage() {
      localStorage.setItem('happylink_cart', JSON.stringify(this.items))
    },
    
    loadFromStorage() {
      const stored = localStorage.getItem('happylink_cart')
      if (stored) {
        try {
          this.items = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e)
        }
      }
    }
  }
})
