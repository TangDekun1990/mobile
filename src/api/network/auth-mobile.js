import { fetchEndpoint } from '../../network/network';

// 获得手机验证码
export const authMobileSend =
(mobile) =>
fetchEndpoint(
  '/v2/ecapi.auth.mobile.send',
  'POST',
  {
    "mobile": mobile,  // 手机号码
  }
)

// 验证手机号
export const authMobileVerify =
(mobile) =>
fetchEndpoint(
  '/v2/ecapi.auth.mobile.verify',
  'POST',
  {
    "mobile": mobile,  // 手机号
  }
)

// 手机号注册
export const authMobileSignup =
(mobile, code, password) =>
fetchEndpoint(
  '/v2/ecapi.auth.mobile.signup',
  'POST',
  {
    "mobile": mobile,  // 手机号
    "code": code,  // 验证码
    "password": password,  // 密码
  }
)

// 手机号绑定        温超二期  8-29
export const authMobileBinding =
(mobile, code, password) =>
fetchEndpoint(
  '/v2/ecapi.auth.mobile.binding',
  'POST',
  {
    "mobile": mobile,  // 手机号
    "code": code,  // 验证码
    "password": password,  // 密码
  }
)

// 手机重置用户密码
export const authMobileReset =
(mobile, code, password) =>
fetchEndpoint(
  '/v2/ecapi.auth.mobile.reset',
  'POST',
  {
    "mobile": mobile,  // 手机号
    "code": code,  // 验证码
    "password": password,  // 新密码
  }
)

