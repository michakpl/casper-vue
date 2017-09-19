import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import auth from './modules/auth'
import user from './modules/user'
import event from './modules/event'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    user,
    event
  },

  strict: debug,

  plugins: debug ? [createLogger] : []
})
