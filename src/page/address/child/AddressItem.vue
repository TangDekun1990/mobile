<template>
  <div class="container" @click="onclick"> 
    <div class="left-wrapper">
      <div class="title-wrapper">        
        <label class="title">孙朋朋</label>
        <label class="title">18600235103</label>
        <label class="default" v-if="isDefault">默认</label>
      </div>
      <label class="desc address-text">北京市朝阳区朝外大街乙6号朝外SOHO A座 807朝外SOHO A座 807</label>
    </div>
    <img class="indicator" v-bind:src="iconUrl" />    
  </div>
</template>

<script>
export default {
  props: {
    isDefault: {
      type: Boolean,
      default: true,
    },
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
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #E8EAED;  
  }
  .left-wrapper {
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
    margin-top: 10px;
    margin-left: 10px;
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
    margin-left: 20px;
  }
  .unselected-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .indicator {
    width: 19px;
    height: 19px;
    margin-left: 10px;
    margin-right: 10px;      
  }
</style>


