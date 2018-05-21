<template>  
  <card-h1 v-if="isCardH1" :item="item"></card-h1>
  <card-h2-l v-else-if="isCardH2L" :item="item"></card-h2-l>
  <card-h2-r v-else-if="isCardH2R" :item="item"></card-h2-r>
  <card-v2-b v-else-if="isCardV2B" :item="item"></card-v2-b>
  <card-v2-t v-else-if="isCardV2T" :item="item"></card-v2-t>
  <card-v3-b v-else-if="isCardV3B" :item="item"></card-v3-b>
  <card-v3-t v-else-if="isCardV3T" :item="item"></card-v3-t>
  <card-v4-b v-else-if="isCardV4B" :item="item"></card-v4-b>
  <card-v4-t v-else-if="isCardV4T" :item="item"></card-v4-t>
  <card-v5 v-else-if="isCardV5" :item="item"></card-v5>  
  <card-z1 v-else-if="isCardZ1" :item="item"></card-z1>
  <card-z2 v-else-if="isCardZ2" :item="item"></card-z2>
  <card-z2-l v-else-if="isCardZ2L" :item="item"></card-z2-l>
  <card-z2-p v-else-if="isCardZ2P" :item="item"></card-z2-p>
  <card-z3 v-else-if="isCardZ3" :item="item"></card-z3>
  <card-z3-s v-else-if="isCardZ3S" :item="item"></card-z3-s>
  <card-z4 v-else-if="isCardZ4" :item="item"></card-z4>
</template>

<script>
import {
  CardH1,
  CardH2L,
  CardH2R,
  CardV2B,
  CardV2T,
  CardV3B,
  CardV3T,
  CardV4B,
  CardV4T,
  CardV5,
  CardZ1,
  CardZ2,
  CardZ2L,
  CardZ2P,
  CardZ3,
  CardZ3S,
  CardZ4,
} from './index'
import { ENUM } from '../../../config/enum'
export default {
  name: 'CardItem',
  props: {
    item: {
      type: Object
    }
  },
  computed: {  
    isCardH1: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.H1L) || this.isCardItemByStyle(ENUM.CARD_STYLE.H1R)
    },
    isCardH2L: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.H2L)
    },
    isCardH2R: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.H2R)
    },
    isCardV2B: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V2B)
    },
    isCardV2T: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V2T)
    },
    isCardV3B: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V3B)
    },
    isCardV3T: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V3T)
    },
    isCardV4B: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V4B)
    },
    isCardV4T: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V4T)
    },
    isCardV5: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.V5B) || this.isCardItemByStyle(ENUM.CARD_STYLE.V5T)
    },
    isCardZ1: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z1)
    },
    isCardZ2: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z2)
    },
    isCardZ2L: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z2L)
    },
    isCardZ2P: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z2P)
    },
    isCardZ3: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z3)
    },
    isCardZ3S: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z3S)
    },
    isCardZ4: function () {
      return this.isCardItemByStyle(ENUM.CARD_STYLE.Z4)
    },
  },
  methods: {     
    isCardItemByStyle(itemStyle) {
      let style = this.item ? this.item.style : null
      // console.log('====================================');
      // console.log('（style，itemStyle）  :', style, itemStyle);      
      // console.log('====================================');
      if (style === itemStyle) {
        return true
      }
      return false
    }   
  },
}
</script>



