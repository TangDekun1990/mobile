<template>
  <div class="container">
    <mt-header class="header" title="购买成功">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <img class="photo" src="../../assets/image/change-icon/bg-order@2x.png">
    <label class="title">购买成功</label>
    <label class="subtitle">请耐心等待商品送货上门</label>
    <div class="action-wrapper">      
      <gk-button class="button left-button" type="secondary" v-on:click="goDetail">订单详情</gk-button>
      <gk-button class="button right-button" type="primary" v-on:click="goShopping">继续购物</gk-button>
    </div>    
  </div>
</template>

<script>
import { HeaderItem, Button } from '../../components/common'
import { Header, MessageBox } from 'mint-ui'
import { ENUM } from '../../config/enum'
export default {
  methods: {
    goBack() {      
      this.$router.push({ name: 'order', params: { order: ENUM.ORDER_STATUS.PAID}});
    },
    goDetail() {
      let order = this.$route.params.order
      let orderId = order ? order.id : null
      this.$router.push({ name: 'orderDetail', params: {orderDetail: orderId, isFromPay: true}})      
    },
    goShopping() {
      this.$router.push('/home')
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
    background-color: $mainbgColor;
  }
  .header {
    @include header;
  }
  .photo {
    width: 100%;
    height: 187px;
  }
  .title {
    color: #323232;
    font-size: 22px;
    margin-top: 40px;
    text-align: center;
  }
  .subtitle {
    color: #5F5F5F;
    font-size: 14px;
    margin-top: 13px;
    text-align: center;
  }
  .action-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    margin-top: 54px;
  }
  .button {      
    @include button; 
    width: 125px;     
  }
  .left-button {
    margin-left: 40px;
    background-color: #F6F6F6;
  }
  .right-button {
    margin-right: 40px;
  }  
</style>


