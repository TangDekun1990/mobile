import * as api from '../../api/network/shipping'
// initial state
const state = {  
  selectedItem: null, // 选中的item
  items: [],
}

// getters
const getters = {
}

// mutations
const mutations = {
  selectItem(state, item) {
    const { selectedItem } = state
    if (selectedItem) {
      if (selectedItem.id !== item.id) {
        state.selectedItem = item
      }
    } else {
      if (item) {
        state.selectedItem = item
      }
    }
  },
  saveItems(state, items) {
    state.items = items
  }  
}

// actions 
const actions = {
  fetchShippingList({ commit, state }, params) {
    api.shippingVendorList(params.shop, params.products, params.address).then(
      (response) => {
        if (response && response.vendors) {
          let items = response.vendors
          commit('saveItems', items)
          const { selectedItem } = state
          if (selectedItem === null || selectedItem === undefined) {
            if (items.length) {
              commit('selectItem', items[0])
            }
          }
        }
      }, (error) => {
      })
  }
}

export default {  
  state,
  actions
}