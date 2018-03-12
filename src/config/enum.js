export const ENUM = {

  // 错误代码
  ERROR_CODE : {
      OK:  0,  //  正常
      UNKNOWN_ERROR:  10000,  //  内部错误
      TOKEN_INVALID:  10001,  //  Token 无效
      TOKEN_EXPIRED:  10002,  //  Token 过期
      SIGN_INVALID:  10003,  //  Sign 无效
      SIGN_EXPIRED:  10004,  //  Sign 过期
  },

  // 主机类型
  HOST_TYPE : {
      COMMON:  0,  //  通用
      ONLY_WLAN:  1,  //  只允许WIFI网络访问 
      ONLY_MOBILE:  2,  //  只允许移动网络访问
  },

  // 帐号类型
  AUTH_VENDOR : {
      UNKNOWN:  0,  //  未知
      WEIXIN:  1,  //  微信
      WEIBO:  2,  //  微博
      QQ:  3,  //  QQ
      TAOBAO:  4,  //  淘宝
  },

  // 帐号类型
  SOCIAL_VENDOR : {
      UNKNOWN:  0,  //  未知
      WEIXIN:  1,  //  微信
      WEIBO:  2,  //  微博
      QQ:  3,  //  QQ
  },

  // 排序键
  SORT_KEY : {
      DEFAULT:  0,  //  默认
      PRICE:  1,  //  价格从低到高
      POPULAR:  2,  //  人气
      CREDIT:  3,  //  信用
      SALE:  4,  //  销量
      DATE:  5,  //  上架时间
  },

  // 排序值
  SORT_VALUE : {
      DEFAULT:  0,  //  默认排序
      ASC:  1,  //  升序
      DESC:  2,  //  降序
  },

  // 卡片组类型
  CARDGROUP_LAYOUT : {
      A1H:  A1H,  // 通栏（高）
      A1S:  A1S,  // 通栏（矮）
      A2H:  A2H,  // 垂直二等分（高）
      A2S:  A2S,  // 垂直二等分（矮）
      A2XS:  A2XS,  //  垂直二等分（更矮）
      A2XH:  A2XH,  //  垂直二等分（更高）
      A2XXH:  A2XXH,  //  垂直二等分（更更高）
      A3XH:  A3XH,  //  垂直三等分（更高）
      A3XXH:  A3XXH,  // 垂直三等分（更更高）
      A3H:  A3H,  // 垂直三等分（高）
      A3S:  A3S,  // 垂直三等分（矮）
      A4H:  A4H,  // 垂直四等分（高）
      A4S:  A4S,  // 垂直四等分（矮）
      A5H:  A5H,  // 垂直五等分（高）
      A5S:  A5S,  // 垂直五等分（矮）
      B1L:  B1L,  // 左一右二
      B1R:  B1R,  // 左二右一（镜像）
      B2L:  B2L,  // 左一右三
      B2R:  B2R,  // 左三右一（镜像）
      B3L:  B3L,  // 左一右四
      B3R:  B3R,  // 左四右一（镜像）
      B4L:  B4L,  // 左一右一
      B4R:  B4R,  // 左一右一（镜像）
      B5L:  B5L,  // 左一右二
      B5R:  B5R,  // 左二右一（镜像）
      C1H:  C1H,  // 滚动横幅（高）
      C1S:  C1S,  // 滚动横幅（矮）
      C2:  C2,  //  宫格横幅
      C3S:  C3S,  //  公告横幅
  },

  // 卡片类型
  CARD_STYLE : {
      V1T:  V1T,  //  垂直样式1（从上到下）
      V1B:  V1B,  //  垂直样式1（从下到上）
      V2T:  V2T,  //  垂直样式2（从上到下）
      V2B:  V2B,  //  垂直样式2（从下到上）
      H1L:  H1L,  //  水平样式1（从左到右）
      H1R:  H1R,  //  水平样式1（从右到左）
      H2L:  H2L,  //  水平样式1（从左到右）
      H2R:  H2R,  //  水平样式1（从右到左）
      Z1:  Z1,  //  其他样式1
      Z2:  Z2,  //  其他样式2（大图）
      Z3:  Z3,  //  其他样式3
      V3T:  V3T,  //  垂直样式3（从上到下）
      V3B:  V3B,  //  垂直样式3（从下到上）
      V4T:  V4T,  //  垂直样式4（从上到下）
      V4B:  V4B,  //  垂直样式4（从下到上）
      V5T:  V5T,  //  垂直样式5（从上到下）有售罄图片 有购物车按钮
      V5B:  V5B,  //  垂直样式5（从下到上）有售罄图片 有购物车按钮
      V6T:  V6T,  //  垂直样式6（从上到下）有售罄图片 
      V6B:  V6B,  //  垂直样式6（从下到上）有售罄图片
      Z2L:  Z2L,  //  其他样式2L（大图）左下有价格
      Z2P:  Z2P,  //  其他样式2P（大图）图片上有文字遮罩
      Z4:  Z4,  //  其他样式1 （倒计时卡片）   温超二期   2016.8.22
  },

  // 红包状态
  CASHGIFT_STATUS : {
      AVAILABLE:  0,  //  未过期
      EXPIRED:  1,  //  过期
      USED:  2,  //  已使用
  },

  // 平台类型，ECN 1.2.3
  PLATFORM_TYPE : {
      B2C:  0,  //  单店
      B2B2C:  1,  //  多店
  },

  // 平台厂商，ECN 1.2.3
  PLATFORM_VENDOR : {
      UNKNOWN:  0,  //  未知
      ECSHOP:  1,  // 
      ECSTORE:  2,  // 
      ECMALL:  3,  // 
      MAGENTO:  4,  // 
  },

  // 优惠券状态
  COUPON_STATUS : {
      AVAILABLE:  0,  //  未过期
      EXPIRED:  1,  //  过期
      USED:  2,  //  已使用
  },

  // 积分类型
  MESSAGE_TYPE : {
      SYSTEM:  1,  //  系统
      ORDER:  2,  //  订单
  },

  // 订单状态
  ORDER_STATUS : {
      CREATED:  0,  //  待付款
      PAID:  1,  //  待发货
      DELIVERING:  2,  //  发货中
      DELIVERIED:  3,  //  已收货，待评价
      FINISHED:  4,  //  已完成
      CANCELLED:  5,  //  已取消
      DISTRIBUTION:  6,  //  配货中
      ALL:  10,  //  全部
  },

  // 订单评价
  ORDER_GRADE : {
      BAD:  1,  //  差评
      MEDIUM:  2,  //  中评
      GOOD:  3,  //  好评
  },

  // 促销状态
  PRODUCT_ACTIVITY_STATUS : {
      PREPARING:  0,  //  未开始
      ONGOING:  1,  //  已开始
      FINISHED:  2,  //  已结束
  },

  // 评价类型
  REVIEW_GRADE : {
      ALL:  0,  //  全部
      BAD:  1,  //  差评
      MEDIUM:  2,  //  中评
      GOOD:  3,  //  好评
  },

  // 积分状态
  SCORE_STATUS : {
      OPTAIN:  1,  //  收入
      DEDUCT:  2,  //  支出
  },

  // 关键词
  KEYWORD_TYPE : {
      product:  1,  //  商品
      shop:  2,  //  店铺
  },

  // 用户性别
  PROFILE_GENDER : {
      UNKNOWN:  0,  //  保密
      MALE:  1,  //  男
      FEMALE:  2,  //  女
  },

}
