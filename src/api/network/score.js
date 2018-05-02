import { fetchEndpoint } from '../../network/network';

// 积分信息
export const scoreGet =
() =>
fetchEndpoint(
  '/v2/ecapi.score.get',
  'POST',
  {
  }
)

// 积分记录
export const scoreExchangeCouponRecordList =
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
export const scoreExchangeCouponList =
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
export const scoreExchangeCoupon =
(id) =>
fetchEndpoint(
  '/v2/ecapi.score.exchange.coupon',
  'POST',
  {
    "id": id,  // 券id    
  }
)
