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
import Common from './Common'
export default {
  name: 'CardGroupC2',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  computed: {
    getItems: function () {
      let items = []
      let cards = this.item ? this.item.cards : []
      for (let index = 0; index < cards.length; index++) {
        const card = cards[index]
        if ((card.title && card.title.length) || 
        (card.photo && card.photo.thumb && card.photo.thumb.length)) {
          items.push(card)
        }
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


