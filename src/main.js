// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { router } from './routes'
import VueResource from 'vue-resource'
import auth from './services/auth'

Vue.use(VueRouter)
Vue.use(VueResource)
// use application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true
Vue.http.headers.common['Authorization'] = 'Bearer ' + auth.getToken()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  http: {
    root: '/'
  },
  template: '<App/>',
  components: { App }
})
