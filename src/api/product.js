import { fetchEndpoint } from '../server/network'

export const productList = (params) => fetchEndpoint('/v2/ecapi.product.list', 'POST', params)

export const search = (params) => fetchEndpoint('/v2/ecapi.search.product.list', 'POST', params)