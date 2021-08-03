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
<<<<<<< HEAD
    //.component('pagination', Pagination)
=======

>>>>>>> 2cbfda87f42fdefcf0a6cfa346051b099c359d08
    .mount('#app')
