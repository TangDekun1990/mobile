<template>
  <div class="content-wrapper" @click="onclick">    
    <label class="title">{{title}}</label>
    <label class="value">{{value}}</label> 
    <img class="indicator" src="../../assets/image/change-icon/enter@2x.png" />   
  </div>
</template>

<script>
export default {
  name: 'FormTextItem',
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
    }
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
    flex: 1;
    font-size: 14px;
    color: #4E545D;
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


