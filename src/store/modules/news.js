// news.js
const state = {
  orderNews: {},
  noticeNews: {},
  status: {'isShowOrder': false, 'isShowNotice': false}
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
  }
}

export default {
  state,
  mutations
}
