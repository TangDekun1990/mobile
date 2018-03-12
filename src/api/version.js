import { fetchEndpoint } from '../server/network';

// 检查版本更新
export const versionCheck =
() =>
fetchEndpoint(
  '/v2/ecapi.version.check',
  'POST',
  {
  }
)

