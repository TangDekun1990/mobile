<template>
  <div class="group-c4-container">
    <card-item 
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
  name: 'CardGroupC4',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  computed: {
    getItemStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0
      let columnCount = 1 // 每行的列数；默认只有一列
      let ratio = 1 // 每个item的宽高比
      let layout = this.item ? this.item.layout : null  
      switch (layout) {
        case ENUM.CARDGROUP_LAYOUT.C4:
        {                
          columnCount = 1
          ratio = 15.0 / 2.0
        }
        break;
        case ENUM.CARDGROUP_LAYOUT.C5: 
        {                
          columnCount = 1
          ratio = 335.0 / 341.0
        } 
        break;               
        default:
        {
          columnCount = 1
          ratio = 1.0 / 1.0
        }
          break;
      }    
      let seperatorWidth = (columnCount - 1) * 1 // 分割线宽度
      itemWidth = (width - seperatorWidth) / columnCount  
      itemHeight = itemWidth / ratio
      return {
        'width': itemWidth + 'px',
        'height': itemHeight + 'px'          
      }      
    },
  },
  methods: {    
  }
}
</script>

<style lang="scss" scoped>
  .group-c4-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    background-color: $cardbgColor;     
  }
</style>


