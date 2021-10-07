// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import $ from 'jquery'

Vue.use(VueCookies)
Vue.use($)

// import axios from "axios";
// Vue.prototype.$axios = axios
// axios.defaults.baseURL = "http://localhost:8086"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
