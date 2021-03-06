import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/second',
      name: 'second',
      component: () => import('@/components/test-world.vue')
    }
  ]
});

export default router;
