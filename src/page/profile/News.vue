<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="消息中心">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item>    
    </mt-header>
    <!-- body -->
    <div class="flex-wrapper">
      <div class="newslist"  v-on:click="getOrderMessage()">
        <div class="ui-image-wrapper">
          <img src="../../assets/image/change-icon/e12_logistics@2x.png">
        </div>
        <div class="flex-right">
          <h3>订单消息</h3>
          <span>{{orderMessage.content}}</span>
        </div>
      </div>
      <div class="newslist" v-on:click="getNoticeMessage()">
        <div class="ui-image-wrapper">
          <img src="../../assets/image/change-icon/e12_message@2x.png">
        </div>
        <div class="flex-right">
          <h3>通知消息</h3>
          <span>{{NoticeMessage.content}}</span>
        </div>
      </div>
      <div class="newslist" v-on:click="getServiceMessage()">
        <div class="ui-image-wrapper">
          <img src="../../assets/image/change-icon/e12_service@2x.png">
        </div>
        <div class="flex-right">
          <h3>客服消息</h3>
          <span>在线客服咨询时间为08:00-22:00 </span>
          <img src="../../assets/image/change-icon/b0_indicator_active@2x.png">
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import {messageOrderList, messageSystemList } from '../../api/network/message' // 订单消息 //通知消息
  export default {
    data() {
    return {
      NoticeMessage: [],
      orderMessage: [],
    }
  },
    created() {
      this.getmessageSystemList();
      this.getmessageOrderList();
    },
    methods: {
      goBack() {
        this.$router.go(-1) 
      },
      // 订单消息
      getOrderMessage() {
        this.$router.push('newsOrderMessage')
      },
      // 获取订单消息列表数据
      getmessageOrderList() {
        messageOrderList(1, 10).then( res => {
          if(res) {
            this.orderMessage = res.messages[0];
          }
        })
      },
      // 通知消息
      getNoticeMessage() {
        this.$router.push('newsNoticeMessage')
      },

      // 获取通知消息数据
      getmessageSystemList() {
        messageSystemList(1, 10).then( res => {
          if(res) {
            this.NoticeMessage = res.messages[0];
          }
        })
      },
      // 客服消息
      getServiceMessage() {
        console.log('客服消息')
      }
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
        padding: 15px 19px 15px 15px;
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
          overflow: hidden;
          h3 {
            font-size:14px;
            color: #4E545D;
            padding-bottom:10px;
          }
          span {
            font-size: 12px;
            color: #7C7F88;
            overflow: hidden;
            text-overflow: ellipsis;   
            white-space: nowrap;
            display: block;
          }
          img{
            width: 6px;
            height: 6px;
            position: absolute;
            right: 19px;
            top: 50%;
          }
        }
      }
    }
  }
</style>

