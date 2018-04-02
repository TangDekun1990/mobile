<!--OrderDetail -->
<template>
  <div class="container">
    <mt-header class="header" title="订单详情">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>   
    </mt-header>
    
    <goods-item class="item" v-for="item in items" :key="item"></goods-item>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
export default {
  data() {
    return {
      count: 0,
      items: ['1', '2', '3', '4', '5', '6', '7', '8']
    }
  },
  computed: {
    countDesc() {
      return '共' + this.count + '件'
    }
  },
  components: {
    GoodsItem,
  },
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
  }
  .header {
    @include header;
  }
  .item {
    height: 110px;
    background-color: #fff;
  }
</style>