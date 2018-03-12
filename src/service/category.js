import { categoryList } from '../api/category'

const PER_PAGE = 100

export function loadItems(shop, category) {
  return categoryList(shop, category, 1, PER_PAGE)
} 