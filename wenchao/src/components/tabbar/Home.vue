<template>
  <div>
    <h1>首页</h1>
    <li><router-link to="/category">Category</router-link></li>
    <Tabbar></Tabbar>
  </div> 
</template>

<script>
import Tabbar from '../common/Tabbar.vue'
export default {
  name: 'Home',
  created: function() {
    console.log('home', this.$route)
  },
  components: {
    Tabbar,
  }
}
</script>

<style scoped>
</style>


