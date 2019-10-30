import Vue from 'vue';
import router from './route/router.js';
import App from './App.vue';
import store from '@/store/index.js';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#indexApp');
