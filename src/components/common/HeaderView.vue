<template>
  <div class="container">
    <div class="item-wrapper">
      <slot name="leftItem"></slot>
    </div>    
    <div class="title-wrapper">
      <label class="title">{{title}}</label>
    </div>    
    <div class="item-wrapper">
      <slot name="rightItem">
        <label class="default"></label>          
      </slot>
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,   
    },
  },
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;    
    background-color: #FFFFFF;
    height: 44px;
  }  
  .item-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
  }
  .title-wrapper {
    display: flex;   
    flex: 1; 
    flex-direction: row;  
    justify-content: center;
    align-items: center;     
  }
  .title {
    font-size: 18px;
    color: #48505D;
  }
  .default {
    width: 60px;
    margin-left: 10px;
  }
</style>


