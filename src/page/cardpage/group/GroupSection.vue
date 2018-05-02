<template>
  <div class="group-section-wrapper">    
    <label class="title">{{getTitle}}</label>
    <div class="indicator-wrapper" @click="onclick">
      <img v-if="isShowIndicator" class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />
    </div>    
  </div>
</template>

<script>
import { openLink } from '../deeplink'
export default {
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    getTitle () {
      return this.item ? this.item.title : ''
    },
    isShowIndicator () {
      if (this.item && this.item.link) {
        return true
      }      
      return false 
    },
  },
  methods: {
    onclick() {
      if (this.isShowIndicator) {
        let link = this.item.link
        openLink(this.$router, link)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .group-section-wrapper {   
    position: relative; 
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lineColor;
  }
  .title {
    font-size: $h2;
    color: #4E545D;
  }
  .indicator-wrapper {
    position: absolute;
    width: 30px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .indicator {
    width: 7px;
    height: 12px;    
  }
</style>


