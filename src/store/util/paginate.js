
// 依据id获取item
export const getItemById = (items, id) => {
  let item = null
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (id === element.id) {
      item = element
    }
  }
  return item
}

// 依据item id获取索引
export const getIndexById = (items, id) => {
  let index = -1
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (id === element.id) {
      index = i
    }
  }
  return index
}