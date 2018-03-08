<template>
  <div>
    <h1>个人中心</h1>
    <router-link to='/auth'>登录</router-link>
    <Tabbar></Tabbar>
  </div>  
</template>

<script>
import Tabbar from '../common/Tabbar.vue'
export default {
  name: 'Profile',
  components: {
    Tabbar,
  }
}
</script>

<style scoped>

</style>


