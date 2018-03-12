<template>
  <div>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
  </div>  
</template>

<script>

export default {
  name: 'app',
  components: {
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
