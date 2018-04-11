import { fetchEndpoint } from '../../network/network'

// export const getKeywords = () => fetchEndpoint('/v2/ecapi.search.keyword.list', 'POST')

// import { fetchEndpoint } from '../server/network';

// 热门关键词
export const searchKeywordList =
() =>
fetchEndpoint(
  '/v2/ecapi.search.keyword.list',
  'POST',
  {
  }
)

// 店铺搜索
export const searchShopList =
(keyword, sort_key, sort_value, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.search.shop.list',
  'POST',
  {
    "keyword": keyword,  // 关键字
    "sort_key": sort_key,  // 键
    "sort_value": sort_value,  // 值
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 商品搜索
export const searchProductList =
(brand, category, shop, keyword, sort_key, sort_value, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.search.product.list',
  'POST',
  {
    "brand": brand,  // 所属品牌id (选填)
    "category": category,  // 所属分类id (选填)
    "shop": shop,  // 店铺id (选填)
    "keyword": keyword,  // 关键字 (选填)
    "sort_key": sort_key,  // 键
    "sort_value": sort_value,  // 值
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

