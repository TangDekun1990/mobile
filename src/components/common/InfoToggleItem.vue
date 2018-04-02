<template>
  <div class="container" @click="onclick"> 
    <img class="icon" v-bind:src="iconUrl" />    
    <label class="title">{{item.name}}</label>    
  </div>
</template>

<script>
export default {
  name: 'InfoToggleItem',
  props: {
    item: {
      type: Object,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: this.isSelected
    }
  },
  computed: {
    iconUrl() {
      if (this.value) {
        return require("../../assets/image/change-icon/multi_sel@2x.png")
      } else {
        return require("../../assets/image/change-icon/choice@2x.png")
      }
    },
  },
  methods: {
    onclick() {
      this.$emit('onclick')
      this.value = !this.value
    }
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
  }
  .title { 
    font-size: 14px;
    color: #7C7F88;
  }
  .icon {
    width: 19px;
    height: 19px;
    margin-left: 15px;
    margin-right: 7px;      
  }
</style>


