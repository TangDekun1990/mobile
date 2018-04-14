<template>
  <div class="group-item-container">
    <div v-if="hasChildItems(item)">
      <group-item v-for="(subItem, index) in item.children" :key="index"></group-item>
    </div>
    <div v-else>
      <card-item :item="item"></card-item>
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
    item: {
      type: Object,
    },
    data: {
      type: Array,
    }
  },
  data() {
    return {  
      b1lItems: [
        {
          id: '1-1',
          ratio: 3.0 / 4.0,
          children: [],
        },
        {
          id: '2-1',
          ratio: 9.0 / 8.0,
          children: [
            {
              id: '2-1-1',
              ratio: 9.0 / 4.0,
              children: [],
            },
            {
              id: '2-1-2',
              ratio: 9.0 / 4.0,
              children: [],
            },
          ],
        },
      ],    
    }
  },
  computed: {   
    getItemStyle(item) {
      
    }     
  },
  methods: {
    hasChildItems(item) {
      if (item && item.children && item.children.length) {
        return true
      }
      return false
    },     
  }
}
</script>

<style lang="scss" scoped>
  .group-item-container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    // border-top: 1px solid $lineColor;
    // border-bottom: 1px solid $lineColor;    
  }
</style>


