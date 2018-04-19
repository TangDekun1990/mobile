<template>
  <div class="container" @click="onclick"> 
    <div class="top-wrapper">
      <div v-if="hasAddress" class="selected-wrapper">
        <div class="title-wrapper">
          <img class="icon" src="../../../assets/image/change-icon/e5_address@2x.png" />
          <label class="title">{{item.name}}</label>
          <label class="title">{{item.mobile}}</label>
          <label class="default" v-if="isDefault">默认</label>
        </div>
        <label class="desc address-text" style="-webkit-box-orient:vertical">{{detailAddress}}</label>
      </div>
      <div v-else class="unselected-wrapper">
        <label class="desc">您还没有收获地址，点击这里添加。</label>
      </div>       
      <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />     
    </div>
    <img class="line-wrapper" src="../../../assets/image/change-icon/bg_address_line@2x.png" />
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
    hasAddress() {
      if (this.item) {
        return true
      }
      return false
    },
    isDefault() {
      if (this.item && this.item.is_default) {
        return true
      }
      return false
    },
    detailAddress() {
      let address = ''
      if (this.item) {
        let regions = this.item.regions
        for (let i = 0; i < regions.length; i++) {
          const element = regions[i];
          address += element.name
        }
      }
      address += this.item.address 
      return address
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
    border-top: 1px solid #E8EAED;  
  }
  .top-wrapper {  
    flex: 1;  
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
    @include limit-line(2)
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
    // position: relative;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;    
    height: 2px;     
  }
</style>


