<template>
  <button class="button-item" v-bind:class="typeStyle" :disabled="disabled" @click="click">
    <label><slot></slot></label>
  </button>
</template>

<script>
export default {
  name: 'gk-button',
  props: {
    type: {
      type: String,
      default: 'default', // default/primary/secondary/positive/negative
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    typeStyle: function () {
      return {
        default: this.isItemType('default'),
        primary: this.isItemType('primary'),
        secondary: this.isItemType('secondary'),
        positive: this.isItemType('positive'),  
        negative: this.isItemType('negative'),      
      }
    }
  },
  methods: {    
    isItemType(type) {
      if (this.type === type) {
        return true
      }
      return false
    },
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/var.scss";
  .button-item {   
    border-radius: 4px;        
    text-align: center; 
    font-size: $button-font-size; 
    border: none;
    outline: 0;  
    &:focus {
      outline-style: none;      
    } 
  }
  .default {      
    color: $button-default-color;   
    background-color: $button-default-background-color;   
  }
  .primary {    
    color: $button-primary-color;   
    background-color: $button-primary-background-color;
  }
  .secondary {    
    color: $button-secondary-color;   
    background-color: $button-secondary-background-color;
    border: 1px solid $button-secondary-border-color;
  }
  .positive {    
    color: $button-positive-color;   
    background-color: $button-positive-background-color;
    border: 1px solid $button-positive-color;
  }
  .negative {    
    color: $button-negative-color;   
    background-color: $button-negative-background-color;
    border: 1px solid $button-negative-color;
  }
</style>

