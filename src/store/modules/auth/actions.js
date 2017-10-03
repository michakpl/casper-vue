import Vue from 'vue'
import * as types from './mutation-types'
import AuthProxy from '@/proxies/AuthProxy'
import UserProxy from '@/proxies/UserProxy'

const proxy = new AuthProxy()
const userProxy = new UserProxy()

export const check = ({ commit }) => {
  commit(types.CHECK)
}

export const login = ({ commit }, payload) => {
  proxy.login(payload)
    .then(({access_token}) => {
      commit(types.LOGIN, access_token)

      userProxy.currentUser()
        .then(({user}) => {
          commit(types.CURRENT_USER, user)
        })

      Vue.router.push({
        name: 'home.index'
      })
    })
}

export const logout = ({ commit }) => {
  commit(types.LOGOUT)

  Vue.router.push({
    name: 'login.index'
  })
}

export default {
  check,
  login,
  logout
}
