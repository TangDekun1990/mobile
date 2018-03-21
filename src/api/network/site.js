import { fetchEndpoint } from '../../network/network';

// 站点信息
export const siteGet =
() =>
fetchEndpoint(
  '/v2/ecapi.site.get',
  'POST',
  {
  }
)

