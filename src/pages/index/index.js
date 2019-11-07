
import 'babel-polyfill';
import '@/pages/index/assets/style/main.scss';
import Vue from 'vue';
import router from './route/router.js';
import App from './App.vue';
import store from '@/store/index.js';

Vue.config.productionTip = false;

// 限制输入框内容为正整数
// 注意：1.type类型必须为text 2.返回字符串类型
Vue.directive('limitNaturalNumber', {
  inserted(el) {
    el.addEventListener('keyup', () => {
      el.value = el.value.replace(/[^\d]/g, '');
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#indexApp');
