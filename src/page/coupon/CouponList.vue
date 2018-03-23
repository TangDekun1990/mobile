<template>
  <div class="container">
    <mt-header class="header" title="我的优惠券">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>          
    </mt-header>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
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
    background-color: #F0F2F5;
  }
  .header {
    @include header;
  }
</style>

