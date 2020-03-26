import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courseList:[]
  },
  mutations: {
    course(state,data){
      state.courseList = data
    }
  },
  actions: {
  },
  modules: {
  }
})
