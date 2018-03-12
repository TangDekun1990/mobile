import { fetchEndpoint } from '../server/network';

// 商品评价
export const reviewProductSubtotal =
(product) =>
fetchEndpoint(
  '/v2/ecapi.review.product.subtotal',
  'POST',
  {
    "product": product,  // 商品id
  }
)

// 商品评价
export const reviewProductList =
(product, grade, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.review.product.list',
  'POST',
  {
    "product": product,  // 店铺id
    "grade": grade,  // 评价种类 (选填)
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

