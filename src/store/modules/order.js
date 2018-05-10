// order.js
const state = {
  orderStatus: false // orderStatus == true ? 选中 : 不选中
}

// mutations
const mutations = {
  changeStatus(state, active) {
    state.orderStatus = active
  }
}

export default {
  state,
  mutations
}
