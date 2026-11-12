import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/global.scss';
import 'vue-loading-overlay/dist/css/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
