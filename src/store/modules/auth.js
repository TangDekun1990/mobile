// initial state
const state = {
  isOnline: false,
  token: null,
  user: null
}

// mutations
const mutations = {
  signin(state, payload) {
    this.commit('saveUser', payload)
    this.commit('saveToken', payload)
  },
  signout(state) {
    this.commit('clearUser')
    this.commit('clearToken')
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
