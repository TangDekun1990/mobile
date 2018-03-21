import { fetchEndpoint } from '../server/network';

// 注册字段
export const userProfileFields =
() =>
fetchEndpoint(
  '/v2/ecapi.user.profile.fields',
  'POST',
  {
  }
)

// 获取用户资料
export const userProfileGet =
() =>
fetchEndpoint(
  '/v2/ecapi.user.profile.get',
  'POST',
  {
  }
)

// 修改用户资料
export const userProfileUpdate =
(values, gender, nickname, avatar_url) =>
fetchEndpoint(
  '/v2/ecapi.user.profile.update',
  'POST',
  {
    "values": values, 
    "gender": gender,  // 性别
    "nickname": nickname,  // 昵称
    "avatar_url": avatar_url,  // 用户头像
  }
)

// 修改用户密码
export const userPasswordUpdate =
(old_password, password) =>
fetchEndpoint(
  '/v2/ecapi.user.password.update',
  'POST',
  {
    "old_password": old_password,  // 旧密码
    "password": password,  // 新密码
  }
)

