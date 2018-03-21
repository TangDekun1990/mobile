import { fetchEndpoint } from '../../network/network'

export const getproductList = (params) => fetchEndpoint('/v2/ecapi.product.list', 'POST', params)

export const getSearch = (params) => fetchEndpoint('/v2/ecapi.search.product.list', 'POST', params)
