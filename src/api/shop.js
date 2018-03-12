import { fetchEndpoint } from '../server/network';

// 店铺详情
export const shopGet =
(shop) =>
fetchEndpoint(
  '/v2/ecapi.shop.get',
  'POST',
  {
    "shop": shop,  // 店铺id
  }
)

// 店铺列表
export const shopList =
(brand, category, keyword, sort_key, sort_value, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.shop.list',
  'POST',
  {
    "brand": brand,  // 按品牌id (选填)
    "category": category,  // 按分类id (选填)
    "keyword": keyword,  // 关键字 (选填)
    "sort_key": sort_key,  // 键
    "sort_value": sort_value,  // 值
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 关注店铺
export const shopWatch =
(shop) =>
fetchEndpoint(
  '/v2/ecapi.shop.watch',
  'POST',
  {
    "shop": shop,  // 店铺id
  }
)

// 取消关注店铺
export const shopUnwatch =
(shop) =>
fetchEndpoint(
  '/v2/ecapi.shop.unwatch',
  'POST',
  {
    "shop": shop,  // 店铺id
  }
)

// 已收藏的店铺
export const shopWatchingList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.shop.watching.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

