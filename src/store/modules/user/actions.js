import Vue from 'vue'
import * as types from './mutation-types'

export const register = ({ commit }, payload) => {
  Vue.router.push({
    name: 'login.index'
  })
}

export default {
  register
}
