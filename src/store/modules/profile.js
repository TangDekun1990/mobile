// profile.js
const state = {
	time: {'noticeTime': '', 'ordertime': ''},
	type: false, // type == false ? join_at : create_at
	isSwitch: true, // switch == true ? 开 : 关
	ishasCount: false
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
	changeCount(state, value) {
		state.ishasCount = value
	},
	changeOpen(state, value) {
		state.isSwitch = value
	}
}

export default {
	state,
	mutations
}
