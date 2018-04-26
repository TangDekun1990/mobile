<template>
  <div class="container">
    <div class="price">            
      <div class="number">
        <span>¥</span>{{item.price}}
      </div> 
      <div class="bottom">
        {{item.score_number}}积分
      </div>
    </div>
    <div class="info">      
      <div class="title">
        {{item.name}}
      </div>
      <div class="desc">
        {{getDuration}}
      </div>
      <div class="desc">
        适用平台:{{item.platform}}
      </div>
      <div class="exchange" @click="touchExchange()">
        <span>立即兑换</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ENUM } from "../../../config/enum";
import { MessageBox } from 'mint-ui';

export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getDuration: function () {
      let duration = ''
      let item = this.item
      if (item && item.start_at && item.end_at) {
        let start_at = new Date(item.start_at * 1000)
        let end_at = new Date(item.end_at * 1000)
        duration = this.utils.formatDate(start_at, 'yyyy.M.d') + ' ~ ' + this.utils.formatDate(end_at, 'yyyy.M.d')
      }
      return duration
    }
  },
  methods: {
    touchExchange() {
      MessageBox({
        title: "",        
        message: "确定使用"+this.item.score_number+"积分，兑换</br>"+this.item.price+"元优惠券吗？",
        confirmButtonText: "确认",
        confirmButtonClass: "confirm-button-red",
        showCancelButton: true,
      }).then(action => {
        if ( action == "confirm" ) {
          this.$emit('touchExchange')
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin: 10px;
    margin-top: 0;
    height: 93px;
    position: relative;    
    .price {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 93px;
      float: left;
      background-image: url(../../../assets/image/change-icon/e2_2bg@2x.png);
      background-size: 100px 93px;
      text-align: center;
      .number {
        color: #fff;
        margin-top: 10px;
        font-size: 28px;
        line-height: 38px;
        span {
          font-size: 11px;
        }
      }
      .bottom {
        width: 70px;
        height: 26px;
        background-color: #fff;
        border-radius: 5px;
        display: inline-block;
        font-size:11px;
        color:rgba(200,200,200,1);
        line-height: 26px;
      }
    }
    .info {
      position: absolute;
      top: 0;
      padding: 10px 15px;
      padding-right: 72px;
      left: 94px;
      height: 93px;
      right: 0;          
      background: url(../../../assets/image/change-icon/e2_CombinedShape@2x.png) no-repeat;
      background-size: 100% 93px;
      .title {
        font-size: 15px;
        line-height: 25px;
        color: #464646;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: 12px;
        color: #828282;
        line-height: 26px;        
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .exchange {
        position: absolute;
        height: 61px;
        border-left: 1px solid #D8D8D8;
        top: 16px;
        right: 0;
        width: 70px;
        padding-right: 5px;
        text-align: center;
        span {
          display: inline-block;
          width: 20px;
          line-height: 16px;
          font-size: 11px;
          color: #FF6565;
          height: 100%;
        }
      }
    }
  }  
</style>


