<template>
  <div class="info-item-wrapper">
    <img class="info-item-icon" v-bind:src="icon" />
    <label class="item-title info-item-title">{{title}}</label>
    <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />
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
  },
}
</script>

<style lang="scss" scoped>
  .info-item-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #E8EAED; 
  }
  .item-title {
    font-size: 14px;
    color: #4E545D;
  }
  .info-item-icon {
    width: 22px;
    height: 22px;
    margin-left: 21px;
  }
  .info-item-title {
    flex: 1;
    margin-left: 19px;
  }
  .indicator {
    width: 7px;
    height: 12  px;
    margin-left: 10px;
    margin-right: 10px;      
  }
</style>


