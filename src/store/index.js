import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import * as getters from './getter'
import mutations from './mutations'
import actions from './actions'

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
import delivery from './modules/delivery'
import search from './modules/search'
import profile from './modules/profile'
import order from './modules/order'
import tabBar from './modules/tabbar'
import checkout from './modules/checkout'
import news from './modules/news'

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
		invoice,
		delivery,
		search,
		profile,
		order,
		tabBar,
		checkout,
		news
	},
	getters: getters,
	actions,
	mutations,
	plugins: [
		createPersistedState({
			key: 'vuex',
			paths: ['auth', 'config', 'region', 'news', 'address', 'shipping','coupon', 'cart', 'checkout', 'delivery', 'invoice', 'profile']
		})
	]
})
