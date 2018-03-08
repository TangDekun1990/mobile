import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/tabbar/Home.vue'
import Category from './components/tabbar/Category.vue'
import Cart from './components/tabbar/Cart.vue'
import Profile from './components/tabbar/Profile.vue'
import Tabbar from './components/common/Tabbar.vue'
import Signin from './components/auth/Signin.vue'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: App },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/cart', component: Cart },
  { path: '/profile', component: Profile },
  { path: '/hello', component: HelloWorld },
  { path: '/tabbar', component: Tabbar },
  { path: '/auth', component: Signin },
]

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')