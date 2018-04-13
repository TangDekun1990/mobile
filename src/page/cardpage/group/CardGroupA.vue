<template>
  <div class="group-a-container">
    <card-item 
      class="item" 
      v-bind:style="getItemStyle" 
      v-for="(item, index) in getItems" 
      :key="index" 
      :item="item">
    </card-item>     
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
      let columnCount = 1 // 每行的列数；默认只有一列
      let ratio = 1 // 每个item的宽高比
      let layout = this.item ? this.item.layout : null      
      if (layout === ENUM.CARDGROUP_LAYOUT.A1H) {                
        columnCount = 1
        ratio = 5.0 / 2.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A1S) {                
        columnCount = 1
        ratio = 3.0 / 1.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2S) {                
        columnCount = 2
        ratio = 3.0 / 2.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2H) {                
        columnCount = 2
        ratio = 5.0 / 4.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2XS) {                
        columnCount = 2
        ratio = 9.0 / 5.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2XH) {                
        columnCount = 2
        ratio = 4.0 / 5.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A2XXH) {                
        columnCount = 2
        ratio = 7.0 / 10.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3S) {                
        columnCount = 3
        ratio = 1.0 / 1.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3H) {                
        columnCount = 3
        ratio = 5.0 / 6.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3XH) {                
        columnCount = 3
        ratio = 11.0 / 15.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A3XXH) { 
        debugger               
        columnCount = 3
        ratio = 7.0 / 10.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A4H) {                
        columnCount = 4
        ratio = 5.0 / 8.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A4S) {                
        columnCount = 4
        ratio = 3.0 / 4.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A5H) {                
        columnCount = 5
        ratio = 1.0 / 2.0
      } else if (layout === ENUM.CARDGROUP_LAYOUT.A5S) {                
        columnCount = 5
        ratio = 3.0 / 5.0
      } else {
        columnCount = 1
        ratio = 1.0 / 1.0
      }
      let seperatorWidth = (columnCount - 0) * 1 // 分割线宽度
      itemWidth = (width - seperatorWidth) / columnCount  
      itemHeight = itemWidth / ratio
      console.log('====================================');
      console.log('layout is: ', layout)
      console.log('(itemWidth, itemHeight)', itemWidth, itemHeight);
      console.log('====================================');
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
  .item {
    border-right: 1px solid $lineColor;
    // border-top: 1px solid  $lineColor; 
    border-bottom: 1px solid $lineColor; 
  }
</style>


