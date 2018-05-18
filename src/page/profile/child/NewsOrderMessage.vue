<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="订单消息">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <!-- body -->
    <div class="body">
      <div class="order-message-body" v-for="(item, index) in orderMessage" v-on:click="getOrderDetail(item.link)">
        <p>{{item.created_at * 1000| convertTime }}</p>
        <div class="order-track">
          <div class="arrow-left">
            <span>{{item.title}}</span>
            <div class="order-status"> 
              <div class="orderImage">
                <img :src="item.photo.thumb" v-if="item.photo != null">
                <img src="../../../assets/image/change-icon/default_image_02@2x.png" v-if=' item.photo == null'>
              </div>
              <p>{{item.content}}</p>
            </div>
          </div>
          <img class="arrow-right" src="../../../assets/image/change-icon/enter@2x.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from "../../../components/common";
import { Header } from "mint-ui";
import { messageOrderList } from "../../../api/network/message"; //订单消息列表
import { openLink } from "../../cardpage/deeplink";
export default {
  data() {
    return {
      orderMessage: []
    };
  },
  created() {
    this.getmessageOrderList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取订单消息列表数据
    getmessageOrderList() {
      messageOrderList(1, 10).then(res => {
        if (res) {
          this.orderMessage = res.messages;
        }
      });
    },
    // 从订单消息页面去订单详情页
    getOrderDetail(link) {
      openLink(this.$router, link);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .header {
    @include header;
    border-bottom: 1px solid #e8eaed;
    position: fixed;
    width: 100%;
    z-index: 1;
  }
  .body {
    width: 100%;
    position: absolute;
    top: 44px;
    .order-message-body {
      width: 100%;
      > p {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #7C7F88;
      }
      .order-track {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        margin: 0px 10px;
        .arrow-left {
           span {
            display: inline-block;
            padding: 12px 0px 0px 15px;
          }
          .order-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .orderImage {
              img {
                width: 60px;
                height: 60px;
                padding: 14px 10px 14px 15px;
              }
            }
            p {
              font-size: 13px;
              color: rgba(124, 127, 136, 1);
              width: 240px;
              height: 36px;
            }
          }
        }
        .arrow-right {
            width: 5px;
            height: 10px;
            padding-right: 12px;
            padding-left: 13px;
          }
      }
    }
  }
}
</style>


