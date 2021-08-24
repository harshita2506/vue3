import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import { store } from "@/modules/HR/Leaves/Store/index";
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
