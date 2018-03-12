import { fetchEndpoint } from '../server/network';

// 第三方授权
export const authSocial =
(vendor, access_token, open_id) =>
fetchEndpoint(
  '/v2/ecapi.auth.social',
  'POST',
  {
    "vendor": vendor,  // 第三方平台类型
    "access_token": access_token,  // OAUTH TOKEN
    "open_id": open_id,  // 用户ID
  }
)

