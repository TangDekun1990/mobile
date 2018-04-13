import { fetchEndpoint } from '../../network/network'

export const getproductList = (params) => fetchEndpoint('/v2/ecapi.product.list', 'POST', params)

export const getSearch = (params) => fetchEndpoint('/v2/ecapi.search.product.list', 'POST', params)

export const getProductDetail = (product) => fetchEndpoint('/v2/ecapi.product.get', 'post', {'product': product})

export const getReviewList = (params) => fetchEndpoint('/v2/ecapi.review.product.list', 'post', params)

export const getReviewsubtotal = (product) => fetchEndpoint('/v2/ecapi.review.product.subtotal', 'post', {'product': product})

export const getRecommendProduct = (params) => fetchEndpoint('/v2/ecapi.recommend.product.list', 'post', params)


// 商品列表
export const productList =
(brand, category, shop, sort_key, sort_value, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.product.list',
  'POST',
  {
    "brand": brand,  // 所属品牌id (选填)
    "category": category,  // 所属分类id (选填)
    "shop": shop,  // 所属店铺id(选填)
    "sort_key": sort_key,  // 键
    "sort_value": sort_value,  // 值
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 组合促销商品列表   温超二期  2016-8-22
export const productActivity =
(starbuy_id, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.product.activity',
  'POST',
  {
    "starbuy_id": starbuy_id,  // 组合促销id
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 组合促销商品id列表   温超二期  2016-8-25    前端使用
export const productStarbuyList =
() =>
fetchEndpoint(
  '/v2/ecapi.product.starbuy.list',
  'POST',
  {
  }
)

// 商品配件
export const productAccessoryList =
(product, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.product.accessory.list',
  'POST',
  {
    "product": product,  // 商品id
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 商品详情
export const productGet =
(product) =>
fetchEndpoint(
  '/v2/ecapi.product.get',
  'POST',
  {
    "product": product,  // 商品id
  }
)

// 收藏商品
export const productLike =
(product) =>
fetchEndpoint(
  '/v2/ecapi.product.like',
  'POST',
  {
    "product": product,  // 店铺id
  }
)

// 取消收藏商品
export const productUnlike =
(product) =>
fetchEndpoint(
  '/v2/ecapi.product.unlike',
  'POST',
  {
    "product": product,  // 店铺id
  }
)

// 已收藏的商品
export const productLikedList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.product.liked.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 判断商品是否有效
export const productValidate =
(product) =>
fetchEndpoint(
  '/v2/ecapi.product.validate',
  'POST',
  {
    "product": product,  // 有效商品
  }
)

// 立即购买
export const productPurchase =
(shop, product, property, amount, consignee, shipping, invoice_type, invoice_title, invoice_content, coupon, cashgift, comment, score, delivery_time) =>
fetchEndpoint(
  '/v2/ecapi.product.purchase',
  'POST',
  {
    "shop": shop,  // 店铺ID
    "product": product,  // 商品ID
    "property": property,  // 用户选择的属性ID
    "amount": amount,  // 数量
    "consignee": consignee,  // 收货人ID
    "shipping": shipping,  // 快递ID
    "invoice_type": invoice_type,  // 发票类型ID，如：公司、个人
    "invoice_title": invoice_title,  // 发票抬头，如：英斯特哈博（北京）科技有限公司
    "invoice_content": invoice_content,  // 发票内容ID，如：办公用品、礼品
    "coupon": coupon,  // 优惠券ID
    "cashgift": cashgift,  // 红包ID
    "comment": comment,  // 留言
    "score": score,  // 积分
    "delivery_time": delivery_time,  //送货时间
  }
)

