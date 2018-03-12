import { fetchEndpoint } from '../server/network';

// 区号列表
export const areacodeList =
() =>
fetchEndpoint(
  '/v2/ecapi.areacode.list',
  'POST',
  {
  }
)

