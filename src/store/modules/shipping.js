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
  selectShippingItem(state, item) {
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
  saveShippingItems(state, items) {
    state.items = items
  }  
}

// actions 
const actions = {
  fetchShippingList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      api.shippingVendorList(params.shop, params.products, params.address).then(
        (response) => {
          if (response && response.vendors) {
            let items = response.vendors
            commit('saveShippingItems', items)
            const { selectedItem } = state
            if (selectedItem === null || selectedItem === undefined) {
              if (items.length) {
                commit('selectShippingItem', items[0])
              }
            }
            resolve(response)
          }
        }, (error) => {
          reject(error)
        }) 
    })   
  }
}

export default {  
  state,
  mutations,
  actions
}