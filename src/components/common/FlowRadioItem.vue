<template>
  <div class="item" v-bind:class="{normalItem: !isSelected, selectedItem: isSelected}" @click="onclick">
    <label class="title" v-bind:class="{normalTitle: !isSelected, selectedTitle: isSelected}">{{item.name}}</label>
  </div>
</template>

<script>
export default {
  name: 'FlowRadioItem',
  props: {
    item: {
      type: Object,
    },
    isSelected: {
      type: Boolean,
      default: false,
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
  .item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
    border-radius: 2px; 
    padding-left: 15px;  
    padding-right: 15px;    
  }
  .normalItem {
    border: 1px solid #7C7F88;
    background-color: #fff;
  }
  .selectedItem {
    border: 1px solid #f23030;
    background-color: #f23030;
  }
  .title {    
    font-size: 14px;   
  }
  .normalTitle {
    color: #4E545D;
  }
  .selectedTitle {
    color: #fff;
  }
</style>


