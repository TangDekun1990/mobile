import * as api from '../../api/network/consignee'
// initial state
const state = {
  defaultItem: null, // 默认收货地址
  selectedItem: null, // 选中的收货地址
  items: [],
}

// getters
const getters = {
  // TODO:
}

// 依据id获取item
const getItemById = (items, id) => {
  let item = null
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (id === element.id) {
      item = element
    }
  }
  return item
}

// 遍历获取默认item
const getDefaultItem = (items) => {
  let item = null
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element.is_default) {
      item = element
      break
    }
  }
  return item
}

// 依据item id获取索引
const getIndexById = (items, id) => {
  let index = -1
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (id === element.id) {
      index = i
    }
  }
  return index
}

// mutations
const mutations = {
  setDefault(state, item) {
    const { defaultItem } = state
    if (defaultItem) {
      if (defaultItem.id !== item.id) {
        state.defaultItem = item
      } 
    } else {
      if (item) {
        state.defaultItem = item
      } 
    }     
  },
  selectItem(state, item) {
    const { selectedItem } = state
    if (selectedItem) {
      if (selectedItem.id !== item.id) {
        state.selectedItem = item
      }
    } else {
      if (item) {
        state.selectedItem = item
      }
    }    
  },
  traverseItems(state) {
    const { items } = state
    let defaultItem = getDefaultItem(items)  
    if (defaultItem) {
      this.commit('setDefault', defaultItem) 
    }     
  },
  addItem(state, item) {  
    state.items.push(item)
    this.commit('traverseItems')
  },
  removeItem(state, id) {
    const { items } = state
    let index = getIndexById(items, id)
    state.items.splice(index, 1)
    this.commit('traverseItems')
  },
  modifyItem(state, item) {
    const { items } = state
    let index = getIndexById(items, item.id)
    state.items.splice(index, 1, item)
    this.commit('traverseItems')
  },
  saveItems(state, items) {
    state.items = items    
    this.commit('traverseItems')
  },  
}

// actions
// const actions = {
//   fetchItems({ commit, state }) {
//   return api.consigneeList().then(
//       (response) => {
//         const { consignees } = response
//         commit('saveItems', consignees)
//       }, (error) => {
//         // TODO:
//       })
//   },
//   addItem({ commit, state }, {name, mobile, tel, zip_code, region, address}) {
//     return api.consigneeAdd(name, mobile, tel, zip_code, region, address).then(
//       (response) => {
//         const { consignee } = response
//         commit('addItem', consignee)
//       }, (error) => {
//         // TODO:
//       })
//   },
//   modifyItem({ commit, state }, id, name, mobile, tel, zip_code, region, address) {
//     return api.consigneeUpdate(id, name, mobile, tel, zip_code, region, address).then(
//       (response) => {
//         const { consignee } = response
//         commit('modifyItem', consignee)
//       }, (error) => {
//         // TODO:
//       })
//   },
//   removeItem({ commit, state }, id) {
//     return api.consigneeDelete(id).then(
//       (response) => {
//         commit('removeItem', id)
//       }, (error) => {
//         // TODO:
//       })
//   },
//   setDefaultItem({ commit, state }, id) {
//     return api.consigneeSetdefault(id).then(
//       (response) => {
//         const { items } = state
//         let item = getItemById(items, id)
//         commit('setDefault', item)
//       }, (error) => {
//         // TODO:
//       })
//   }
// }

export default {
  state,
  getters,
  mutations,
  // actions
}