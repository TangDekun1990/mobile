// profile.js
const state = {
  time: {'noticeTime': '', 'ordertime': ''},
  type: false, // type == false ? join_at : create_at
  isSwitch: true // switch == true ? 开 : 关
}

// mutations
const mutations = {
  saveMessageTime(state, times) {
  	if (times && times.noticeTime) {
  		state.time.noticeTime = times.noticeTime
  	}
  	if (times && times.ordertime) {
  		state.time.ordertime = times.ordertime
  	}
  },
  changeType(state, type) {
    state.type = type
  },
  changeOpen(state, value) {
    // debugger;
    state.isSwitch = value
  }
}

export default {
  state,
  mutations
}
