// news.js
const state = {
  orderNews: {},
  noticeNews: [],
  isShowOrder: false
}

// mutations
const mutations = {
  saveOrderNews(state, value) {
    state.orderNews = value
  },
  saveNoticeNews(state, value) {
    state.noticeNews = value
  },
  changeIsShowOrder(state, value) {
    state.isShowOrder = value
  }
}

export default {
  state,
  mutations
}
