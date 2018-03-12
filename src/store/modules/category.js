import { fetchEndpoint } from '../../server/network'

// initial state
const state = {
  all: [],
}

// getters
const getters = {
  allItems: state => state.all
}

// actions
const actions = {

}

// mutations
const mutations = {
  setItems (state, items) {
    state.all = items
  }
}

const category = {
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
}