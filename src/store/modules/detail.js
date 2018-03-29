// initial state
const state = {
	isHideCart: true,
	isHideHeader: true,
	detailInfo: {},
	swiperIndex: 0,
	isShowcartInfo: false,
	currentPathIndex: 1
}

// mutations
const mutations = {
	changeStatus(state, isHide) {
		state.isHideHeader = isHide;
		state.isHideCart = isHide;
	},
	saveDetailInfo(state, value) {
		state.detailInfo = value;
	},
	saveSwiperIndex(state, index) {
		state.swiperIndex = index;
	},
	saveCartState(state, value) {
		console.log(value);
		state.isShowcartInfo = value;
	},
	SET_CURRENT_PATH_INDEX(state, index) {
		state.currentPathIndex = index;
	}
}

export default {
	state,
	mutations,
}
