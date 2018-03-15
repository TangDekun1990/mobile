import { fetchEndpoint } from '../server/network'

export const productList = (params) => fetchEndpoint('/v2/ecapi.product.list', 'POST', params)