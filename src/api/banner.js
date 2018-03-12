import { fetchEndpoint } from '../server/network';

// 广告列表
export const bannerList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.banner.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

