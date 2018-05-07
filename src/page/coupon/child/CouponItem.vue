<template>
  <div class="coupon-item-container" @click="onclick">
    <img class="top-img" v-bind:src="getTopBg">
    <label class="title" :class="{enableText: isAvaiable, disableText: !isAvaiable}">{{getName}}</label>
    <label class="subtitle">{{getCondition}}</label>
    <div class="desc-wrapper">
      <label v-for="(item, index) in getTypeItems" :key="index">{{item}}</label>
      <label>{{getDuration}}</label>
      <div class="row-wrapper">
        <label class="state">{{getStatus}}</label>
        <label>{{item.id}}</label>
      </div>      
    </div>    
    <img class="indicator" v-if="isSelected" src="../../../assets/image/change-icon/d1_ticket_sel@2x.png">
  </div>
</template>

<script>
import { ENUM } from "../../../config/enum";
export default {
  props: {
    item: {
      type: Object
    },
    isSelected: {
      type: Boolean
    }
  },
  computed: {
    isAvaiable: function () {
      return (this.item && this.item.status === ENUM.COUPON_STATUS.AVAILABLE) ? true : false
    },
    getTopBg: function () {
      let img = null      
      if (this.isAvaiable) {
        img = require('../../../assets/image/change-icon/e7_coupon@2x.png')                
      } else {
        img = require('../../../assets/image/change-icon/e7_coupon_gray@2x.png')
      }
      return img
    },
    getName: function () {
      let name = ''
      if (this.item) {
        name = this.item.name
      }
      return name
    },
    getCondition: function () {
      let name = ''
      if (this.item) {
        name = this.item.condition
      }
      return name
    },
    getTypeItems: function () {
      let items = []
      if (this.item && this.item.infos) {
        items = this.item.infos
      }
      return items
    },
    getDuration: function () {
      let duration = ''
      let item = this.item
      if (item && item.start_at && item.end_at) {
        let start_at = new Date(item.start_at * 1000)
        let end_at = new Date(item.end_at * 1000)
        duration = this.utils.formatDate(start_at, 'yyyy.M.d') + ' ~ ' + this.utils.formatDate(end_at, 'yyyy.M.d')
      }
      return duration
    },
    getStatus: function () {
      let status = ''
      let item = this.item 
      if (item) {
        switch (item.status) {
          case ENUM.COUPON_STATUS.AVAILABLE:
            {
              status = ''
            }
            break;
          case ENUM.COUPON_STATUS.USED:
            {
              status = '已使用'
            }
            break;
          case ENUM.COUPON_STATUS.EXPIRED:
            {
              status = '已过期'
            }
            break;
          default:
            break;
        }        
      }
      return status
    },
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .coupon-item-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
    margin: 10px 10px 0px 10px;
    .desc-wrapper {
      flex: 1;      
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      margin-bottom: 10px;
      label {
        color: #8C8F93;
        font-size: 12px;
        margin-top: 5px;
        margin-right: 10px;
        text-align: right;
      }
      .row-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .state {
        text-align: left;  
        flex: 1;  
        margin-left: 10px;
      }
    }
  }
  .top-img {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    height: 4px;
  }
  .title {
    margin-top: 10px;
    margin-left: 14px; 
    font-size: 18px;
  }
  .enableText {
    color: #F75F5F;
  }
  .disableText {
    color: #8C8F93;
  }
  .subtitle {
    margin-top: 4px;
    margin-left: 14px;
    margin-right: 8px;
    color: #8C8F93;
    font-size: 12px;
  }
  .indicator {
    width: 36px;
    height: 36px;
    position: absolute;
    left: 0px;
    bottom: 0px;
  }  
</style>


