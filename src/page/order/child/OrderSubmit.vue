<!-- OrderSubmit.vue -->
<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="评论成功">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header> 
    <!-- body -->
    <div class="order-trade-body">
      <img src="../../../assets/image/change-icon/evaluate_suc@2x.png">
			<p>商品评论成功，感谢您给予的评价。</p>
			<div>
        <button v-on:click="goOrder()">再去逛逛</button>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from '../../../components/common'
import { Header } from 'mint-ui'

export default { 
  methods: {  
    goBack() {
      this.$router.go(-1); 
    },
    goOrder() {
      this.$router.push('home');
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
    .header {
      @include header;
    }
    .order-trade-body {
      vertical-align: middle;
      text-align: center;
      img {
        width:53px; 
        height:49px;              
        color:rgba(164,173,179,1);;
        padding:140px 161px 36px 161px;   
      }
      p {
        height:16px; 
        font-size:16px;
        font-family:'PingFangSC-Regular';
        color:rgba(124,127,136,1);
        line-height:16px;
        text-align: center;
        padding-bottom:28px;
      }
      button {
        width:200px;
        height:44px; 
        background:rgba(252,46,57,1);
        border-radius: 2px ; 
        margin:0 10px;
        border: none;
        font-size:16px;
        font-family:'PingFangSC-Regular';
        color:rgba(255,255,255,1);
        line-height:22px;          
      }
    }
  }
  
</style>