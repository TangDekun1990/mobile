// initial state
const initState = {
	isShowProductModel: false,  // 筛选时商品列表是否出现浮层
	isSearch: false //判断是否调用搜索接口
};

const state = {
	...initState,
	initState(){
        return initState
    }
}

// mutations
const mutations = {
	// 切换筛选时商品列表是否出现浮层
	changeIsShowProductModel(state, value) {
		state.isShowProductModel = value;
	},
	changeSearch(state, value) {
		state.isSearch = value;
	}
}

export default {
	state,
	mutations,
}
