import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './router'
import { ROUTERMODE } from '../config/env'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: ROUTERMODE,
  // base: '/wenchao/',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
});

export default router;