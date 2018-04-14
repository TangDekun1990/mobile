<template>
  <div class="group-b2-container" v-bind:style="getContainerStyle">
    <div v-if="isLeft" class="content-wrapper">
      <card-item 
        v-bind:style="getRowItemStyle" 
        v-if="getFirstItem"
        :item="getFirstItem">
      </card-item>
      <div class="compose-wrapper">
        <card-item 
          class="top-item" 
          v-bind:style="getColumnItemStyle" 
          v-if="getSecondItem" 
          :item="getSecondItem">
        </card-item>
        <div class="row-wrapper">
          <card-item 
            class="left-item"
            v-bind:style="getColumnSubItemStyle" 
            v-if="getThirdItem" 
            :item="getThirdItem">
          </card-item>
          <card-item 
            v-bind:style="getColumnSubItemStyle" 
            v-if="getForthItem" 
            :item="getForthItem">
          </card-item>
        </div>
      </div>
    </div>
    <div v-else class="content-wrapper">
      <div class="compose-wrapper">
        <card-item 
          class="top-item" 
          v-bind:style="getColumnItemStyle" 
          v-if="getFirstItem" 
          :item="getFirstItem">
        </card-item>
        <div class="row-wrapper">
          <card-item 
            class="left-item"
            v-bind:style="getColumnSubItemStyle" 
            v-if="getThirdItem" 
            :item="getThirdItem">
          </card-item>
          <card-item 
            v-bind:style="getColumnSubItemStyle" 
            v-if="getForthItem" 
            :item="getForthItem">
          </card-item>
        </div>
      </div>
      <card-item 
        v-bind:style="getRowItemStyle" 
        v-if="getSecondItem"
        :item="getSecondItem">
      </card-item>
    </div>         
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardGroupB2',
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
      if (layout === ENUM.CARDGROUP_LAYOUT.B2L) {
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
    getForthItem: function () {      
      return this.getItemByIndex(3)
    },
    getRowItemStyle: function () {
      const { width, height } = this.getRowItemSize
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getColumnItemStyle: function () {
      const { width, height } = this.getColumnItemSize      
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getColumnSubItemStyle: function () {
      const { width, height } = this.getColumnSubItemSize      
      return {
        width: width + 'px',
        height: height + 'px'
      }
    },
    getRowItemSize: function () {
      const { width, height } = this.getContainerSize            
      return {
        width: height * (3.0 / 4.0),
        height: height
      }
    },
    getColumnItemSize: function () {
      const { width, height } = this.getContainerSize
      return {
        width: height * 0.5 * (9.0 / 4.0),
        height: height * 0.5
      }
    },
    getColumnSubItemSize: function () {
      const { width, height } = this.getColumnItemSize
      return {
        width: width * 0.5,
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
      const { width } = window.screen
      // console.log('====================================');
      // console.log('(w, h) is :', itemWidth, itemHeight);
      // console.log('====================================');
      return {
        width: width,
        height: width * (8.0 / 15.0)
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
  .group-b2-container {
    display: flex;   
  }
  .content-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    border-top: 1px solid $lineColor;    
  }
  .compose-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border-left: 1px solid $lineColor;
  }
  .row-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;  
    border-bottom: 1px solid $lineColor;     
  }
  .left-item {
    border-right: 1px solid $lineColor;
  }
</style>


