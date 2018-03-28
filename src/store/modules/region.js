import { regionList } from '../../api/network/region'

// initial state
const state = {
  items: [],
}

// mutations
const mutations = {
  saveItems(state, items) {
    state.items = items
  },
  clearItems(state) {
    state.item = []
  },
}

// actions
const actions = {
  fetchRegions({ commit, state }) {
    regionList().then(
      (response) => {
        if (response.regions) {
          commit('saveItems', regions)
        }
      }, (error) => {
      }
    )
  }
}

export default {
  state,
  mutations,
  actions
}
