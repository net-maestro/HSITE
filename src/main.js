// Plugins
import { registerPlugins } from '@/plugins'

// Styles
import '@/assets/styles/variables.css'

// Components
import App from './App.vue'
import router from './router'
import maskDirective from './plugins/inputMask/maskDirective'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)

app.use(pinia)
app.use(router)

app.directive('mask', maskDirective)

app.mount('#app')
