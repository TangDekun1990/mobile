import Vue from 'vue';

import HeaderView from './HeaderView'
import HeaderItem from './HeaderItem'
import CountdownButton from './CountdownButton'
import InfoRadioItem from './InfoRadioItem'
import InfoRadioList from './InfoRadioList'

Vue.component(HeaderView.name, HeaderView)
Vue.component(HeaderItem.name, HeaderItem)
Vue.component(CountdownButton.name, CountdownButton)
Vue.component(InfoRadioItem.name, InfoRadioItem)
Vue.component(InfoRadioList.name, InfoRadioList)

module.export = {  
  HeaderView,
  HeaderItem,
  CountdownButton,
  InfoRadioItem,
  InfoRadioList,  
}