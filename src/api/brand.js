import { fetchEndpoint } from '../server/network';

// 获取品牌列表
export const brandList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.brand.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

