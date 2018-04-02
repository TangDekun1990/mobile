import { regionList } from '../../api/network/region'

// initial state
const state = {
  items: [],
}

// mutations
const mutations = {
  saveRegionItems(state, items) {
    state.items = items
  },
  clearRegionItems(state) {
    state.item = []
  },
}

// actions
const actions = {
  fetchRegions({ commit, state }) {
    regionList().then(
      (response) => {
        if (response.regions) {
          commit('saveRegionItems', response.regions)
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
