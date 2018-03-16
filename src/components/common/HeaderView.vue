<template>
  <div class="container">
    <slot name="leftItem"></slot>
    <div class="title-wrapper">
      <label class="title">{{title}}</label>
    </div>    
    <slot name="rightItem"></slot>
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
    justify-content: space-between;
    align-items: stretch;    
    background-color: #FFFFFF;
    height: 44px;
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
</style>


