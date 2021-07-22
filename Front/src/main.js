import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from "./store/index"


import '@fortawesome/fontawesome-free/js/all'
console.log(store)
createApp(App)
    .use(store)    
    .use(router)
    .mount('#app')
