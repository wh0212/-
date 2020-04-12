import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courseList: [],
    smslogin: {},
    OtoSear: null,
    Paersear: null
  },
  mutations: {
    course(state, data) {
      state.courseList = data
    },
    smslogin(state, data) {
      state.smslogin = data
    },
    OTO_sear(state, data) {
      state.OtoSear = data
    },
    Paer_sear(state, data) {
      state.Paersear = data
    }
  },
  actions: {
  },
  modules: {
  }
})
