import Vue from 'vue';

import HeaderView from './HeaderView'
import HeaderItem from './HeaderItem'
import CountdownButton from './CountdownButton'
import InfoRadioItem from './InfoRadioItem'
import InfoRadioList from './InfoRadioList'
import FormInputItem from './FormInputItem'
import FormTextItem from './FormTextItem'
import Webview from './Webview'

Vue.component(HeaderView.name, HeaderView)
Vue.component(HeaderItem.name, HeaderItem)
Vue.component(CountdownButton.name, CountdownButton)
Vue.component(InfoRadioItem.name, InfoRadioItem)
Vue.component(InfoRadioList.name, InfoRadioList)
Vue.component(FormInputItem.name, FormInputItem)
Vue.component(FormTextItem.name, FormTextItem)
Vue.component(Webview.name, Webview)

module.export = {  
  HeaderView,
  HeaderItem,
  CountdownButton,
  InfoRadioItem,
  InfoRadioList,  
  FormInputItem,
  FormTextItem,
  Webview,
}