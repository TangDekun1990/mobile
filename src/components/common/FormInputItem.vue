<template>
  <div class="container">    
    <label class="title">{{title}}</label>    
    <input class="value" v-bind:placeholder="placeholder" v-bind:value="value" v-on:input="value = $event.target.value">
  </div>
</template>

<script>
export default {
  name: 'FormInputItem',
  props: {
    title: {
      type: String,
    },
    default: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      value: this.default
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    },
    onchange(value) {
      console.log('====================================');
      console.log(value);      
      console.log('====================================');
      this.value = value
    },
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
    border-bottom: 1px solid $lineColor;
    padding-left: 20px; 
  }
  .title {
    width: 70px;
    font-size: 14px;
    color: #4E545D;
    margin-right: 20px;
  }
  .value {
    flex: 1;
    font-size: 14px;
    color: #4E545D;
    margin-left: 10px;
    margin-right: 15px;
    &:focus {
      outline-style: none;
    }
  }
  .indicator {    
    width: 7px;
    height: 12px;
    margin-left: 10px;
    margin-right: 10px;      
  }
</style>


