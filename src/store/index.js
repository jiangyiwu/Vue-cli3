import Vue from 'vue';
import Vuex from 'vuex';
import hello from './modules/hello';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    hello
  }
});

export default store;
