import { fetchEndpoint } from '../server/network';

// 获取网关地址
export const accessDns =
() =>
fetchEndpoint(
  '/v2/ecapi.access.dns',
  'POST',
  {
  }
)

// 批量调用接口
export const accessBatch =
(batch) =>
fetchEndpoint(
  '/v2/ecapi.access.batch',
  'POST',
  {
    "batch": batch, 
  }
)

