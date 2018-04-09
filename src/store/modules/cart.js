// initial state
const state = {
	isSelectedAll: true, //是否
	isShowHeader: false,
	total_amount: 0, //总量
	total_price: 0, // 总价
	saveCartList: [] //保存购物车数据
}

// mutations
const mutations = {
	// 购物车头部点击编辑时列表全选
	changedSelectedAll(state, value) {
		state.isSelectedAll = value;
	},
	changedIsShowHeader(state, value) {
		state.isShowHeader = value;
	},
	//计算购物车总量和总价
	calculationAmount(state, amount) {
		state.total_amount = amount;
	},
	calculationPrice(state, price) {
		state.total_price = price;
	},
	// 保存购物车数据
	saveCartData(state, value) {
		state.saveCartList = value;
	}
}

export default {
	state,
	mutations,
}
