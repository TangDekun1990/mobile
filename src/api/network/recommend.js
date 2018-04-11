import { fetchEndpoint } from '../../network/network';

// 获取商品推荐
export const recommendProductList =
(brand, category, shop, product, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.recommend.product.list',
  'POST',
  {
    "brand": brand,  // 所属品牌ID
    "category": category,  // 所属分类ID
    "shop": shop,  // 所属店铺ID (选填)
    "product": product,  // 相关商品ID
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

