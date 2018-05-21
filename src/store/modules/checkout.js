// initial state
const state = {
  comment: '',
}

// mutations
const mutations = {
  saveCommentInfo(state, payload) {        
    state.comment = payload.comment
  },
  clearCommentInfo(state) {
    state.comment = ''
  },
}

export default {
  state,
  mutations
}