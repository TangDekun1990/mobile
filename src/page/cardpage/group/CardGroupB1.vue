<template>
  <div class="group-b1-container" v-bind:style="getContainerStyle">
    <div v-if="isLeft" class="content-wrapper">
      <card-item 
        v-bind:style="getRowItemStyle" 
        v-if="getFirstItem"
        :item="getFirstItem">
      </card-item>
      <div class="column-wrapper">
        <card-item 
          class="top-item" 
          v-bind:style="getColumnItemStyle" 
          v-if="getSecondItem" 
          :item="getSecondItem">
        </card-item>
        <card-item 
          v-bind:style="getColumnItemStyle" 
          v-if="getThirdItem" 
          :item="getThirdItem">
        </card-item>
      </div>
    </div>
    <div v-else class="content-wrapper">
      <div class="column-wrapper">
        <card-item 
          class="top-item" 
          v-bind:style="getColumnItemStyle" 
          v-if="getFirstItem" 
          :item="getFirstItem">
        </card-item>
        <card-item 
          v-bind:style="getColumnItemStyle" 
          v-if="getSecondItem" 
          :item="getSecondItem">
        </card-item>
      </div>
      <card-item 
        v-bind:style="getRowItemStyle" 
        v-if="getThirdItem"
        :item="getThirdItem">
      </card-item>
    </div>         
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardGroupB1',
  components: {
    CardItem,
  },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    isLeft() {
      let layout = this.item.layout
      if (layout === ENUM.CARDGROUP_LAYOUT.B1L) {
        return true
      }
      return false
    },
    getItems: function () {
      let items = []
      if (this.item && this.item.cards && this.item.cards.length) {
        items = this.item.cards
      }
      return items
    },
    getFirstItem: function () {
      return this.getItemByIndex(0)
    },
    getSecondItem: function () {
      return this.getItemByIndex(1)
    },
    getThirdItem: function () {      
      return this.getItemByIndex(2)
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
      itemWidth = itemHeight * (3.0 / 4.0)
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
  methods: {
    getItemByIndex(index) {
      let items = this.getItems
      if (items && items.length > index) {
        return items[index]
      }
      return null
    }, 
  }
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
    border-left: 1px solid $lineColor;
  }
  .top-item {
    border-bottom: 1px solid $lineColor;
  }
</style>


