import Vue from 'vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueResource from 'vue-resource'

import Mint from 'mint-ui'
import * as qiniu from 'qiniu-js'

import App from './App.vue'

import router from './router/index'
import store from './store/index'
import utils from './util/util'
import wxApi from './util/wxapi'

import 'swiper/dist/css/swiper.css'
import 'mint-ui/lib/style.css'
import './assets/style/reset.scss'
import './assets/style/common.scss'
import './assets/style/my-mint.scss'

Vue.config.productionTip = false

// 使用moment处理日期格式
import Moment from 'moment'
Vue.filter('convertTime', function (timeStr) {
	return Moment(timeStr).format('YYYY-MM-DD HH:mm:ss')
})

router.beforeEach((to, from, next) => {
	let metaData = to.meta;
	if (metaData.setIsShowTabBar) {
		for (const key in to.params) {
			if (key == metaData.setIsShowTabBar) {
				metaData.isshowtabbar = parseInt(to.params[metaData.setIsShowTabBar]);
			}
		}
	}
	if (to.name == 'detail' && from.name) {
		window.location.reload();
	}
	next();
});

Vue.use(Mint)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(qiniu)
Vue.prototype.utils = utils;
Vue.prototype.wxApi = wxApi;

window.router = router;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
