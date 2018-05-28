const initState = {
	isHideCart: false,
	isHideHeader: false,
	detailInfo: {},
	isShowcartInfo: false,
	currentSwiperIndex: 0,
	isHideCommodity: false,
	number: 0,
	isComment: false,
	isShowDetail: false,
	ispromotion: false,
	type: '确定',
	chooseinfo: {
		specification:[],
		ids: []
	},
	properties: [],
	index: 0,
	currentProductId: ''
}
// initial state
const state = {
	...initState,
	initState(){
        return initState
    }
	// isHideCart: false,  // 点击看大图隐藏脚部
	// isHideHeader: false, // 点击看大图隐藏头部

	// detailInfo: {},    //保存商品详情

	// isShowcartInfo: false,  //是否显示购物车浮层

	// currentSwiperIndex: 0, //当前滑动的id

	// isHideCommodity: false, //点击查看大图，隐藏商品展示

	// number: 0,

	// isComment: false,

	// isShowDetail: false,

	// ispromotion: false,
	// type: false,
	// chooseinfo: {
	// 	specification:[],
	// 	ids: []
	// }  //选择口味的信息
}

// mutations
const mutations = {

	// 保存商品详情， 各个组件数据共享
	saveDetailInfo(state, value) {
		state.detailInfo = value;
	},

	// 根据点击时是否显示购物车浮层
	saveCartState(state, value) {
		state.isShowcartInfo = value;
	},

	// 保存选择的商品的数量
	saveNumber(state, number) {
		state.number = number;
	},

	// 加入购物车，还是确定的文案设置
	changeType(state, value) {
		state.type = value;
	},

	//保存当钱切换的tab值
	changeIndex(state, value) {
		state.index = value;
	},

	// 设置当前商品的id值
	setCurrentProductId(state, value) {
		state.currentProductId = value;
	},

	// 设置当前商品的属性值
	saveChooseInfo(state, info) {
		state.chooseinfo = info;
	},

	//点击促销信息， 弹出框的位置
	changePromotion(state, data) {
		state.ispromotion = data;
	},


	//评论
	changeIsComment(state, value) {
		state.isComment = value;
	},

	changeShowDetail(state, value) {
		state.isShowDetail = value;
	},

	saveChooseInfo(state, info) {
		state.chooseinfo = info;
	},

	saveProperties(state, value) {
		state.properties = value;
	},
}

export default {
	state,
	mutations,
}
