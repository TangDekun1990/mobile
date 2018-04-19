import Vue from 'vue'

import CardGroupA from './CardGroupA'
import CardGroupB from './CardGroupB'
import CardGroupB1 from './CardGroupB1'
import CardGroupB2 from './CardGroupB2'
import CardGroupB3 from './CardGroupB3'
import CardGroupB4 from './CardGroupB4'
import CardGroupC1 from './CardGroupC1'
import CardGroupC2 from './CardGroupC2'
import CardGroupN from './CardGroupN'

Vue.component(CardGroupA.name, CardGroupA)
Vue.component(CardGroupB.name, CardGroupB)
Vue.component(CardGroupB1.name, CardGroupB1)
Vue.component(CardGroupB2.name, CardGroupB2)
Vue.component(CardGroupB3.name, CardGroupB3)
Vue.component(CardGroupB4.name, CardGroupB4)
Vue.component(CardGroupC1.name, CardGroupC1)
Vue.component(CardGroupC2.name, CardGroupC2)
Vue.component(CardGroupN.name, CardGroupN)

module.export = {
  CardGroupA,
  CardGroupB,
  CardGroupB1,
  CardGroupB2,
  CardGroupB3,
  CardGroupB4,
  CardGroupC1,
  CardGroupC2,
  CardGroupN,  
}