import { fetchEndpoint } from '../../network/network';

// 优惠列表
export const couponList =
(page, per_page, status) =>
fetchEndpoint(
  '/v2/ecapi.coupon.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
    "status": status,  // 按优惠券状态筛选
  }
)

// 搜索可用优惠列表
export const couponAvailable =
(page, per_page, shop, total_price) =>
fetchEndpoint(
  '/v2/ecapi.coupon.available',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
    "shop": shop,  // 店铺ID
    "total_price": total_price,  // 总价
  }
)

