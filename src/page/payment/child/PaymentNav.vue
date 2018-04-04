<template>
  <div class="page-navbar">   
    <mt-navbar class="page-part" v-model="selected">  
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
      <mt-tab-item id="3">待发货</mt-tab-item>
      <mt-tab-item id="4">待收货</mt-tab-item>
      <mt-tab-item id="5">待评价</mt-tab-item>
    </mt-navbar>  
    <label class="payment" >等待付款</label>  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="1">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <img src="../../../assets/image/change-icon/default_image_02@2x.png">
          <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
    </mt-tab-container> 
    <mt-navbar class="navinfo" v-model="selected"><p>(共计3件商品) 合计 : AED 518</p></mt-navbar>
    <mt-button type="default" class="button">取消订单</mt-button>
    <mt-button type="default"  class="button buttonbottom">去支付</mt-button> 
  </div>  
</template>

<script>
  export default {
    name:'page-navbar',
    data() {
      return {
        selected: '2'  
      }
    },
    created() {
      let id = this.$route.query.id;
      console.log(id);
    },
  }
</script>

<style lang="scss" scoped>
  .mint-navbar {
    height:44px;
    line-height: 44px;
  }
  .mint-navbar[data-v-c4f2b68c] {
    margin-bottom: 10px;
  }
 
  .mint-navbar .mint-tab-item.is-selected {
    color:#F23030;
    border-bottom: 1px solid #F23030;
  }
  
  span {
    font-size: 14px;
    margin-left: 295px;
  }
  p {
    margin-left: 135px;
  }
  .mint-cell-text {
    margin-right: 285px;
  } 
  .mint-tab-container-item img {
    width: 60px;
    height: 60px;
    margin: 17px 5px 10px;
    background-color: #fff;
  }
  .mint-button--normal {
    left:155px;
  }
  .payment {
    display: flex;
    justify-content:flex-end;
    width: 100%;
    height: 44px;
    line-height: 44px;
    color: #48505D;
    font-size: 14px;
    background-color: #fff;
  }
  .button {
    width: 90px;
    height: 30px;
    font-size:14px;
    border-radius: 2px;
    margin-right: 15px;
  }
  .buttonbottom {
    color:#F23030;
    border:1px solid #F23030;
  }
 
</style>