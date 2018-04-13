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
      <div class="pic">
        <img class="imgone" src="../../../assets/image/change-icon/e5_dot_red@2x.png">
        <img class="imgtwo" src="../../../assets/image/change-icon/e5_dot@2x.png">
        <span></span>
      </div>
      <div class="info">
        <div class="match" v-for="(item,index) in trackList.status" v-bind:key="item.id">
          <label>{{item.content}}</label> <br>
          <span>{{item.datetime | convertTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from '../../../components/common'
import { Header } from 'mint-ui'
import { shippingStatusGet } from '../../../api/network/shipping' //物流状态查询
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
      this.$router.go(-1) 
    },
    // 获取物流状态查询
    getShippingStatusGet(id) {
      shippingStatusGet(id).then( res => {
        if(res) {
          this.shippingList = Object.assign([],this.shippingList, res.order);
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
      height:265px; 
      background:rgba(255,255,255,1);
      box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1), 0px -0.5px 0px 0px rgba(232,234,237,1);
      margin-top: 10px;
      display:flex;
      flex-direction:row;
     .pic {
       float: left;
       width:1px;
       height:190px; 
       background:rgba(197,203,209,1);
       border-radius: 3px;
       margin: 24px;
        img  {
        width:11px; 
        height:11px;
        
        .imgone {
          
        } 
        .imgtwo {
          padding-top:20px;
        }
        }
        span {
          display: inline-block;
          width:7px;
          height:7px; 
          background:rgba(197,203,209,1);
          border-radius: 50%;
        }
      }
      .info {
        float:right;
        // width:95%;
        padding-left:9px;
        .match {
          label {
            font-size:14px;
            font-family:'PingFangSC-Regular';
            color:rgba(78,84,93,1);
            line-height:20px;
            padding:15px 15px 5px 0px;
            display: inline-block;
          }
        span {
          height:20px; 
          font-size:13px;
          font-family:'PingFangSC-Regular';
          color:rgba(175,176,179,1);
          line-height:20px;
          padding: 0px 0px 15px 0px;
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