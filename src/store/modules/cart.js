// initial state
const state ={
	total_amount: 0, //总量
	total_price: 0.00, // 总价
	height: 0 // TODO
}

// mutations
const mutations = {
	//计算购物车总量和总价
	calculationAmount(state, amount) {
		state.total_amount = amount;
	},
	calculationPrice(state, price) {
		state.total_price = price;
	},

	setHeight(state, value) {
		state.height = value;
	}
}

export default {
	state,
	mutations,
}
