<template>
  <div class="info-item-wrapper"  @click="onclick()">
      <img class="info-item-icon" v-bind:src="icon" />
      <label class="item-title info-item-title">{{title}}</label>
      <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png"/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    url: {
      type: String,
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
  .info-item-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lineColor; 
    height:60px;
    .item-title {
      font-size: 16px;
      color: #4E545D;
    }
    .info-item-icon {
      width: 12px;
      height: 14px;
      margin-left: 22px;
    }
    .info-item-title {
      flex: 1;
      margin-left: 15px;
    }
    .indicator {
      width: 7px;
      height: 11px;
      margin-right: 20px;      
    }
  }
</style>


