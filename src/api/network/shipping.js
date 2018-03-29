import { fetchEndpoint } from '../../network/network';

// 货运公司列表
export const shippingVendorList =
(shop, products, address) =>
fetchEndpoint(
  '/v2/ecapi.shipping.vendor.list',
  'POST',
  {
    "shop": shop,  // 店铺ID（可选）
    "products": products,  // 商品信息
    "address": address,  // 地址ID
  }
)

// 物流状态查询 ECM4.0
export const shippingStatusGet =
(order_id) =>
fetchEndpoint(
  '/v2/ecapi.shipping.status.get',
  'POST',
  {
    "order_id": order_id,  // 订单id
  }
)

