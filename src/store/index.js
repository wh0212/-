import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    active:true
  },
  mutations: {
    act(state){
      state.active= false
    }
  },
  actions: {
  },
  modules: {
  }
})
