import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('./pages/entry.vue');

Vue.use(VueRouter);
console.info(process.env);
const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
});

export default router;
