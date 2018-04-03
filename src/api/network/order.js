import { fetchEndpoint } from '../../network/network';

// 订单详情
export const orderGet =
(order) =>
fetchEndpoint(
  '/v2/ecapi.order.get',
  'POST',
  {
    "order": order,  // 订单ID
  }
)

// 订单列表
export const orderList =
(page, per_page, status) =>
fetchEndpoint(
  '/v2/ecapi.order.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
    "status": status,  // 按订单状态筛选（可选，不填则全部）
  }
)

// 确认收货
export const orderConfirm =
(order) =>
fetchEndpoint(
  '/v2/ecapi.order.confirm',
  'POST',
  {
    "order": order,  // 订单ID
  }
)

// 获取退货原因
export const orderReasonList =
() =>
fetchEndpoint(
  '/v2/ecapi.order.reason.list',
  'POST',
  {
  }
)

// 取消订单
export const orderCancel =
(order, reason) =>
fetchEndpoint(
  '/v2/ecapi.order.cancel',
  'POST',
  {
    "order": order, 
    "reason": reason,  // 取消理由
  }
)

// 评价订单
export const orderReview =
(order, review, is_anonymous) =>
fetchEndpoint(
  '/v2/ecapi.order.review',
  'POST',
  {
    "order": order,  // 订单id
    "review": review,  // 评价信息（多个商品）
    "is_anonymous": is_anonymous,  // 1为匿名，0为未匿名
  }
)

// 订单不同状态的数量统计
export const orderSubtotal =
() =>
fetchEndpoint(
  '/v2/ecapi.order.subtotal',
  'POST',
  {
  }
)

// 订单价格计算
export const orderPrice =
(shop, order_product, consignee, shipping, coupon, cashgift, score) =>
fetchEndpoint(
  '/v2/ecapi.order.price',
  'POST',
  {
    "shop": shop,  // 店铺ID
    "order_product": order_product,  // 订单商品
    "consignee": consignee,  // 收货人ID
    "shipping": shipping,  // 快递ID
    "coupon": coupon,  // 优惠券ID
    "cashgift": cashgift,  // 红包ID
    "score": score,  // 积分
  }
)

// 订单详情  1.1.0 新增  再次购买  再次购买后，加入购物车
export const orderRebuy =
(order) =>
fetchEndpoint(
  '/v2/ecapi.order.rebuy',
  'POST',
  {
    "order": order,  // 订单ID
  }
)

// 获取收货时间列表
export const orderDeliveryTimeList =
() =>
fetchEndpoint(
  '/v2/ecapi.order.delivery.time.list',
  'POST',
  {
  }
)

