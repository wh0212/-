import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "./util/fetch"
import * as filters from  "./util/filter"
import 'lib-flexible'
router.beforeEach((to, from, next) => {

  if (to.fullPath === "/custmoer") {
    localStorage.setItem("actbtn", false)
    store.active = false
  } else {
    localStorage.setItem("actbtn", true)
    store.active = true
  }
  next()
})
Vue.prototype.$http = http;
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// Vue.use(Vant);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
