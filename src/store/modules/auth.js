// initial state
const state = {
  isOnline: false,
  token: null,
  user: null,
}

// mutations 
const mutations = {
  signin(state, payload) {
    state.isOnline = true
    state.token = payload.token
    state.user = Object.assign({}, payload.user)
  },
  signout(state) {
    state.isOnline = false
    state.token = null
    state.user = null
  }
}

export default {
  state,
  mutations,
}