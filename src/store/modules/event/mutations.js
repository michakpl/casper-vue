import Vue from 'vue'

import {
  ALL
} from './mutation-types'

export default {
  [ALL] (state, { events, pagination }) {
    state.all = events
    state.pagination = pagination
  }
}
