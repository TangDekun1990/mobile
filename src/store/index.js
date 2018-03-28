import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as getters from './getter'
import auth from './modules/auth'
import config from './modules/config'
import detail from './modules/detail'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    config,
    detail
  },
  getters: getters,
  plugins: [
    createPersistedState({
      key: 'vuex',
      // paths: ['auth']
    })
  ]
})
