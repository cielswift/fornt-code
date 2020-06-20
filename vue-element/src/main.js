import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import htp from "./axitem/htp.js"

Vue.use(ElementUI,VueAxios,axios)

Vue.prototype.$axios = axios;
Vue.prototype.$htp = htp;

new Vue({
  el: '#app',
  render: h => h(App)
})
