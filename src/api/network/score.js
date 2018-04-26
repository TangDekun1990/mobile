import { fetchEndpoint } from '../../network/network';

// 积分信息
export const scoreInfo =
() =>
fetchEndpoint(
  '/v2/ecapi.score.get',
  'POST',
  {
  }
)

// 积分记录
export const scoreRecord =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.score.exchange.coupon.record.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 积分记录
export const scoreExchageList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.score.exchange.coupon.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 积分兑换
export const scoreExchage =
(id) =>
fetchEndpoint(
  '/v2/ecapi.score.exchange.coupon',
  'POST',
  {
    "id": id,  // 券id    
  }
)
