<!-- OrderNav.vue -->
<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
      <mt-tab-item id="3">待发货</mt-tab-item>
      <mt-tab-item id="4">待收货</mt-tab-item>
      <mt-tab-item id="5">待评价</mt-tab-item>
    </mt-navbar>
    <mt-navbar class="navinfo" v-model="selected"><span>等待收货</span></mt-navbar>
    <mt-tab-container v-model="selected" v-on:onclick="OrderDetail">
      <mt-tab-container-item id="1"> <mt-cell v-for="n in 3" 
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4"
          <img src="../../../assets/image/change-icon/default_image_02@2x.png">
          <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" 
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 4" 
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <mt-cell v-for="n in 6" 
        <img src="../../../assets/image/change-icon/default_image_02@2x.png">
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-navbar class="navinfo" v-model="selected"><p>(共计3件商品) 合计 : AED 518</p></mt-navbar>
    <mt-button type="default">取消订单</mt-button>
    <mt-button type="default">去支付</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected:1,
    }
  },
  methods: {
    OrderDetail() {      
      this.$router.push('OrderDetail')
    },
  }
  
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
 .mint-tab-container {
    margin-top:10px;
  } 
  .mint-tab-item-label {
    font-size:14px;
  }
  .mint-navbar .mint-tab-item.is-selected {
    color:#F23030;
    border-bottom: 1px solid #F23030;
  }
  .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0px;
  }
  span {
    font-size: 14px;
    margin-left: 295px;
  }
  p {
    margin-left: 135px;
  }
  .mint-button .mint-button--default .mint-button--normal {
    margin-right: 150px;
  } 
  .mint-tab-container-item img {
    width: 60px;
    height: 60px;
    padding: 0px 5px;
  }
  .mint-button--normal {
    left:185px;
  }
</style>



