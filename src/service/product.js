import { productList } from '../api/product'

const PER_PAGE = 100

export function getProductList(params) {
	return productList(params)
} 