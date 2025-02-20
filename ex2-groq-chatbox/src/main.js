// src/main.js
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'

const myApp = createApp(App)
myApp.use(Quasar)
myApp.use(router)
myApp.mount('#app')
