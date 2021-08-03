import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '@fortawesome/fontawesome-free/js/all';

//import Pagination from 'v-pagination-3';

createApp(App)
    .use(store)
    .use(VueSweetalert2)  
    .use(router)
    //.component('pagination', Pagination)
    .mount('#app')
