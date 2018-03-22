<template>
  <div class="container">
    <mt-header class="header" title="确认订单">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" title="联系客服" v-on:onclick="rightClick">
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
    rightClick() {
      // TODO:
    }
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
  }
</style>

