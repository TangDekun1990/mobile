import { fetchEndpoint } from '../server/network';

// 公告列表
export const noticeList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.notice.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

