// tabbar.js
const state = {
	currentTabBar: 'home'
}

// mutations
const mutations = {
	changeTabBar(state, value) {
		state.currentTabBar = value;
	}
}

export default {
	state,
	mutations
}
