import Vue from 'vue'
import * as types from './mutation-types'
import UserProxy from '@/proxies/UserProxy'

const proxy = new UserProxy()

export const register = ({ commit }, payload) => {
  proxy.register(payload)
    .then((response) => {
      Vue.router.push({
        name: 'login.index'
      })
    })
    .catch((response) => {
      return response
    })
}

export default {
  register
}
