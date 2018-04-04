<!--OrderDetail -->
<template>
  <div class="container">
    <mt-header class="header" title="订单详情">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>   
    </mt-header>
    <order-detail-body></order-detail-body>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import OrderDetailBody from '../order/child/OrderDetailBody'
export default {
 components: {
   OrderDetailBody
 },
  methods: {
    goBack() {
      this.$router.go(-1)
    },    
  },
}
</script>

<style lang="scss" scoped>
  .header {
    @include header;
  }
</style>