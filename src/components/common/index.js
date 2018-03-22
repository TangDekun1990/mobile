import Vue from 'vue';

import HeaderView from './HeaderView'
import HeaderItem from './HeaderItem'
import CountdownButton from './CountdownButton'

Vue.component(HeaderView.name, HeaderView)
Vue.component(HeaderItem.name, HeaderItem)
Vue.component(CountdownButton.name, CountdownButton)

module.export = {  
  HeaderView,
  HeaderItem,
  CountdownButton,
}