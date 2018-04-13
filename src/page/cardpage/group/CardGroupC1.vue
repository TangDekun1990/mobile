<template>
  <mt-swipe :style="getContainerStyle">
    <mt-swipe-item v-for="(item, index) in getItems" :key="index">
      <card-item :style="getContainerStyle" :item="item"></card-item>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardGroupC1',
  components: {
    CardItem,
  },
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getItems: function () {
      let items = []
      if (this.item && this.item.cards && this.item.cards.length) {
        items = this.item.cards
      }
      return items
    },
    getContainerStyle: function() {
      let itemWidth = 0
      let itemHeight = 0
      let layout = this.item ? this.item.layout : null      
      const { width, height } = window.screen
      itemWidth = width
      if (layout === ENUM.CARDGROUP_LAYOUT.C1H) {
        itemHeight = itemWidth * (1.0 / 2.0)
        // console.log('====================================');
        // console.log('CARDGROUP_LAYOUT.C1H is ', itemWidth, itemHeight);
        // console.log('====================================');
      } else if (layout === ENUM.CARDGROUP_LAYOUT.C1S) {
        itemHeight = itemWidth * (1.0 / 3.0)
        // console.log('CARDGROUP_LAYOUT.C1S is ', itemWidth, itemHeight);
      }           
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .group-c1-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    background-color: $cardbgColor;
  }
</style>


