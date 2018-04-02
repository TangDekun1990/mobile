import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import * as getters from './getter'

import auth from './modules/auth'
import config from './modules/config'
import address from './modules/address'
import region from './modules/region'
import detail from './modules/detail'
import shipping from './modules/shipping'
import coupon from './modules/coupon'
import invoice from './modules/invoice'
import product from './modules/product'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    config,
    address,
    region,
    detail,
    product,
    cart,
    shipping,
    coupon,
    invoice
  },
  getters: getters,
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['auth', 'config', 'region']
    })
  ]
})
