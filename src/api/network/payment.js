import { fetchEndpoint } from '../../network/network';

// 订单支付
export const paymentPay =
(order, code) =>
fetchEndpoint(
  '/v2/ecapi.payment.pay',
  'POST',
  {
    "order": order,  // 订单ID
    "code": code,  // 支付code  ehking 易汇金 pay.alipay 支付宝支付    pay.weixin微信支付  pay.unionpay 银联支付   pay.code 货到付款 pay.teegon  天工
  }
)

// 支付方式列表
export const paymentTypesList =
() =>
fetchEndpoint(
  '/v2/ecapi.payment.types.list',
  'POST',
  {
  }
)

