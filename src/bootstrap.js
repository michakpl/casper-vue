import Vue from 'vue'

Vue.config.debug = process.env.NODE_ENV !== 'production'

import axios from 'axios'

axios.defaults.baseURL = process.env.API_LOCATION
axios.defaults.headers.common.accept = 'application/json'

Vue.$http = axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return axios
  }
})

import VuexRouterSync from 'vuex-router-sync'
import store from '@/store'

store.dispatch('auth/check')

import VueRouter from 'vue-router'
import routes from '@/routes'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    next({
      name: 'login.index'
    })
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    next({
      name: 'home.index'
    })
  } else {
    next()
  }
})
VuexRouterSync.sync(store, router)

Vue.router = router

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/scss/app.scss'

Vue.use(BootstrapVue)

export default {
  router,
  axios
}
