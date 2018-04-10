import { fetchEndpoint } from '../../network/network'

export const orderList = (page, per_page, status) => fetchEndpoint('/v2/ecapi.order.list', 'POST', {
  'page': page,
  'per_page': per_page,
  'status': status
})
export const orderGet = (params) => fetchEndpoint('/v2/ecapi.order.get', 'POST', params)
