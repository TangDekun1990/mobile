import * as api from '../../api/network/coupon'
// initial state
const state = {
  selectedItem: null, // 选中的item
  items: [],
  total: 0,
  page: 1, // 当前页码
  isMore: true // 是否有更多
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
  saveCouponPaged(state, payload) {
    state.total = payload.total
    state.page = payload.page
    state.isMore = payload.isMore
  },
}

// actions 
const actions = {
  fetchCouponUsable({ commit, state }, params) {
    debugger
    let page = params.isFirstPage ? 1 : state.page
    let per_page = 10
    api.couponAvailable(page, per_page, params.shop, params.total_price).then(
      (response) => {
        if (response && response.coupons) {
          let items = state.items
          if (params.isFirstPage) {
            page = 1
            items = response.coupons            
          } else {            
            items = items.concat(response.coupons)
          }   
          page = page + 1;       
          let total = response.paged.total
          let isMore = response.paged.more
          commit('saveCouponItems', items) 
          commit('saveCouponPaged', { page, total, isMore })       
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