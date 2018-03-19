import { productList, search } from '../api/product'

const PER_PAGE = 100

export function getProductlist(params) {
	return productList(params)
} 

export function getSearch(params) {
	return search(params)
}