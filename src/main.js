import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "./util/fetch"
import * as filters from "./util/filter"
import plugins from './util/plugins'
import qrcode from 'qrcode'
import 'lib-flexible'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "每时每课"
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
Vue.prototype.$pub = plugins;
Vue.prototype.$qrcode = qrcode;
Vue.prototype.$theme_color = "#eb6100"
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
