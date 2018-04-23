<template>
  <div class="container" @click="onclick">
    <div class="left-wrapper">
      <img class="icon" v-bind:src="iconUrl" />
      <label class="name">{{item.name}}</label>
    </div>
    <div class="right-wrapper">
      <div class="title-wrapper">
        <label class="title">配送费：</label>
        <label class="price">AED {{getPrice}}</label>
      </div>
      <p class="desc">{{item.desc}}</p>
    </div>            
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default { 
  props: {
    item: {
      type: Object,
    },
  },
  computed: {    
    ...mapState({
      selectedItem: state => state.shipping.selectedItem
    }),
    isSelected: function () {
      if (this.item && this.selectedItem && this.item.id === this.selectedItem.id) {
        return true
      }
      return false
    },
    iconUrl: function () {
      if (this.isSelected) {
        return require("../../../assets/image/change-icon/multiple_choice@2x.png")
      } else {
        return require("../../../assets/image/change-icon/choice@2x.png")
      }
    },
    getPrice: function () {
      let price = this.item ? this.item.fee : null
      return (price ? this.utils.currencyPrice(price) : '')
    },
    // getDesc: function () {
    //   let data = ''
    //   let desc = this.item.desc
    //   if (desc && desc.length) {
    //     data = desc.split('/n').join('</br>')
    //   }
    //   return data
    // }
  }, 
  methods: {
    onclick() {
      this.$emit('onclick')
    },
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
    align-items: center;
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
  .desc {
    flex: 1;       
    color: #7C7F88;
    font-size: 14px;
    margin-top: 30px;
    margin-right: 10px;
    margin-bottom: 20px;
  }  
</style>


