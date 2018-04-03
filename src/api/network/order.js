import { fetchEndpoint } from '../../network/network'
// 订单价格计算
export const orderPrice = (params) => fetchEndpoint('/v2/ecapi.order.price', 'POST', params);
