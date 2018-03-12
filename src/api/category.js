import { fetchEndpoint } from '../server/network';

// 获取商品分类列表
export const categoryList =
(shop, category, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.category.list',
  'POST',
  {
    "shop": shop,  // 所属店铺id
    "category": category,  // 所属分类id
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

