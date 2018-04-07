<template>
  <div class="container">
    <mt-header class="header" title="收银台">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="leftClick">
      </header-item>    
    </mt-header>
    <div class="top-wrapper">
      <div class="row-wrapper title-wrapper">
        <img class="icon" src="../../assets/image/change-icon/b10_order@2x.png" />
        <label class="title">订单提交成功，请选择付款方式</label>        
      </div>
      <div class="row-wrapper subtitle-wrapper">
        <label class="subtitle">合计：</label>
        <label class="price">AED 1190</label>
      </div>      
    </div>
    <div class="item-wrapper">
      <div class="item-left-wrapper">
        <img class="icon" src="../../assets/image/change-icon/b10_payment@2x.png" />
        <label class="item-title">货到付款</label>        
      </div>
      <div class="item-right-wrapper">
        <label class="item-subtitle">货到付款</label>        
        <img class="indicator" src="../../assets/image/change-icon/c1_choose@2x.png" />        
      </div>      
    </div>
    <div class="action-wrapper">
      <gk-button class="button" type="primary" v-on:click="pay">立即付款</gk-button>
    </div>
  </div>
</template>

<script>
import { HeaderItem, Button } from '../../components/common'
import { Header, MessageBox } from 'mint-ui'
export default {
  methods: {
    leftClick() {
      MessageBox.confirm('商品一眨眼就没了 确定放弃支付吗？').then(action => {        
        this.goBack() 
      })
    },  
    goBack() {
      this.$router.go(-1) 
    },
    pay() {
      this.$router.push('/paySucceed')
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
    background-color: $mainbgColor;
  }
  .header {
    @include header;
    border-bottom: 1px solid $lineColor;
  }
  .top-wrapper {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
  }
  .row-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .title-wrapper {
    height: 64px;
  }
  .subtitle-wrapper {
    height: 30px;
    margin-top: 10px;
  }
  .icon {
    width: 24px;
    height: 24px;
    margin-left: 16px;
    margin-right: 10px;
  }
  .title {
    font-size: 16px;
    color: #3C3C3C;    
  }
  .subtitle {
    font-size: 16px;
    color: #4D4D4D; 
    margin-left: 50px; 
  }
  .price {
    font-size: 16px;
    color: #F23030;    
  }
  .item-wrapper { 
    height: 62px;
    margin-top: 15px;   
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lineColor; 
  }
  .item-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
  }
  .item-left-wrapper {  
    flex: 1;  
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .item-right-wrapper {
    flex: 1;    
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .item-title {
    font-size: 16px;
    color: #3C3C3C;
  }  
  .item-subtitle {
    font-size: 16px;
    color: #8C8C8C;
    margin-right: 5px;
    text-align: right;
  }
  .indicator {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    margin-right: 16px;      
  }
  .action-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-top: 45px;
  }
  .button { 
    @include button;  
    width: 180px;
    height: 50px;
  }
</style>


