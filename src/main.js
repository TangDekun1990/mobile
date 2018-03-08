import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './router/router'
import envConst from './config/const'

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')