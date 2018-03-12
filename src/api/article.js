import { fetchEndpoint } from '../server/network';

// 文章列表
export const articleList =
(id, page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.article.list',
  'POST',
  {
    "id": id,  // 文章ID
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

