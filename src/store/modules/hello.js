const hello = {
  state: {
    helloWorld: null
  },

  mutations: {
    updateHello(state, data) {
      console.info(data, 'updateHello');
      state.helloWorld = data;
    }
  },

  actions: {
    updateHello({ commit }, data) {
      console.info(data, 'actions');
      commit('updateHello', data);
    }
  }
};

export default hello;
