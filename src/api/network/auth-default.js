import { fetchEndpoint } from '../../network/network';

// 邮箱注册
export const authDefaultSignup =
(username, email, password) =>
fetchEndpoint(
  '/v2/ecapi.auth.default.signup',
  'POST',
  {
    "username": username,  // 用户名
    "email": email,  // 邮箱
    "password": password,  // 密码
  }
)

// 通过邮件找回用户密码
export const authDefaultReset =
(email) =>
fetchEndpoint(
  '/v2/ecapi.auth.default.reset',
  'POST',
  {
    "email": email,  // 邮箱
  }
)

