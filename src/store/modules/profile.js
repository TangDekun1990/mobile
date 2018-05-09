// profile.js
const state = {
  time: {'noticeTime':'', ordertime: ''},
  type: false, // type == false ? join_at : create_at
  switch: true // switch == true ? 开 : 关
}

// mutations
const mutations = {
  saveMessageTime(state, times) {
    state.time.noticeTime = times.noticeTime
    state.time.ordertime = times.ordertime
  },
  changeType(state, type) {
    state.type = type
  },
  isOpen(state, open) {
    state.switch = open
  }
}

export default {
  state,
  mutations
}