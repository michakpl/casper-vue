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

export const current = ({ commit }) => {
  proxy.currentUser()
    .then((response) => {
      commit(types.CURRENT_USER, response)
    })
}

export default {
  register
}
