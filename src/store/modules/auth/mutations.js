import Vue from 'vue'

import {
  CHECK,
  LOGIN,
  LOGOUT,
  ERROR,
  CURRENT_USER
} from './mutation-types'

export default {
  [CHECK] (state) {
    state.authenticated = !!localStorage.getItem('access_token')
    if (state.authenticated) {
      if (localStorage.getItem('current_user')) {
        state.currentUser = JSON.parse(localStorage.getItem('current_user'))
      }
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
    localStorage.removeItem('current_user')
    Vue.$http.defaults.headers.common.Authorization = ''
  },
  [ERROR] (state, error) {
    if (error.hint) {
      state.error = error.hint
    } else if (error.message) {
      state.error = error.message
    } else {
      state.error = null
    }
  },
  [CURRENT_USER] (state, currentUser) {
    localStorage.setItem('current_user', JSON.stringify(currentUser))
    state.currentUser = currentUser
  }
}
