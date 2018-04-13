import Vue from 'vue'

import CardGroupA from './CardGroupA'
import CardGroupB1L from './CardGroupB1L'
import CardGroupC1 from './CardGroupC1'
import CardGroupC2 from './CardGroupC2'

Vue.component(CardGroupA.name, CardGroupA)
Vue.component(CardGroupB1L.name, CardGroupB1L)
Vue.component(CardGroupC1.name, CardGroupC1)
Vue.component(CardGroupC2.name, CardGroupC2)

module.export = {
  CardGroupA,
  CardGroupB1L,
  CardGroupC1,
  CardGroupC2,  
}