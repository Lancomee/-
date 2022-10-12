import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import libJS from '@/components/lib/lib.js'
import i18n from '@/lang'
import *as XLSX from 'xlsx/xlsx.mjs'
import directives  from '@/directives/index'
import '@/icons' // icon
import '@/permission' // permission control 导航守卫
import Print from 'vue-print-nb'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 如果当前环境是生产环境，就是用mock
// 
Vue.use(XLSX)
// set ElementUI lang to EN
Vue.use(libJS)
Vue.use(ElementUI, { 
  i18n:(key,value) => i18n.t(key,value)
 })
Object.keys(directives).forEach((item)=>{
  Vue.directive([item],directives[item])
})

 Vue.prototype.$bus = new Vue()
// console.log(Vue.prototype.$bus);
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(Print)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
