<template>
  <div class="group-b2-container" v-bind:style="getContainerStyle">
    <div v-if="isLeft" class="content-wrapper">
      <card-item 
        v-bind:style="getRowItemStyle"  
        v-if="getItemByIndex(0)"
        :item="getItemByIndex(0)">
      </card-item>
      <div class="compose-wrapper border-left">
        <div class="row-wrapper border-bottom">
          <card-item 
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(1)" 
            :item="getItemByIndex(1)">
          </card-item>
          <card-item 
            class="border-left"
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(2)" 
            :item="getItemByIndex(2)">
          </card-item>
        </div>        
        <div class="row-wrapper">
          <card-item 
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(3)" 
            :item="getItemByIndex(3)">
          </card-item>
          <card-item 
            class="border-left"
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(4)" 
            :item="getItemByIndex(4)">
          </card-item>
        </div>
      </div>
    </div>
    <div v-else class="content-wrapper">
      <div class="compose-wrapper">
        <div class="row-wrapper border-bottom">
          <card-item             
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(0)" 
            :item="getItemByIndex(0)">
          </card-item>
          <card-item
            class="border-left"
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(1)" 
            :item="getItemByIndex(1)">
          </card-item>
        </div>
        <div class="row-wrapper">
          <card-item 
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(3)" 
            :item="getItemByIndex(3)">
          </card-item>
          <card-item
            class="border-left" 
            v-bind:style="getColumnSubItemStyle" 
            v-if="getItemByIndex(4)" 
            :item="getItemByIndex(4)">
          </card-item>
        </div>
      </div>
      <card-item
        class="border-left" 
        v-bind:style="getRowItemStyle" 
        v-if="getItemByIndex(2)"
        :item="getItemByIndex(2)">
      </card-item>
    </div>         
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
import Common from './Common'
export default {
  name: 'CardGroupB3',
  mixins: [ Common ],
  components: {
    CardItem,
  },  
  computed: {      
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
        width: height * 0.5 * (9.0 / 4.0) - 2,
        height: height * 0.5 - 1
      }
    },
    getColumnSubItemSize: function () {
      const { width, height } = this.getColumnItemSize
      return {
        width: (width - 1) * 0.5,
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
      return {
        width: width,
        height: width * (8.0 / 15.0)
      }
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
  }
  .compose-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .border-left {
    border-left: 1px solid $lineColor;
  }
  .border-bottom {
    border-bottom: 1px solid $lineColor;
  }
  .row-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;    
  }
</style>


