import Vue from 'vue'

import {
  CURRENT_USER
} from './mutation-types'

export default {
  [CURRENT_USER] (state, { currentUser }) {
    state.currentUser = currentUser
  }
}
