import { fetchEndpoint } from '../server/network';

// 获取系统消息列表
export const messageSystemList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.message.system.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 获取订单消息列表
export const messageOrderList =
(page, per_page) =>
fetchEndpoint(
  '/v2/ecapi.message.order.list',
  'POST',
  {
    "page": page,  // 当前第几页
    "per_page": per_page,  // 每页多少
  }
)

// 获取消息未读数字
export const messageCount =
(after, type) =>
fetchEndpoint(
  '/v2/ecapi.message.count',
  'POST',
  {
    "after": after,  // 如果读取过消息列表该字段去最新消息的created_at，否则读取该用户的注册时间joined_at
    "type": type,  // 消息类型
  }
)

