import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courseList: [],
    smslogin: {}
  },
  mutations: {
    course(state, data) {
      state.courseList = data
    },
    smslogin(state, data) {
      state.smslogin = data
    }
  },
  actions: {
  },
  modules: {
  }
})
