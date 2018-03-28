import { fetchEndpoint } from '../../network/network';

// 收货人列表
export const consigneeList =
() =>
fetchEndpoint(
  '/v2/ecapi.consignee.list',
  'POST',
  {
  }
)

// 添加收货人
export const consigneeAdd =
(name, mobile, tel, zip_code, region, address) =>
fetchEndpoint(
  '/v2/ecapi.consignee.add',
  'POST',
  {
    "name": name,  // 姓名
    "mobile": mobile,  // 移动电话
    "tel": tel,  // 座机
    "zip_code": zip_code,  // 邮编
    "region": region,  // 区域id
    "address": address,  // 详细地址
  }
)

// 删除收货人
export const consigneeDelete =
(consignee) =>
fetchEndpoint(
  '/v2/ecapi.consignee.delete',
  'POST',
  {
    "consignee": consignee, 
  }
)

// 修改收货人
export const consigneeUpdate =
(consignee, name, mobile, tel, zip_code, region, address) =>
fetchEndpoint(
  '/v2/ecapi.consignee.update',
  'POST',
  {
    "consignee": consignee, 
    "name": name,  // 姓名
    "mobile": mobile,  // 移动电话
    "tel": tel,  // 座机
    "zip_code": zip_code,  // 邮编
    "region": region,  // 区域id
    "address": address,  // 详细地址
  }
)

// 设置默认地址 ECM4.0
export const consigneeSetdefault =
(consignee) =>
fetchEndpoint(
  '/v2/ecapi.consignee.setDefault',
  'POST',
  {
    "consignee": consignee, 
  }
)

