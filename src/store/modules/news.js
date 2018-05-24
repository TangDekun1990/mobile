// news.js
const state = {
  orderNews: {},
  noticeNews: {},
  status: {'isShowOrder': false, 'isShowNotice': false},
  orderCount: 0,
  noticeCount: 0
}

// mutations
const mutations = {
  saveOrderNews(state, value) {
    state.orderNews = value
  },
  saveNoticeNews(state, value) {
    state.noticeNews = value
  },
  changestatus(state, value) {
  	if (value) {
  		state.status.isShowOrder = value.isShowOrder;
  		state.status.isShowNotice = value.isShowNotice;
  	}
  	},

  	setOrderCount(state, value) {
  		state.orderCount = value
  	},
  	setNoticeCount(state, value) {
  		state.noticeCount = value
  	},
}

export default {
  state,
  mutations
}
