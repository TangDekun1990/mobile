<template>
  <div>
    <!--div id="app">
      <img src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>    
    </div-->
    <!--div>
      <p>router</p>
      <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/category">Category</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/hello">Hello</router-link></li>
        <li><router-link to="/tabbar">tabbar</router-link></li>
      </ul>
    </div-->
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
  </div>  
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  created: function() {
    console.log('App route is', this.$router)
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
