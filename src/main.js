import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import store from './store/index'

import App from './App.vue'
import routes from './router/router'
import envConst from './config/const'

// todo scss
import './style/reset.scss'

Vue.config.productionTip = false

const router = new VueRouter({
    routes,
    mode: envConst.routerMode,
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')