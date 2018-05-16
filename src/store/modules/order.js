// order.js
const state = {
  orderStatus: 10, // orderStatus == true ? 选中 : 不选中
  orderItem: {}
}

// mutations
const mutations = {
  changeStatus(state, active) {
    state.orderStatus = active
  },
  changeItem(state, item) {
    state.orderItem = item
  },
}

export default {
  state,
  mutations
}
