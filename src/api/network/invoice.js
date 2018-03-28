import { fetchEndpoint } from '../../network/network';

// 获取发票类型列表
export const invoiceTypeList =
() =>
fetchEndpoint(
  '/v2/ecapi.invoice.type.list',
  'POST',
  {
  }
)

// 获取发票内容列表
export const invoiceContentList =
() =>
fetchEndpoint(
  '/v2/ecapi.invoice.content.list',
  'POST',
  {
  }
)

// 获取发票状态（是否提供发票）
export const invoiceStatusGet =
() =>
fetchEndpoint(
  '/v2/ecapi.invoice.status.get',
  'POST',
  {
  }
)

