<template>
  <div class="container" @click="onclick"> 
    <img class="icon" v-bind:src="iconUrl" />    
    <label class="title">{{item.name}}</label>    
  </div>
</template>

<script>
export default {
  name: 'InfoRadioItem',
  props: {
    item: {
      type: Object,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconUrl() {
      if (this.isSelected) {
        return require("../../assets/image/change-icon/multiple_choice@2x.png")
      } else {
        return require("../../assets/image/change-icon/choice@2x.png")
      }
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
  .container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;    
  }
  .title { 
    flex: 1;
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


