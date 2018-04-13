import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import store from './store/index'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'

// 使用moment处理日期格式
import Moment from 'moment'
Vue.filter('convertTime', function (timeStr) {
  return Moment(timeStr).format('YYYY-MM-DD hh:mm:ss')
})
// 处理商品名称
Vue.filter('mySubstr',function(titleStr,num) {
	if(titleStr.length <= num) return titleStr;
	else
		return titleStr.substr(0,num) + '...'
})

// 处理金额
Vue.filter('money', function(val) {
	val = val.toString().replace(/\$|\,/g,'')
	if(isNaN(val)) {
		val = "0";  
	} 
	let sign = (val == (val = Math.abs(val)))
	val = Math.floor(val*100+0.50000000001)
	let cents = val%100;
	val = Math.floor(val/100).toString()
	if(cents<10) {
		 cents = "0" + cents
	}
	for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
			val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
	}
	return (((sign)?'':'-') + val + '.' + cents)
})

import 'swiper/dist/css/swiper.css'
import App from './App.vue'
import routes from './router/router'
import { ROUTERMODE } from './config/env'
import utils from './util/util'

import './assets/style/reset.scss'
import './assets/style/common.scss'

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

// router.beforeEach((to, from, next) => {
// 	const toDepth = to.path.split('/').length
// 	const fromDepth = from.path.split('/').length
// 	if (toDepth < fromDepth) {
// 		from.meta.keepAlive = false
// 		to.meta.keepAlive = true
// 	}
// 	next()
// })

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
