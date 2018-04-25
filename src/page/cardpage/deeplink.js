export const openLink = (router, link) => {
  if (link && link.length) {
    // {Scheme}://{Action}/{Target}/{Method}/{Param}?{Key}={Value}
    // deeplink://goto/index
    let items = link.split('://')
    let schema = items[0]
    if (schema === 'http' || schema === 'https') {

    } else if (schema === 'deeplink') {
      let prefix = schema + '://'
      let suffix = link.replace(prefix, '')
      let parts = suffix.split('?')
      let route = parts[0]
      let query = null
      if (parts.length > 1) {
        query = parts[1]
      }

      let routeParams = route.split('/')
      let path = routeParams[0]
      let where = routeParams.length > 1 ? routeParams[1] : null
      let action = routeParams.length > 2 ? routeParams[2] : null
      console.log('====================================');
      console.log('link is ', link)
      console.log('(path, where, action, query)', path, where, action, query);
      console.log('====================================');
      let params = null
      if (path === 'goto') {
        if (where === 'index') {
          // 商城首页
          params = { name: 'home' }
        } else if (where === 'cart') {
          // 我的购物车							
          params = { name: 'cart', params: { type: 1 } }
        } else if (where === 'search') {
          // 搜索界面
          params = { name: 'search' }
        } else if (where === 'category') {
          if (action === 'all') {
            // 分类列表
            params = { name: 'category' }
          } else {
            // 分类详情(商品列表) 
            params = { name: 'product', params: { category: action, isFromHome: true } }
          }
        } else if (where === 'notice/all') {
          if (aciton === 'all') {
            // 公告列表
            params = { name: 'News' }
          }
        } else if (where === 'promotions') {
          // 组合促销列表 // TODO:								
        } else if (where === 'product') {
          if (action === 'all') {
            // 商品列表 // TODO:
          } else {
            // 商品详情
            params = { name: 'detail', params: { id: action } }
          }
        } else if (where === 'notice/scanner') {
          // 二维码界面 // TODO:								
        } else if (where === 'home') {
          // 个人中心
          params = { name: 'profile' }
        } else if (where === 'setting') {
          // 系统设置
          params = { name: 'setting' }
        } else if (where === 'cardpage') {
          // 卡片页详情 
          params = { name: 'cardpage', params: { name: action } }								
        } else if (where === 'profile') {
          // 个人资料
          params = { name: 'profileInfo' }
        } else if (where === 'address') {
          if (action === 'all') {
            // 收货地址列表	
            params = { name: 'addressList' }
          } else if (action === 'new') {
            // 新建收货地址（需要登录）
            params = { name: 'addressEdit', params: { mode: 'add', item: null } }
          } else {
            // 编辑收货地址（需要登录）// TODO: address item
            params = { name: 'addressEdit', params: { mode: 'edit', item: action } }
          }          
        } else if (where === 'order') {
          if (action === 'all') {
            // 全部订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.ALL } }
          } else if (action === 'created') {
            // 待付款订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.CREATED } }
          } else if (action === 'paid') {
            // 待发货订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.PAID } }
          } else if (action === 'delivering') {
            // 发货中订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.DELIVERING } }
          } else if (action === 'delivered') {
            // 待评价订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.DELIVERIED } }
          } else if (action === 'finished') {
            // 已完成订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.ALL } }
          } else if (action === 'cancelled') {
            // 已取消订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.ALL } }
          } else {
            // 订单详情（需要登录）
            params = { name: 'orderDetail', params: { orderDetail: action } }
          }
        } else if (where === 'favorite') {
          if (action === 'product') {
            // 我的商品收藏（需要登录）
          }          
        } else if (where === 'message') {
          if (action === 'all') {
            // 消息列表（需要登录）
          }          
        } else if (where === 'orderMessage/all') {
          if (action === 'all') {
            // 订单消息列表（需要登录）
          }           
        } else if (where === 'coupon') {
          if (action === 'available') {
            // 未使用优惠券列表（需要登录）
          } else if (action === 'expired') {
            // 已过期优惠券列表（需要登录）
          } else if (action === 'used') {
            // 已使用优惠券列表（需要登录）
          }          
        } else if (where === 'shipping') {          
          // 物流详情页面（需要登录）
        } else if (where === 'article') {
          // 文章列表页面（需要登录）
        } else if (where === 'invoice') {
          // 发票页面（需要登录）
        }
      } else if (path === 'search') {

      } else if (path === 'preview') {

      }
      if (params) {        
        router.push(params)
      }
    }
  }
}