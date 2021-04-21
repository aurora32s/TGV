import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css
import './assets/css/css.css'
import './assets/css/layout.css'

// utils
import util from './utils/commonUtil.js'
Vue.mixin(util)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
