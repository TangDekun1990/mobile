// initial state
const state ={
	total_amount: 0, //总量
	total_price: 0.00, // 总价
	height: 0, // TODO
	cartGoods: [], // 购物车中选中的商品
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
	},
	saveSelectedCartGoods(state, payload) {		
		state.cartGoods = payload.cartGoods
	},
	clearSelectedCartGoods(state) {
		state.cartGoods = []
	},
}

export default {
	state,
	mutations,
}
