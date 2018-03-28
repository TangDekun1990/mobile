<template>
  <div class="container"> 
    <div class="top-wrapper">
      <div class="title-wrapper">        
        <label class="title">{{item.name}}</label>
        <label class="title">{{item.mobile}}</label>        
      </div>
      <label class="desc address-text">{{detailAddress}}</label>
    </div>
    <div class="bottom-wrapper">
      <div class="bottom-left-wrapper" @click="onDefault">
        <img class="indicator" v-bind:src="iconUrl" />  
        <label class="subtitle">默认地址</label>  
      </div>
      <div class="bottom-right-wrapper">
        <div class="edit-wrapper" @click="onEdit">
          <img class="indicator" src="../../../assets/image/change-icon/d1_edit@2x.png" />  
          <label class="subtitle">编辑</label> 
        </div>
        <div class="edit-wrapper delete-wrapper" @click="onDelete">
          <img class="indicator" src="../../../assets/image/change-icon/d1_delete@2x.png" />  
          <label class="subtitle">删除</label> 
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    isDefault: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,  
    },
  },
  computed: {
    iconUrl() {
      if (this.isDefault) {
        return require("../../../assets/image/change-icon/multiple_choice@2x.png")
      } else {
        return require("../../../assets/image/change-icon/choice@2x.png")
      }
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
    // onclick() {
    //   this.$emit('onclick')
    // },
    onDefault() {
      this.$emit('onDefault')
    },
    onEdit() {
      this.$emit('onEdit')
    },
    onDelete() {
      this.$emit('onDelete')
    },
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border-bottom: 1px solid $lineColor;
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
  .bottom-wrapper {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
  }
  .bottom-left-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .bottom-right-wrapper {   
    flex: 1; 
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: stretch;    
  }
  .edit-wrapper {        
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .delete-wrapper {
    margin-right: 10px;
  }
  .indicator {
    width: 19px;
    height: 19px;
    margin-left: 15px;
    margin-right: 10px;      
  }
  .icon {
    width: 18px;
    height: 18px;
    margin-left: 10px;
  }
  .subtitle { 
    font-size: 14px;
    color: #7C7F88;
    margin-right: 10px;
  }
</style>


