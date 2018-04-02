<template>
  <div class="content-wrapper">
    <label class="title">{{title}}</label>
    <div class="type-wrapper">
      <flow-radio-item v-for="(item, index) in items" 
        class="type-item" 
        :key="index"
        :item="item"
        :isSelected="isSelected(index)" 
        v-on:onclick="onclick(index)">
      </flow-radio-item>      
    </div>    
  </div>
</template>

<script>
import FlowRadioItem from './FlowRadioItem'
export default {
  name: 'FlowRadioList',
  props: {
    title: {
      type: String
    },
    items: {
      type: Array,
    },  
    selectedIndex: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      currentIndex: this.selectedIndex
    }
  },
  methods: {
    onclick(index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index
        this.$emit('onIndexChanged')
      }      
    },
    isSelected(index) {
      if (this.currentIndex === index) {
        return true
      }
      return false
    }
  },
}
</script>

<style lang="scss" scoped>
  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
  }
  .title {
    color: #4E545D;
    font-size: 16px;
    margin-top: 15px;
    margin-left: 15px;
  }
  .type-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
  }
  .type-item {
    height: 35px; 
    margin-left: 15px;
    margin-top: 15px;
  }
</style>


