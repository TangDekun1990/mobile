// initial state
const state = {
	isHideCart: false,  // 点击看大图隐藏脚部
	isHideHeader: false, // 点击看大图隐藏头部
	detailInfo: {},    //保存商品详情
	isShowcartInfo: false,  //是否显示购物车浮层
	currentSwiperIndex: 0, //当前滑动的id
	isHideCommodity: false, //点击查看大图，隐藏商品展示
	number: 0
}

// mutations
const mutations = {
	// 商品轮播 点击看大图， 是否展示头部和脚部
	changeStatus(state, isHide) {
		state.isHideHeader = isHide;
		state.isHideCart = isHide;
	},
	// 保存商品详情， 各个组件数据共享
	saveDetailInfo(state, value) {
		state.detailInfo = value;
	},
	// 根据点击时是否显示购物车浮层
	saveCartState(state, value) {
		state.isShowcartInfo = value;
	},
	//滑动时记录当前的滑动id，并切换相应的tab
	setCurrentSwiperIndex(state, index) {
		state.currentSwiperIndex = index;
	},
	// 点击查看大图，根据isHideCommodity，添加商品列表页样式
	setIsHideCommodity(state, value) {
		state.isHideCommodity = value;
	},
	saveNumber(state, number) {
		state.number = number;
	}
}

export default {
	state,
	mutations,
}
