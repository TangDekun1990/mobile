<template>
  <div class="container">
    <div class="info">
       <div class="title">
         积分兑换优惠券
       </div>
       <div class="time">
         2016-11-30
       </div>
    </div>
    <div class="number">
      -1000
    </div>
  </div>
</template>

<script>
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
    },
  }
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


