// tabbar.js
const state = {
	currentTabBar: 'home',
	cartNumber: 0
}

// mutations
const mutations = {
	changeTabBar(state, value) {
		state.currentTabBar = value;
	},

	setCartNumber(state, value) {
		state.cartNumber = value;
	}
}

export default {
	state,
	mutations
}
