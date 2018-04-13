<template>
  <div class="group-c2-container">
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
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardGroupC2',
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
      let columnCount = 4 // 每行的列数；默认只有一列
      let ratio = 1 // 每个item的宽高比
      
      let seperatorWidth = 0 // 分割线宽度
      itemWidth = (width - seperatorWidth) / columnCount  
      itemHeight = itemWidth / ratio
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .group-c2-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    background-color: $cardbgColor;
  }
</style>


