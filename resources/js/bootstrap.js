window._ = require('lodash');

window.axios = require('axios');
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type':'application/json',
    'Accept':'application/json'
};
window.axios.defaults.withCredentials = true;

//vue
import { createApp } from 'vue';
import App from '../vue/App';
import router from '../vue/router';
import store from '../vue/vuex/store';

window.store = store;
window.state = store.state;

window.app = createApp(App).use(router).use(store);
window.vm = app.mount('#app');