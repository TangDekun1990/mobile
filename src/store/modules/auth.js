// initial state
const state = {
  isOnline: false,
  token: null,
  user: null,
  isTokenInvalid: false
}

// mutations
const mutations = {
  signin(state, payload) {
    this.commit('saveUser', payload)
    this.commit('saveToken', payload)
    state.isTokenInvalid = false
  },
  signout(state) {
    this.commit('clearUser')
    this.commit('clearToken')
  },
  kickout(state) {
    this.commit('clearUser')
    this.commit('clearToken')
    state.isTokenInvalid = true
  },
  saveUser(state, payload) {
    state.user = Object.assign({}, payload.user)
  },
  saveToken(state, payload) {
    state.isOnline = true
    state.token = payload.token
  },
  clearUser(state) {
    state.user = null
  },
  clearToken(state) {
    state.isOnline = false
    state.token = null
  },
}

export default {
  state,
  mutations
}
