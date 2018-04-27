<template>
  <div class="group-c3s-container" v-bind:style="getContainerStyle">
    <img class="icon" src="../../../assets/image/change-icon/b0_activty@2x.png" />
    <div class="list" v-bind:style="getItemStyle" >
      <card-item 
        class="item" 
        v-bind:style="getItemStyle" 
        v-for="(item, index) in getItems" 
        :key="index" 
        :item="item">
      </card-item>
    </div>         
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
import Common from './Common'
export default {
  name: 'CardGroupC3',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  computed: {  
    getContainerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0      
      itemWidth = width
      itemHeight = width * (1.0 / 9.0)
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },   
    getItemStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0      
      itemWidth = width - 32  
      itemHeight = width * (1.0 / 9.0)
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .group-c3s-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: $cardbgColor;
  }
  .icon {
    width: 24px;
    height: 24px;
    margin-left: 4px;
    margin-right: 4px;
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow: auto;
  }
</style>


