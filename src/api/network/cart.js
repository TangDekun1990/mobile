import { fetchEndpoint } from '../../network/network'

export const addShopCart = (params) => fetchEndpoint('/v2/ecapi.cart.add', 'POST', params);

export const getCartTotal = (params) => fetchEndpoint('/v2/ecapi.cart.quantity', 'post', params);

export const getCartGroup = (params) => fetchEndpoint('/v2/ecapi.cart.get', 'POST', params);

export const deleteCart = (params) => fetchEndpoint('/v2/ecapi.cart.delete', 'POST', params);

export const updateCartQuantity = (params) => fetchEndpoint('/v2/ecapi.cart.update', 'post', params);

export const clearCart = (params) => fetchEndpoint('/v2/ecapi.cart.clear', 'post', params);

export const getCartPromos = (params) => fetchEndpoint('/v2/ecapi.cart.promos', 'post', params);

export const checkoutCart = (params) => fetchEndpoint('/v2/ecapi.cart.checkout', 'post', params);


// 获取购物车商品分组列表
export const cartGet =
() =>
fetchEndpoint(
  '/v2/ecapi.cart.get',
  'POST',
  {
  }
)

// 获取购物车商品数量   温超二期  2016-8-23
export const cartQuantity =
() =>
fetchEndpoint(
  '/v2/ecapi.cart.quantity',
  'POST',
  {
  }
)

// 添加商品到购物车
export const cartAdd =
(product, property, amount) =>
fetchEndpoint(
  '/v2/ecapi.cart.add',
  'POST',
  {
    "product": product,  // 在售商品id
    "property": property,  // 用户选择的属性ID
    "amount": amount,  // 数量
  }
)

// 从购物车删除删除
export const cartDelete =
(goods) =>
fetchEndpoint(
  '/v2/ecapi.cart.delete',
  'POST',
  {
    "good": goods,  // 购物车商品 id 数组
  }
)

// 修改购物车商品数量
export const cartUpdate =
(good, amount) =>
fetchEndpoint(
  '/v2/ecapi.cart.update',
  'POST',
  {
    "good": good,  // 购物车商品 id
    "amount": amount,  // 数量
  }
)

// 清空购物车
export const cartClear =
() =>
fetchEndpoint(
  '/v2/ecapi.cart.clear',
  'POST',
  {
  }
)

// 购物车商品促销信息
export const cartPromos =
(cart_good_id) =>
fetchEndpoint(
  '/v2/ecapi.cart.promos',
  'POST',
  {
    "cart_good_id": cart_good_id,  // 购物车商品id数组
  }
)

// 从购物车结算
export const cartCheckout =
(shop, consignee, shipping, invoice_type, invoice_content, invoice_title, coupon, cashgift, comment, score, delivery_time, cart_good_id) =>
fetchEndpoint(
  '/v2/ecapi.cart.checkout',
  'POST',
  {
    "shop": shop,  // 店铺ID
    "consignee": consignee,  // 收货人ID
    "shipping": shipping,  // 快递ID
    "invoice_type": invoice_type,  // 发票类型ID，如：公司、个人
    "invoice_content": invoice_content,  // 发票内容ID，如：办公用品、礼品
    "invoice_title": invoice_title,  // 发票抬头，如：英斯特哈博（北京）科技有限公司
    "coupon": coupon,  // 优惠券ID
    "cashgift": cashgift,  // 红包ID
    "comment": comment,  // 留言
    "score": score,  // 积分
    "delivery_time": delivery_time,  //送货时间
    "cart_good_id": cart_good_id,  // 购物车商品id数组
  }
)

