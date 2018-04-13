<template>
  <card-group-a v-if="isCardGroupA" :item="item"></card-group-a>
  <card-group-b1-l v-else-if="isCardGroupB1L" :item="item"></card-group-b1-l>
  <card-group-c1 v-else-if="isCardGroupC1" :item="item"></card-group-c1>
</template>

<script>
import { ENUM } from '../../../config/enum'
import { CardGroupA, CardGroupB1L, CardGroupC1 } from '../../cardpage/group'
export default {
  name: 'CardGroup',
  props: {
    item: {
      type: Object
    }
  },
  computed: {  
    isCardGroupA: function () {
      let layout = this.item ? this.item.layout : null      
      if (layout && layout.length && layout.indexOf('A') >= 0) {
        return true
      }
      return false
    }, 
    isCardGroupB1L: function () {
      return this.isGroupItemByStyle(ENUM.CARDGROUP_LAYOUT.B1L)
    },
    isCardGroupC1: function () {
      let isGroupC1H = this.isGroupItemByStyle(ENUM.CARDGROUP_LAYOUT.C1H)
      let isGroupC1S = this.isGroupItemByStyle(ENUM.CARDGROUP_LAYOUT.C1S)
      return isGroupC1H || isGroupC1S
    },   
  },
  methods: {     
    isGroupItemByStyle(itemLayout) {
      let layout = this.item ? this.item.layout : null
      // console.log('====================================');
      // console.log('layout is :', layout);
      // console.log('====================================');
      if (layout === itemLayout) {
        return true
      }
      return false
    },   
  },
}
</script>



