import { fetchEndpoint } from '../../network/network';

// 登录
export const authSignin =
(username, password) =>
fetchEndpoint(
  '/v2/ecapi.auth.signin',
  'POST',
  {
    "username": username,  // 用户名/手机号/email
    "password": password,  // 密码
  }
)

