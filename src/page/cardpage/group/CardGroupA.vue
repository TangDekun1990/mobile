<template>
  <div class="group-a-container">
    <card-item v-bind:style="getItemStyle" v-for="(item, index) in getItems" :key="index" :item="item"></card-item>     
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardGroupA',
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
    getItemStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0
      let layout = this.item ? this.item.layout : null      
      if (layout === ENUM.CARDGROUP_LAYOUT.A1H) {
        itemWidth = width * 1
        itemHeight = itemWidth * (2.0 / 5.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A1S) {
        itemWidth = width * 1
        itemHeight = itemWidth * (1.0 / 3.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2S) {
        itemWidth = width * 0.5
        itemHeight = itemWidth * (2.0 / 3.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2H) {
        itemWidth = width * 0.5
        itemHeight = itemWidth * (4.0 / 5.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2XS) {
        itemWidth = width * 0.5
        itemHeight = itemWidth * (5.0 / 9.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2XH) {
        itemWidth = width * 0.5
        itemHeight = itemWidth * (5.0 / 4.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2XXH) {
        itemWidth = width * 0.5
        itemHeight = itemWidth * (10.0 / 7.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3S) {
        itemWidth = width * (1.0 / 3.0)
        itemHeight = itemWidth * (1.0 / 1.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3H) {
        itemWidth = width * (1.0 / 3.0)
        itemHeight = itemWidth * (6.0 / 5.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3XH) {
        itemWidth = width * (1.0 / 3.0)
        itemHeight = itemWidth * (15.0 / 11.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3XXH) {
        itemWidth = width * (1.0 / 3.0)
        itemHeight = itemWidth * (10.0 / 7.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A4H) {
        itemWidth = width * (1.0 / 4.0)
        itemHeight = itemWidth * (8.0 / 5.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A4S) {
        itemWidth = width * (1.0 / 4.0)
        itemHeight = itemWidth * (4.0 / 3.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A5H) {
        itemWidth = width * (1.0 / 5.0)
        itemHeight = itemWidth * (2.0 / 1.0)
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A5S) {
        itemWidth = width * (1.0 / 5.0)
        itemHeight = itemWidth * (5.0 / 3.0)
      } else {
        itemWidth = width
        itemHeight = itemWidth
      }
      // console.log('====================================');
      // console.log('layout is: ', layout)
      // console.log('ENUM.CARDGROUP_LAYOUT.A1S is: ', ENUM.CARDGROUP_LAYOUT.A1S)
      // console.log('(itemWidth, itemHeight)', itemWidth, itemHeight);
      // console.log('====================================');
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
  },
  methods: {    
  }
}
</script>

<style lang="scss" scoped>
  .group-a-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    background-color: $cardbgColor;
  }
</style>


