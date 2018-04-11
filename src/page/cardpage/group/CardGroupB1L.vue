<template>
  <div class="group-b1l-container" :class="getContainerStyle">
    <card-item class="leftItem" v-if="getFirstItem" :item="getFirstItem"></card-item>
    <div class="right-wrapper">
      <card-item class="rightItem" v-if="getSecondItem" :item="getSecondItem"></card-item>
      <card-item class="rightItem" v-if="getThirdItem" :item="getThirdItem"></card-item>
    </div>     
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardGroupB1L',
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
    getFirstItem: function () {
      return this.getItemByIndex(0)
    },
    getSecondItem: function () {
      return this.getItemByIndex(1)
    },
    getThirdItem: function () {      
      return this.getItemByIndex(2)
    },
    getContainerStyle: function() {
      let itemWidth = 0
      let itemHeight = 0
      const { width, height } = window.screen
      itemWidth = width
      itemHeight = itemWidth * (8.0 / 15.0)
      console.log('====================================');
      console.log('(w,)');
      console.log('====================================');
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
  },
  methods: {
    getItemByIndex(index) {
      let items = this.getItems
      if (items && items.length > index) {
        return items[index]
      }
      return null
    }, 
  }
}
</script>

<style lang="scss" scoped>
  .group-b1l-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
  }
  .leftItem {
    flex: 6;
  }
  .right-wrapper {
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .rightItem {
    flex: 1;
  }
</style>


