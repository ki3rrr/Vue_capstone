import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useStore } from './store'
const app = createApp(App)
app.use(createPinia()).use(router)
useStore().$subscribe((_, s) => localStorage.setItem('lcs-data', JSON.stringify(s)), { detached: true })
app.mount('#app')
