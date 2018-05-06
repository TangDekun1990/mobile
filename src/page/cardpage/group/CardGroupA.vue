<template>
  <div class="group-a-container">
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
  name: 'CardGroupA',
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
        case ENUM.CARDGROUP_LAYOUT.A1H:
        {                
          columnCount = 1
          ratio = 5.0 / 2.0
        }
        break;
        case ENUM.CARDGROUP_LAYOUT.A1S: 
        {                
          columnCount = 1
          ratio = 3.0 / 1.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A2S: 
        {                
          columnCount = 2
          ratio = 3.0 / 2.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A2H: 
        {                
          columnCount = 2
          ratio = 5.0 / 4.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A2XS: 
        {                
          columnCount = 2
          ratio = 9.0 / 5.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A2XH: 
        {                
          columnCount = 2
          ratio = 4.0 / 5.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A2XXH: 
        {                
          columnCount = 2
          ratio = 5.0 / 7.0 // TODO:
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A3S: 
        {                
          columnCount = 3
          ratio = 1.0 / 1.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A3H: 
        {                
          columnCount = 3
          ratio = 2.0 / 3.0 // TODO:
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A3XH: 
        {                
          columnCount = 3
          ratio = 11.0 / 15.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A3XXH: 
        {                       
          columnCount = 3
          ratio = 2.0 / 3.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A4H: 
        {                
          columnCount = 4
          ratio = 5.0 / 8.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A4S: 
        {                
          columnCount = 4
          ratio = 3.0 / 4.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A5H: 
        {                
          columnCount = 5
          ratio = 1.0 / 2.0
        } 
        break; 
        case ENUM.CARDGROUP_LAYOUT.A5S: 
        {                
          columnCount = 5
          ratio = 3.0 / 5.0
        } 
        break;        
      
        default:
        {
          columnCount = 1
          ratio = 1.0 / 1.0
        }
          break;
      }    
      let seperatorWidth = (columnCount - 0) * 1 // 分割线宽度
      itemWidth = (width - seperatorWidth) / columnCount  
      itemHeight = itemWidth / ratio
      if (layout === ENUM.CARDGROUP_LAYOUT.A1H || 
          layout === ENUM.CARDGROUP_LAYOUT.A1S || 
          layout === ENUM.CARDGROUP_LAYOUT.N1) {
        return {
          'width': itemWidth + 'px',
          'height': itemHeight + 'px'          
        }
      } else {
        return {
          'width': itemWidth + 'px',
          'height': itemHeight + 'px',
          'border-right': '1px solid #E8EAED',     
          'border-bottom': '1px solid #E8EAED'
        }
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


