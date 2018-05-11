<template>
  <div class="container">
    <div class="info">
       <div class="title">{{getTitle}}</div>
       <div class="time">{{getDate}}</div>
    </div>
    <div class="number">{{getNumber}}</div>
  </div>
</template>

<script>
import { ENUM } from '../../../config/enum'
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getTitle () {
      let title = ''
      if (this.isOptain()) {
        title = this.item.reason ? this.item.reason : '获得积分'
      } else {
        title = '积分兑换优惠劵'
      } 
      return title     
    },
    getNumber () {
      let number = ''
      if (this.isOptain()) {
        number = '+' + (this.item ? this.item.change_score : '')
      } else {
        number = '-' + (this.item ? this.item.change_score : '')
      } 
      return number     
    },
    getDate: function () {
      let date = ''
      let item = this.item
      if (item && item.created_at) {
        let created_at = new Date(item.created_at * 1000)
        date = this.utils.formatDate(created_at , 'yyyy-M-d')
      }
      return date
    },
  },
  methods: {
    isOptain () {
      let isOptain = false
      if (this.item) {
        let status = this.item.status
        switch (status) {
          case ENUM.SCORE_STATUS.OPTAIN: // 收入
            isOptain = true
            break;
          case ENUM.SCORE_STATUS.DEDUCT: // 支出
            isOptain = false
          break;
        
          default:
            isOptain = false
            break;
        }
      }
      return isOptain      
    },
  },
}
</script>

<style lang="scss" scoped>
  .container {
    height: 58px;
    background-color: #fff;
    margin-bottom: 2px;    
    position: relative;
    .info {
      padding: 7px 22px;
      .title {
        color:rgba(64,66,69,1);
        font-size:15px;
        line-height: 21px;
      }
      .time {
        color:rgba(85,89,95,1);
        font-size:12px;
        margin-top: 5px;
      }
    }
    .number {
      position: absolute;
      top: 0;
      right: 20px;
      color:rgba(85,89,95,1);
      font-size: 12px;
      line-height: 58px;
    }
  }
</style>


