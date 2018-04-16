<template>
  <div class="group-item-container">
    <div v-if="hasChildItems(layoutItem)">
      <group-item v-for="(subItem, index) in item.children" :key="index"></group-item>
    </div>
    <div v-else>
      <card-item :item="getCardItemByIndex(layoutItem.index)" v-bind:style="getItemStyle"></card-item>
    </div> 
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
export default {
  name: 'GroupItem',
  components: {
    CardItem,
  },
  props: {
    layoutItem: {
      type: Object,
    },
    cardItem: {
      type: Object,
    },
    items: {
      type: Array,
    },
    size: {
      type: Object
    }
  },
  computed: {   
    getItemStyle() {
      const { width, height } = this.size
      return {
        width: width + 'px',
        height: height + 'px',
      }
    }     
  },
  methods: {
    hasChildItems(item) {
      if (item && item.children && item.children.length) {
        return true
      }
      return false
    },
    getCardItemByIndex(index) {
      let item = null
      if (index > -1) {
        item = (this.items && this.items.length >= index) ? this.items[index] : null
      }      
      return item
    }     
  }
}
</script>

<style lang="scss" scoped>
  .group-item-container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    // background-color: $cardbgColor;
    // border-top: 1px solid $lineColor;
    // border-bottom: 1px solid $lineColor;    
  }
</style>


