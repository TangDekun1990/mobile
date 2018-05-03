<template>
  <div class="group-container">
    <group-section class="group-section" :item="item" v-if="isShowGroupSection">
    </group-section>
    <div class="group-content">
      <card-group-a3-x-x-h v-if="isCardGroup('A3XXH')" :item="item"></card-group-a3-x-x-h>
      <card-group-a v-else-if="isCardGroup('A')" :item="item"></card-group-a>
      <card-group-b1 v-else-if="isCardGroupB1B5" :item="item"></card-group-b1> 
      <card-group-b2 v-else-if="isCardGroup('B2')" :item="item"></card-group-b2> 
      <card-group-b3 v-else-if="isCardGroup('B3')" :item="item"></card-group-b3> 
      <card-group-b4 v-else-if="isCardGroup('B4')" :item="item"></card-group-b4> 
      <card-group-c1 v-else-if="isCardGroup('C1')" :item="item"></card-group-c1>
      <card-group-c2 v-else-if="isCardGroup('C2')" :item="item"></card-group-c2>
      <card-group-c3 v-else-if="isCardGroup('C3')" :item="item"></card-group-c3>
      <card-group-c4 v-else-if="isCardGroupC4C5" :item="item"></card-group-c4> 
      <card-group-n v-else-if="isCardGroup('N')" :item="item"></card-group-n>
    </div>
  </div>    
</template>

<script>
import { ENUM } from '../../../config/enum'
import { 
  CardGroupA,
  CardGroupA3XXH, 
  CardGroupB,
  CardGroupB1,
  CardGroupB2,
  CardGroupB3,
  CardGroupB4, 
  CardGroupC1,
  CardGroupC2,
  CardGroupC3,  
  CardGroupC4,
  CardGroupN, 
} from '../../cardpage/group'
import GroupSection from './GroupSection'
export default {
  name: 'CardGroup',
  components: {
    GroupSection,
  },
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
    isCardGroupC4C5: function () {
      return this.isCardGroup('C4') || this.isCardGroup('C5')
    }, 
    isShowGroupSection () {
      let isShow = false
      if (this.isCardGroup(ENUM.CARDGROUP_LAYOUT.C1H) || 
          this.isCardGroup(ENUM.CARDGROUP_LAYOUT.C3S)) {
        isShow = false
      } else {
        let title = this.item.title
        let link = this.item.link
        if ((title && title.length) || (link && link.length)) {
          isShow = true
        } else {
          isShow = false
        }
      }
      return isShow
    }   
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

<style lang="scss" scoped>
  .group-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    // height: auto;    
  }
  .group-section {
    height: 40px;
    background-color: lightblue;
  }
  .group-content {
    // height: auto;
  }
</style>

