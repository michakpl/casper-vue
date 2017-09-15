import Vue from 'vue'

import {
  CHECK,
  LOGIN,
  LOGOUT
} from './mutation-types'

export default {
  [CHECK] (state) {
    state.authenticated = !!localStorage.getItem('access_token')
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
  },
  [LOGIN] (state, token) {
    state.authenticated = true
    localStorage.setItem('access_token', token)
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  [LOGOUT] (state) {
    state.authenticated = false
    localStorage.removeItem('access_token')
    Vue.$http.defaults.headers.common.Authorization = ''
  }
}
