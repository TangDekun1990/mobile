import { fetchEndpoint } from '../server/network';

// 网页第三方授权    app无用
export const authWeb =
(vendor, referer) =>
fetchEndpoint(
  '/v2/ecapi.auth.web',
  'GET',
  {
    "vendor": vendor,  // 第三方平台类型
    "referer": referer,  // 授权成功后跳转页面 (URL ENCODE)
  }
)

