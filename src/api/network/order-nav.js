import { fetchEndpoint } from '../../network/network'

export const orderList = (page, per_page, status) => fetchEndpoint('/v2/ecapi.order.list', 'POST', {
  'page': page,
  'per_page': per_page,
  'status': status
})
export const orderGet = (params) => fetchEndpoint('/v2/ecapi.order.get', 'POST', params)

// 取消订单
export const orderCancel = (order, reason) => fetchEndpoint('/v2/ecapi.order.cancel', 'POST', {
  'order': order,
  'reason': reason
})
