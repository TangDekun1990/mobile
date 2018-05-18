// news.js
const state = {
  orderNews: {},
  noticeNews: {}
}

// mutations
const mutations = {
  saveOrderNews(state, value) {
    state.orderNews = value
  },
  saveNoticeNews(state, value) {
    state.noticeNews = value
  }
}

export default {
  state,
  mutations
}
