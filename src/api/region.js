import { fetchEndpoint } from '../server/network';

// 地区列表（三级地址）
export const regionList =
() =>
fetchEndpoint(
  '/v2/ecapi.region.list',
  'POST',
  {
  }
)

