<template>
  <div class="group-b4-container" v-bind:style="getContainerStyle">
    <div v-if="isLeft" class="content-wrapper">
      <card-item 
        v-bind:style="getLeftItemStyle" 
        v-if="getItemByIndex(0)"
        :item="getItemByIndex(0)">
      </card-item>
      <card-item
        class="border-left"
        v-bind:style="getRightItemStyle" 
        v-if="getItemByIndex(1)" 
        :item="getItemByIndex(1)">
      </card-item>
    </div>
    <div v-else class="content-wrapper"> 
      <card-item         
        v-bind:style="getRightItemStyle" 
        v-if="getItemByIndex(0)"
        :item="getItemByIndex(0)">
      </card-item>
      <card-item 
        class="border-left"
        v-bind:style="getLeftItemStyle" 
        v-if="getItemByIndex(1)"
        :item="getItemByIndex(1)">
      </card-item>
    </div>         
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
import Common from './Common'
export default {
  name: 'CardGroupB4',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  computed: {
    getLeftItemStyle: function () {
      const { width, height } = this.getLeftItemSize
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getRightItemStyle: function () {
      const { width, height } = this.getRightItemSize      
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getLeftItemSize: function () {
      const { width, height } = this.getContainerSize
      return {
        width: width * (2.0 / 3.0) - 1,
        height: height,
      }
    },
    getRightItemSize: function () {
      const { width, height } = this.getContainerSize
      return {
        width: width * (1.0 / 3.0),
        height: height
      }
    },
    getContainerStyle: function() {
      const { width, height } = this.getContainerSize
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getContainerSize: function() {
      const { width, height } = window.screen
      return {
        width: width,
        height: width * (5.0 / 9.0)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .group-b4-container {
    display: flex;   
  }
  .content-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;   
  }
  .column-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;    
  }
  .border-left {
    border-left: 1px solid $lineColor;
  }
  .top-item {
    border-bottom: 1px solid $lineColor;
  }
</style>


