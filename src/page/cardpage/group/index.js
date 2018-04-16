import Vue from 'vue'

import CardGroupA from './CardGroupA'
import CardGroupB from './CardGroupB'
import CardGroupB1 from './CardGroupB1'
import CardGroupB2 from './CardGroupB2'
import CardGroupC1 from './CardGroupC1'
import CardGroupC2 from './CardGroupC2'

Vue.component(CardGroupA.name, CardGroupA)
Vue.component(CardGroupB.name, CardGroupB)
Vue.component(CardGroupB1.name, CardGroupB1)
Vue.component(CardGroupB2.name, CardGroupB2)
Vue.component(CardGroupC1.name, CardGroupC1)
Vue.component(CardGroupC2.name, CardGroupC2)

module.export = {
  CardGroupA,
  CardGroupB,
  CardGroupB1,
  CardGroupB2,
  CardGroupC1,
  CardGroupC2,  
}