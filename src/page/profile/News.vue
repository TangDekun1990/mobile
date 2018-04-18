<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="消息中心">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item>    
    </mt-header>
    <!-- body -->
    <div class="flex-wrapper">
      <div class="newslist">
        <div class="ui-image-wrapper">
          <img src="../../assets/image/change-icon/e12_logistics@2x.png">
        </div>
        <div class="flex-right">
          <h3>订单消息</h3>
          <span>订单已签收！您购买的2016年文艺小白鞋夏季新款...</span>
        </div>
      </div>
      <div class="newslist">
        <div class="ui-image-wrapper">
          <img src="../../assets/image/change-icon/e12_message@2x.png">
        </div>
        <div class="flex-right">
          <h3>通知消息</h3>
          <span>今日店铺有新品上架哦！</span>
        </div>
      </div>
      <div class="newslist">
        <div class="ui-image-wrapper">
          <img src="../../assets/image/change-icon/e12_service@2x.png">
        </div>
        <div class="flex-right">
          <h3>客服消息</h3>
          <span>在线客服咨询时间为08:00-22:00 </span>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1) 
      },
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .header {
      @include header;
      border-bottom: 1px solid #E8EAED;
    }
    .flex-wrapper {
      background:rgba(255,255,255,1);
      .newslist {
        display: flex;
        width: auto;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        position: relative;
        border-bottom:1px solid #E8EAED;
        height: 80px;
        box-sizing: border-box;
        .ui-image-wrapper {
          img {
            width:50px;
            height:50px;
            margin-right: 15px;
          } 
        }
        .flex-right {
          width:100%;
          h3 {
            font-size:14px;
            color: #4E545D;
            padding-bottom:10px;
          }
          span {
            font-size: 12px;
            color: #7C7F88;
          }
        }
      }
    }
  }
</style>

