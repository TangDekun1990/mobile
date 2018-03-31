import * as api from '../../api/network/coupon'
// initial state
const state = {
  selectedItem: null, // 选中的item
  items: [],
  total: 0,
}

// getters
const getters = {
}

// mutations
const mutations = {
  selectCouponItem(state, item) {
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
  unselectCouponItem(state) {
    state.selectedItem = null
  },
  saveCouponItems(state, items) {
    state.items = items
  },
  saveCouponTotal(state, total) {
    state.total = total
  },
}

// actions 
const actions = {
  fetchCouponUsable({ commit, state }, params) {
    api.couponAvailable(params.page, params.per_page, params.shop, params.total_price).then(
      (response) => {
        if (response && response.coupons) {
          let items = response.coupons
          let total = response.paged.total
          commit('saveCouponItems', items)
          commit('saveCouponTotal', total)          
        }
      }, (error) => {
      })
  }
}

export default {
  state,
  mutations,
  actions,
}