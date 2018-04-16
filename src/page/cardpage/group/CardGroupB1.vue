<template>
  <div class="group-b1-container" v-bind:style="getContainerStyle">
    <div v-if="isLeft" class="content-wrapper">
      <card-item 
        v-bind:style="getRowItemStyle" 
        v-if="getItemByIndex(0)"
        :item="getItemByIndex(0)">
      </card-item>
      <div class="column-wrapper border-left">
        <card-item 
          class="top-item" 
          v-bind:style="getColumnItemStyle" 
          v-if="getItemByIndex(1)" 
          :item="getItemByIndex(1)">
        </card-item>
        <card-item 
          v-bind:style="getColumnItemStyle" 
          v-if="getItemByIndex(2)" 
          :item="getItemByIndex(2)">
        </card-item>
      </div>
    </div>
    <div v-else class="content-wrapper">
      <div class="column-wrapper">
        <card-item 
          class="top-item" 
          v-bind:style="getColumnItemStyle" 
          v-if="getItemByIndex(0)" 
          :item="getItemByIndex(0)">
        </card-item>
        <card-item 
          v-bind:style="getColumnItemStyle" 
          v-if="getItemByIndex(2)" 
          :item="getItemByIndex(2)">
        </card-item>
      </div>
      <card-item 
        class="border-left"
        v-bind:style="getRowItemStyle" 
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
  name: 'CardGroupB1',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  computed: {
    isLeft() {
      let layout = this.item.layout
      if (layout === ENUM.CARDGROUP_LAYOUT.B1L) {
        return true
      }
      return false
    },
    getRowItemStyle: function () {
      const { width, height } = this.getLeftItemSize
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getColumnItemStyle: function () {
      const { width, height } = this.getRightItemSize      
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getLeftItemSize: function () {
      let itemWidth = 0
      let itemHeight = 0
      const { width, height } = this.getContainerSize
      itemHeight = height
      itemWidth = itemHeight * (3.0 / 4.0) - 1
      return {
        width: itemWidth,
        height: itemHeight
      }
    },
    getRightItemSize: function () {
      let itemWidth = 0
      let itemHeight = 0
      const { width, height } = this.getContainerSize
      itemHeight = height * 0.5
      itemWidth = itemHeight * (9.0 / 4.0)
      return {
        width: itemWidth,
        height: itemHeight
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
      let itemWidth = 0
      let itemHeight = 0
      const { width, height } = window.screen
      itemWidth = width
      itemHeight = itemWidth * (8.0 / 15.0)
      
      // console.log('====================================');
      // console.log('(w, h) is :', itemWidth, itemHeight);
      // console.log('====================================');
      return {
        width: itemWidth,
        height: itemHeight
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .group-b1-container {
    display: flex;   
  }
  .content-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    border-top: 1px solid $lineColor;
    // border-bottom: 1px solid $lineColor;    
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


