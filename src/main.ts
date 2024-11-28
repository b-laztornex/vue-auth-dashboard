import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import axios from './plugins/axios';
import router from './router';
import { setupInterceptors } from './service/apiClient';

const app = createApp(App);

app.use(createPinia());
// Set up Axios interceptors with the router instance
setupInterceptors(router);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');
