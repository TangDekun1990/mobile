<template>
  <card-group-a v-if="isCardGroup('A')" :item="item"></card-group-a>
  <!-- <card-group-b v-else-if="isCardGroupB" :item="item"></card-group-b> -->
  <card-group-b1 v-else-if="isCardGroupB1B5" :item="item"></card-group-b1> 
  <card-group-b2 v-else-if="isCardGroup('B2')" :item="item"></card-group-b2> 
  <card-group-b3 v-else-if="isCardGroup('B3')" :item="item"></card-group-b3> 
  <card-group-b4 v-else-if="isCardGroup('B4')" :item="item"></card-group-b4> 
  <card-group-c1 v-else-if="isCardGroup('C1')" :item="item"></card-group-c1>
  <card-group-c2 v-else-if="isCardGroup('C2')" :item="item"></card-group-c2>
  <card-group-n v-else-if="isCardGroup('N')" :item="item"></card-group-n>
</template>

<script>
import { ENUM } from '../../../config/enum'
import { 
  CardGroupA, 
  CardGroupB,
  CardGroupB1,
  CardGroupB2,
  CardGroupB3,
  CardGroupB4, 
  CardGroupC1,
  CardGroupC2,
  CardGroupN, 
} from '../../cardpage/group'
export default {
  name: 'CardGroup',
  props: {
    item: {
      type: Object
    }
  },
  computed: {  
    // isCardGroupAN: function () {
    //   return this.isCardGroup('A') || this.isCardGroup('N')
    // },     
    isCardGroupB1B5: function () {
      return this.isCardGroup('B1') || this.isCardGroup('B5')
    },    
  },
  methods: {     
    isCardGroup(style) {
      let layout = this.item ? this.item.layout : null      
      if (layout && layout.length && layout.indexOf(style) >= 0) {
        return true
      }
      return false
    },    
  },
}
</script>



