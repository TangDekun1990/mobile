<template>
  <mt-swipe v-bind:style="getContainerStyle">
    <mt-swipe-item v-for="(item, index) in getItems" :key="index">
      <card-item v-bind:style="getContainerStyle" :item="item"></card-item>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
import Common from './Common'
export default {
  name: 'CardGroupC1',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  computed: {
    getContainerStyle: function() {
      let itemWidth = 0
      let itemHeight = 0
      let layout = this.item ? this.item.layout : null      
      const { width, height } = window.screen
      itemWidth = width
      if (layout === ENUM.CARDGROUP_LAYOUT.C1H) {
        itemHeight = itemWidth * (1.0 / 2.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.C1S) {
        itemHeight = itemWidth * (1.0 / 3.0)        
      }           
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
  }
}
</script>

<style lang="scss">
  .group-c1-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    background-color: $cardbgColor;
  }
  .mint-swipe-indicators {
    div.mint-swipe-indicator{
      background: #EFEFF4;
      opacity: 1;
      &.is-active {
        background: #EF3338;
      }
    }
  }
</style>


