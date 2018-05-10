<!-- OrderTrack.vue -->
<template>
  <div class="container">
    <mt-header class="header" title="订单跟踪">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()"></header-item>    
    </mt-header> 
    <div class="order-track-body">
        <p class="number">订单编号：{{trackList.code}}</p>
        <p class="source">承运来源：{{trackList.vendor_name}}</p>
    </div>

    <div class="logistics">
        <div class="info">
          <div class="match" v-for="(item,index) in trackList.status" v-bind:key="item.id" v-bind:class="{'line': index == trackList.status.length-1}">
            <img class="imgone" src="../../../assets/image/change-icon/e5_dot_red@2x.png" v-if="index == 0">
            <img class="imgthree" src="../../../assets/image/change-icon/e5_dot@2x.png" v-if="index != 0">
            <div>
                <p>{{item.content}}</p>
                <span>{{item.datetime * 1000 | convertTime}}</span>
            </div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import { HeaderItem } from '../../../components/common'
import { Header } from 'mint-ui'
import { shippingStatusGet } from '../../../api/network/shipping' //物流状态查询
import { ENUM } from '../../../config/enum'
export default { 
  data() {
    return {
      trackList:{},
    }
  },
  created() {
    let id = this.$route.params.orderTrack ?  this.$route.params.orderTrack : '';
    this.getShippingStatusGet(id);
    },
  methods: {  
    goBack() {
      this.$router.push({ name: 'order', params: { order: ENUM.ORDER_STATUS.DELIVERING }});
    },
    // 获取物流状态查询
    getShippingStatusGet(id) {
      shippingStatusGet(id).then( res => {
        if(res) {
          this.trackList = res;
        }
      })
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
      border-bottom: 1px solid #E8EAED; 
    }
    .order-track-body {
      height:80px; 
      background:rgba(255,255,255,1);
      box-shadow: 0px -0.5px 0px 0px rgba(232,234,237,1);
      p {
        height:20px; 
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(124,127,136,1);
        line-height:20px;
      }
      .number {
        padding: 15px 0px 10px 15px;
      }
      .source {
        padding:0px 0px 15px 15px;
      }
    }
    .logistics {
      height:auto; 
      width: auto;
      background:rgba(255,255,255,1);
      border-bottom: 1px solid rgba(232,234,237,1);
      padding: 15px;
      margin-top: 10px;
      .info {
        width:auto;
        padding-left:20px;
        .match {
          width: auto;
          position: relative;
          &.line{
            div {
              margin-bottom: 15px; 
              padding-bottom:0px;
              border-left:none;
              span {
                border-bottom:none;
              }
            }
          }
          img {
            width: 11px;
            height: 11px;
            position: absolute;
            top: 0px;
            left: -4.5px;
          }
          div {
            padding-left: 25px;
            border-left: 1px solid #C5CBD1;
            padding-bottom: 15px;
            p {
              width: 100%;
              font-size:14px;
              color:#4E545D;
              line-height:20px;
              margin: 0px;
              padding: 0px;
            }
            span {
              height:20px; 
              font-size:13px;
              color:rgba(175,176,179,1);
              line-height:20px;
              padding: 5px 0px;
              display: block;
              border-bottom: 1px solid #E8EAED;
              width: 100%;
            }
          }
      }
      .bale {
        height:75px; 
        background:rgba(255,255,255,1);
        box-shadow: 0px -0.5px 0px 0px rgba(232,234,237,1);
        padding: 15px 0px 0px 9px;
        label {
          height:20px; 
          font-size:14px;
          font-family:'PingFangSC-Regular';
          color:rgba(175,177,179,1);
          line-height:20px;
        }
        span {
          height:20px; 
          font-size:13px;
          font-family:'PingFangSC-Regular';
          color:rgba(175,177,179,1);
          line-height:20px;
        }
      }
      .submit {
        height:75px; 
        padding:0px 0px 0px 9px;
        label {
          height:20px; 
          font-size:14px;
          font-family:'PingFangSC-Regular';
          color:rgba(175,177,179,1);
          line-height:20px;
        }
        span {
          height:20px; 
          font-size:13px;
          font-family:'PingFangSC-Regular';
          color:rgba(175,177,179,1);
          line-height:20px;
        }
      }
      }
    }
  }
 
</style>