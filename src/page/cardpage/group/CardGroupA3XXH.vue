<template>
  <div class="group-a3xxh-container">    
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
  name: 'CardGroupA3XXH',
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
      
      columnCount = 3
      ratio = 2.0 / 3.0

      let seperatorWidth = (columnCount - 0) * 1 // 分割线宽度
      itemWidth = (width - seperatorWidth) / columnCount  
      itemHeight = itemWidth / ratio
      console.log('====================================');
      console.log(itemWidth, itemHeight);
      console.log('====================================');
      return {
        'width': itemWidth + 'px',
        'height': itemHeight + 'px',
        'border-right': '1px solid #E8EAED',
        'flex-shrink': '0',
        'flex-basis': itemWidth + 'px',              
      }     
    },
  },
  methods: {    
  }
}
</script>

<style lang="scss" scoped>
  .group-a3xxh-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;  
    overflow: auto;
  }
  .item {
    width: 124px;
    height: 186px;
  }
</style>


