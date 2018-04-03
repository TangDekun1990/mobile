<template>
  <div class="content-wrapper">    
    <label class="title">{{title}}</label>    
    <input 
      class="value" 
      :maxlength="maxlength"
      v-bind:placeholder="placeholder" 
      v-bind:value="value" 
      v-on:input="value = $event.target.value">
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
    maxlength: {
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
      this.value = value
    },
  }
}
</script>

<style lang="scss" scoped>
  .content-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lineColor;
    padding-left: 20px; 
  }
  .title {
    width: 90px;
    font-size: 14px;
    color: #4E545D;
  }
  .value {
    @include formInput;
    flex: 1;    
    margin-left: 10px;
    margin-right: 15px;
  }
  .indicator {    
    width: 7px;
    height: 12px;
    margin-left: 10px;
    margin-right: 10px;      
  }
</style>


