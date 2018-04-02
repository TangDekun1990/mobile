import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import store from './store/index'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'

import 'swiper/dist/css/swiper.css'
import App from './App.vue'
import routes from './router/router'
import { ROUTERMODE } from './config/env'
import utils from './util/util'

import './assets/style/reset.scss'

Vue.config.productionTip = false

const router = new VueRouter({
	routes,
	mode: ROUTERMODE,
	// base: '/wenchao/',
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

Vue.use(VueRouter)
Vue.use(Mint)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)

Vue.prototype.utils = utils;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
