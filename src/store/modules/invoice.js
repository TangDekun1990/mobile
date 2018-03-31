import * as api from '../../api/network/invoice'

// initial state
const state = {
  type: null,
  title: '',
  content: null, 
  toggle: false, 
  isSave: false,
  typeItems: [],  // 发票类型
  contentItems: [], // 发票内容
}

// getters
const getters = {  
  getTypeIndex: (state, getters) => {
    return getters.getItemIndex(state.type, state.typeItems)
  },
  getContentIndex: (state, getters) => {
    return getters.getItemIndex(state.content, state.contentItems)
  },
  getItemIndex: (state) => (item, items) => {
    let index = -1
    if (item && items && items.length) {
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (item.id === element.id) {
          index = i
        }
      }
    }
    return index
  }
}

// mutations
const mutations = {
  saveInvoiceInfo(state, payload) {
    state.type = payload.type
    state.title = payload.title
    state.content = payload.content
    state.isSave = true
  },
  clearInvoiceInfo(state) {
    state.type = null
    state.title = ''
    state.content = null
    state.isSave = false
  },
  setInvoiceToggle(state, toggle) {
    state.toggle = toggle
  },
  saveInvoiceTypeItems(state, items) {
    state.typeItems = items
  },
  saveInvoiceContentItems(state, items) {
    state.contentItems = items
  },
}

// actions
const actions = {
  fetchInvoiceTypeItems({ commit, state }) {
    api.invoiceTypeList().then(
      (response) => {
        if (response && response.types) {
          commit('saveInvoiceTypeItems', response.types)
        }
      }, (error) => {

      })
  },
  fetchInvoiceContentItems({ commit, state }) {
    api.invoiceContentList().then(
      (response) => {
        if (response && response.contents) {
          commit('saveInvoiceContentItems', response.contents)
        }
      }, (error) => {

      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}