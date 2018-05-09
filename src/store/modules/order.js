// order.js
const state = {
  orderStatus: true // orderStatus == true ? 选中 : 不选中
}

// mutations
const mutations = {
  changeStatus (state, active) {
    state.orderStatus = active
  }
}

export default {
  state,
  mutations
}
