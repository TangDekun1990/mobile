<template>
  <div class="container">
    <mt-header class="header" title="我的优惠券">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>          
    </mt-header>
    <div class="tips-wrapper">
      <label class="tips">可使用优惠券{{count}}张</label>
    </div>    
    <div class="list">
      <coupon-item class="item" v-for="item in items" :key="item"></coupon-item>
    </div>    
    <div class="submit" @click="unselect">
      <label class="text">不使用优惠券</label>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import CouponItem from './child/CouponItem'
export default {
  data() {
    return {
      count: 0,
      items: ['1', '2', '3', '4', '5', '6', '7', '8']
    }
  },
  components: {
    CouponItem,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },    
    unselect() {

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
    background-color: #F0F2F5;
  }
  .header {
    @include header;
  }  
  .tips-wrapper {
    height: 26px;
    background-color: #E8EAED;
    display: flex;    
    justify-content: center;
    align-items: center;
  }
  .tips {     
    font-size: 12px;
    color: #55595F;
    text-align: center;    
  }
  .list {
    flex: 1;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .item {
    height: 125px;
  }
  .submit {           
    height: 44px;
    margin-bottom: 0px;    
    background-color: #fff;    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #4E545D;
    font-size: 16px;
  }
</style>

