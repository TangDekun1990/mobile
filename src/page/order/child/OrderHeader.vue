<!-- OrderHeader.vue -->
<template>
  <div class="container">
    <mt-header class="header" title="我的订单">
      <header-item slot="left" v-bind:isBack = true  v-on:onclick="goBack">
      </header-item>    
    </mt-header> 
  </div>
</template>

<script>
import { HeaderItem } from '../../../components/common'
import { Header } from 'mint-ui'

export default { 
  methods: {  
    goBack() {
      let isFromHome = this.$route.params.isFromHome
      if (isFromHome) {
        this.$router.go(-1)
      } else {
        this.$router.push('/profile') 
      }      
    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .header {
    @include header;
    border-bottom: 1px solid #E8EAED;
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 101;
  }
</style>
<style>
  .icon {
    vertical-align: middle;
  }
</style>
















