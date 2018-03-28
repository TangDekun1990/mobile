<template>
  <div class="container" @click="onclick"> 
    <div class="top-wrapper">
    </div>
    <div v-if="hasAddress" class="selected-wrapper">
      <div class="title-wrapper">
        <img class="icon" src="../../../assets/image/change-icon/e5_address@2x.png" />
        <label class="title">孙朋朋</label>
        <label class="title">18600235103</label>
        <label class="default">默认</label>
      </div>
      <label class="desc address-text">北京市朝阳区朝外大街乙6号朝外SOHO A座 807朝外SOHO A座 807</label>
    </div>
    <div v-else class="unselected-wrapper">
      <label class="desc">您还没有收获地址，点击这里添加。</label>
    </div>       
    <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />    
    <!-- <img class="line-wrapper" src="../../../assets/image/change-icon/bg_address_line@2x.png" /> -->
  </div>
</template>

<script>
export default {
  props: {
    hasAddress: {
      type: Boolean,
      default: true,
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
  .container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #E8EAED;  
  }
  .selected-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .title-wrapper {
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .icon {
    width: 16px;
    height: 16px;
    margin-left: 10px;
  }
  .title { 
    font-size: 16px;
    color: #4E545D;
    margin-left: 10px;
  }
  .default {    
    width: 28px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid #FC2E39;
    color: #FC2E39;
    font-size: 10px;
    text-align: center;
    border-radius: 2px;
  }  
  .desc {
    color: #7C7F88;
    font-size: 14px;
  }
  .address-text {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 36px;
  }
  .unselected-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .indicator {
    width: 7px;
    height: 12px;
    margin-left: 10px;
    margin-right: 10px;      
  }
  .line-wrapper {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;    
    height: 2px;     
  }
</style>


