import { orderDeliveryTimeList } from '../../api/network/order'

// initial state
const state = {
  items: [],
  selectedDate: null,
  selectedTime: null,
}

// getters
const getters = {
  getTimeItems: state => {
    let selectedDate = state.selectedDate
    let items = state.items
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (selectedDate && selectedDate === element.date) {
        return element.time
      }
    }
    return null
  }
}

// mutations
const mutations = {
  saveDeliveryItems(state, items) {
    state.items = items;
  },
  clearDeliveryItems(state) {
    state.items = [];
  },
  selectDeliveryDate(state, date) {
    state.selectedDate = date
  },
  unselectDeliveryDate(state) {
    state.selectedDate = null
  },
  selectDeliveryTime(state, time) {
    state.selectedTime = time
  },
  unselectDeliveryTime(state) {
    state.selectedTime = null
  },
  unselectDelivery(state) {
    this.commit('unselectDeliveryDate')
    this.commit('unselectDeliveryTime')
  },
}

// actions
const actions = {
  fetchDeliveryList({ commit, state }) {
    orderDeliveryTimeList().then(
      (response) => {
        if (response) {
          let items = response.delivery_time_list
          if (items && items.length) {
            commit('saveDeliveryItems', items)
            let defaultItem = items[0]
            if (defaultItem) {
              const { date, time } = defaultItem
              commit('selectDeliveryDate', date)
              if (time && time.length) {
                let item = time[0]
                commit('selectDeliveryTime', item)
              }                            
            }
          }                    
        }
      }, (error) => {
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}