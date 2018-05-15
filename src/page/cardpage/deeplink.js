import { ENUM } from '../../config/enum'
import store from "../../store/index";
export const openLink = (router, link) => {
  if (link && link.length) {
    // {Scheme}://{Action}/{Target}/{Method}/{Param}?{Key}={Value}
    // deeplink://goto/index
    console.log('====================================');
    console.log('link is ', link)        
    let items = link.split('://')
    let schema = items[0]
    
    let params = null
    let showAuth = false
    if (schema === 'http' || schema === 'https') {
      // TODO:
      if (link.indexOf('/cardpage/') >= 0) {
        let parts = link.split('/cardpage/')
        let action = parts[1]
        params = { name: 'cardpage', params: { name: action } }								
      } else {        
        params = { name: 'webPage', query: { 'url': link } }
      }      
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
      console.log('(path, where, action, query)', path, where, action, query);
      console.log('====================================');
      let queryParams = new Object()
      if (query && query.length) {
        let queryParts = query.split('&')
        for (let i = 0; i < queryParts.length; i++) {
          const element = queryParts[i];
          let valueParts = element.split('=')
          let key = valueParts[0]
          let value = decodeURIComponent(valueParts[1])          
          queryParams[key] = value
        }
      }
              
      if (path === 'goto') {
        if (where === 'index') {
          // 商城首页
          params = { name: 'home' }
        } else if (where === 'cart') {
          // 我的购物车							
          params = { name: 'cart', params: { type: 0 } }
        } else if (where === 'search') {
          // 搜索界面
          params = { name: 'search', params: { isFromHome: true } }
        } else if (where === 'category') {          
          if (action === 'all') {
            // 分类列表
            params = { name: 'category', params: { isFromHome: true } }
          } else {
            // 分类详情(商品列表)             
            params = { name: 'product', query: { category: action, isFromHome: true } }
          }
        } else if (where === 'notice/all') {
          if (aciton === 'all') {
            // 公告列表
            params = { name: 'News' }
          }
        } else if (where === 'promotions') {
          // 组合促销列表 
          params = { name: 'promotions', query: { id: action } }								
        } else if (where === 'product') {
          if (action === 'all') {
            // 商品列表 
            params = { name: 'product', params: { isFromHome: true } }
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
          // 个人资料（需要登录）
          showAuth = true
          params = { name: 'profileInfo' }
        } else if (where === 'address') {
          if (action === 'all') {
            // 收货地址列表	（需要登录）
            showAuth = true
            params = { name: 'addressManage' }
          } else if (action === 'new') {
            // 新建收货地址（需要登录）
            showAuth = true
            params = { name: 'addressEdit', params: { mode: 'add', item: null } }
          } else {
            // 编辑收货地址（需要登录）// TODO: address item
            showAuth = true
            params = { name: 'addressEdit', params: { mode: 'edit', item: action } }
          }          
        } else if (where === 'order') {
          showAuth = true
          if (action === 'all') {
            // 全部订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.ALL, isFromHome: true } }
          } else if (action === 'created') {
            // 待付款订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.CREATED, isFromHome: true } }
          } else if (action === 'paid') {
            // 待发货订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.PAID, isFromHome: true } }
          } else if (action === 'delivering') {
            // 发货中订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.DELIVERING, isFromHome: true } }
          } else if (action === 'delivered') {
            // 待评价订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.DELIVERIED, isFromHome: true } }
          } else if (action === 'finished') {
            // 已完成订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.ALL, isFromHome: true } }
          } else if (action === 'cancelled') {
            // 已取消订单（需要登录）
            params = { name: 'order', params: { order: ENUM.ORDER_STATUS.ALL, isFromHome: true } }
          } else {
            // 订单详情（需要登录）
            params = { name: 'orderDetail', params: { orderDetail: action } }
          }
        } else if (where === 'favorite') {
          if (action === 'product') {
            // 我的商品收藏（需要登录）
            showAuth = true
            params = { name: 'collection' }
          }          
        } else if (where === 'message') {
          // 消息列表（需要登录）
          debugger
          if (action === 'all') {
            showAuth = true  
            params = { name: 'newsNoticeMessage' }
          } else {
            // 无法打开页面
          }         
        } else if (where === 'orderMessage') {
          if (action === 'all') {
            // 订单消息列表（需要登录）
            showAuth = true
            params = { name: 'NewsOrderMessage' }
          } else {
            // 无法打开页面
          }          
        } else if (where === 'coupon') {
          showAuth = true
          if (action === 'available') {
            // 未使用优惠券列表（需要登录）
            params = { name: 'couponList', params: { index: 0 } }
          } else if (action === 'expired') {
            // 已过期优惠券列表（需要登录）
            params = { name: 'couponList', params: { index: 1 } }
          } else if (action === 'used') {
            // 已使用优惠券列表（需要登录）
            params = { name: 'couponList', params: { index: 2 } }
          }          
        } else if (where === 'shipping') {          
          // 物流详情页面（需要登录）
          showAuth = true
          params = { name: 'orderTrack', params: { orderTrack: id } }
        } else if (where === 'article') {
          // 文章列表页面（需要登录）
          showAuth = true
          params = { name: 'Help' }
        } else if (where === 'invoice') {
          // 发票页面（需要登录）
          showAuth = true
          params = { name: 'invoice', params: { title: '' } }
        }
      } else if (path === 'search') {
        if (where === 'product') {
          let k = queryParams['k']
          params = { name: 'product', query: { 'keywords': k } }
        }
      } else if (path === 'preview') {
        if (where === 'site') {
          // 预览站点（踢回首页，退出登陆）// TODO:
        } else if (where === 'theme') {
          // 预览主题（踢回首页，刷新界面）// TODO:
        } else if (where === 'page') {
          // 预览页面 // TODO:
          let name = queryParams['name']
          params = { name: 'cardpage', params: { name: name } }								
        }
      }                 
    }
    if (store.getters.isOnline) {
      if (params) {
        router.push(params)
      }
    } else {
      if (showAuth) {
        router.push({ name: 'signin' })
      } else {
        router.push(params)
      }
    }
  }
}