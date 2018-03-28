<template>
  <div class="container" @click="onclick">
    <div class="left-wrapper">
      <img class="icon" v-bind:src="iconUrl" />
      <label class="name">温超物流</label>
    </div>
    <div class="right-wrapper">
      <div class="title-wrapper">
        <label class="title">配送费：</label>
        <label class="price">￥20</label>
      </div>
      <label class="subtitle">

      尊敬的顾客您好：

      14:30前完成下单，预计当天15:00-19:00送达。

      18:30前完成下单，预计当天19:00-23:00送达。

      18:31至早上09:30下单，预计次日10:00-14:30送达。

      温馨提示:如指定时间,请预留2小时时间如 11:00-13:00送达(我们会尽量安排)

      如需帮助拨打客服热线：04-5518068（08:00-22:00）
      </label>
    </div>            
  </div>
</template>

<script>
export default { 
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconUrl() {
      if (this.isSelected) {
        return require("../../../assets/image/change-icon/multiple_choice@2x.png")
      } else {
        return require("../../../assets/image/change-icon/choice@2x.png")
      }
    }
  }, 
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff; 
    border-top: 1px solid $lineColor;
  }
  .left-wrapper {
    width: 109px;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  } 
  .right-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  } 
  .icon {
    width: 19px;
    height: 19px;
    margin-left: 20px;
    margin-right: 20px;      
  }
  .name {    
    font-size: 17px;
    color: #4E545D;
  }
  .title-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    margin-top: 20px;    
  }
  .title {
    font-size: 15px;
    color: #4E545D;
  }
  .price {
    font-size: 15px;
    color: #FC2E39;
  }
  .subtitle {
    flex: 1;       
    color: #7C7F88;
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 20px;
  }  
</style>


