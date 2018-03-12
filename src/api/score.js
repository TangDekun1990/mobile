import { fetchEndpoint } from '../server/network';

// 获取当前积分 ECMobile 4.0
export const scoreGet =
() =>
fetchEndpoint(
  '/v2/ecapi.score.get',
  'POST',
  {
  }
)

// 温超 v1.1.0 积分记录  温超五期
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

// 温超 v1.1.0 积分记录列表   温超二期
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

// 温超 v1.1.0 积分换券
export const scoreExchangeCoupon =
(id) =>
fetchEndpoint(
  '/v2/ecapi.score.exchange.coupon',
  'POST',
  {
    "id": id,  //优惠券id
  }
)

