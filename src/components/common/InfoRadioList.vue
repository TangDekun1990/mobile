<template>
  <div class="container">       
    <label class="title">{{title}}</label>  
    <info-radio-item v-for="(item, index) in items" 
      class="item"
      :key="index" 
      v-bind:isSelected="index == selectedIndex" 
      :title="item">
    </info-radio-item>  
  </div>
</template>

<script>
import InfoRadioItem from './InfoRadioItem'
export default {
  name: 'InfoRadioList',
  props: {
    title: {
      type: String,
    },
    items: {
      type: Array,
    },  
    selectedIndex: {
      type: Number,
      default: -1,
    },
  }, 
}
</script>

<style lang="scss" scoped>
  .container {    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
  }
  .title { 
    font-size: 16px;
    color: #4E545D;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .item {
    margin-bottom: 15px;     
  }
</style>


