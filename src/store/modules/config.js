import { configGet } from '../../api/config'
import { ServerResponse } from 'http';

// initial state
const state = {
  config: null,
  feature: null,
  platform: null
}

// mutations
const mutations = {
  saveConfig(state, payload) {
    state.config = payload.config
    state.feature = payload.feature
    state.platform = payload.platform
  },
  clearConfig(state) {
    state.config = null
    state.feature = null
    state.platform = null
  },
}

// actions
const actions = {
  fetchConfig({ commit, state }) {
    configGet().then(
      (response) => {
        if (response.config && response.feature && response.platform) {
          commit('saveConfig', response)
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