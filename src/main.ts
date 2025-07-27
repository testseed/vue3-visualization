import '@/assets/main.css'
import pinia from './stores'
import { createApp } from 'vue'


import App from './App.vue'
import router from './router'
import mapApp from '@/map/app-map.vue'
const app = createApp(App)
app.component('mapApp', mapApp)
app.use(router)
app.use(pinia)
app.mount('#app')
