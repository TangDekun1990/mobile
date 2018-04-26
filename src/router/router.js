import App from '../App'

// home
import Home from '../page/home/Home'

// category
import Category from '../page/category/Category'

// product
import Product from '../page/product/Product'

// search
import Search from '../page/search/Search'

// auth
import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'
import Agreement from '../page/auth/Agreement'

// profile
import Profile from '../page/profile/Profile'
import ProfileInfo from '../page/profile/ProfileInfo'
import Setting from '../page/profile/Setting'
import SettingAbout from '../page/profile/child/SettingAbout'
import Help from '../page/profile/Help'
import HelpUrl from '../page/profile/child/HelpUrl'
import News from '../page/profile/News'
import NewsOrderMessage from '../page/profile/child/NewsOrderMessage'
import NewsNoticeMessage from '../page/profile/child/NewsNoticeMessage'

// address
import AddressList from '../page/address/AddressList'
import AddressManage from '../page/address/AddressManage'
import AddressEdit from '../page/address/AddressEdit'

// integral
import CouponList from '../page/coupon/CouponList'
import CouponUsable from '../page/coupon/CouponUsable'

// integral
import IntegralList from '../page/integral/IntegralList'
import IntegralRule from '../page/integral/child/IntegralRule'

// checkout
import Checkout from '../page/checkout/Checkout'
import GoodsList from '../page/checkout/GoodsList'
import Shipping from '../page/checkout/Shipping'
import Invoice from '../page/checkout/Invoice'

// payment
import Payment from '../page/payment/Payment'
import PaySucceed from '../page/payment/PaySucceed'

// order
import Order from '../page/order/Order'
import OrderDetail from '../page/order/OrderDetail'
import OrderTrack from '../page/order/child/OrderTrack'
import OrderTrade from '../page/order/child/OrderTrade'
import OrderComment from '../page/order/child/OrderComment'
import OrderSubmit from '../page/order/child/OrderSubmit'

// 商品详情
import Detail from '../page/product-detail/index'

// 购物车
import Cart from '../page/cart/cart'

// 查看推荐商品
import Recommend from '../page/recommend/Recommend'

//
import updateinfo from '../page/profile/child/Update'

export default [
	{
		path: '/',
		component: App,
		children: [
			{
				path: '',
				redirect: '/home'
			},
			{
				name: 'home',
				path: '/home',
				component: Home
			},
			{
				name: 'category',
				path: '/category',
				component: Category
			},
			{
				name: 'product',
				path: '/product/:category?/:brand?/:shop?/:keywords?/',
				component: Product,
				meta: {
					keepAlive: false
				}
			},
			{
				name: 'search',
				path: '/search',
				component: Search
			},
			{
				name: 'signin',
				path: '/signin',
				component: Signin
			},
			{
				name: 'signup',
				path: '/signup',
				component: Signup
			},
			{
				name: 'agreement',
				path: '/agreement',
				component: Agreement
			},
			{
				name: 'profile',
				path: '/profile',
				component: Profile
			},
			{
				name: 'setting',
				path: '/setting',
				component: Setting
			},
			{
				name: 'SettingAbout',
				path: '/SettingAbout',
				component: SettingAbout
			},
			{
				name: 'profileInfo',
				path: '/profileInfo',
				component: ProfileInfo
			},
			{
				name: 'Help',
				path: '/help',
				component: Help
			},
			{
				name: 'HelpUrl',
				path: '/helpUrl',
				component: HelpUrl
			},
			{
				name: 'News',
				path: '/news',
				component: News
			},
			{
				name: 'NewsOrderMessage',
				path: '/newsOrderMessage',
				component: NewsOrderMessage
			},
			{
				name: 'NewsNoticeMessage',
				path: '/newsNoticeMessage',
				component: NewsNoticeMessage
			},
			{
				name: 'addressList',
				path: '/addressList',
				component: AddressList
			},
			{
				name: 'addressManage',
				path: '/addressManage',
				component: AddressManage,
				meta: {
					keepAlive: true,
				},
			},
			{
				name: 'addressEdit',
				path: '/addressManage/addressEdit',
				component: AddressEdit,
				meta: {
					keepAlive: true,
				},
			},
			{
				name: 'couponList',
				path: '/couponList',
				component: CouponList
			},
			{
				name: 'couponUsable',
				path: '/checkout/couponUsable',
				component: CouponUsable,
				meta: {
					keepAlive: true,
				},
			},
			{
				name: 'checkout',
				path: '/checkout',
				component: Checkout,
				meta: {
					keepAlive: true,
				},
			},
			{
				name: 'payment',
				path: '/payment',
				component: Payment
			},
			{
				name: 'paySucceed',
				path: '/paySucceed',
				component: PaySucceed
			},
			{
				name: 'goodsList',
				path: '/checkout/goodsList',
				component: GoodsList
			},
			{
				name: 'shipping',
				path: '/checkout/shipping',
				component: Shipping
			},
			{
				name: 'invoice',
				path: '/checkout/invoice',
				component: Invoice
			},
			{
				name: 'order',
				path: '/order/:order?',
				component: Order
			},
			{
				name: 'orderDetail',
				path: '/orderDetail/:orderDetail?',
				component: OrderDetail
			},
			{
				name: 'orderTrack',
				path: '/orderTrack/:orderTrack?',
				component: OrderTrack
			},
			{
				name: 'orderTrade',
				path: '/orderTrade',
				component: OrderTrade
			},
			{
				name: 'orderComment',
				path: '/orderComment',
				component: OrderComment
			},
			{
				name: 'orderSubmit',
				path: '/orderSubmit',
				component: OrderSubmit
			},
			{
				name: 'detail',
				path: '/detial/:id?',
				component: Detail
			},
			{
				name: 'cart',
				path: '/cart/:type?',
				component: Cart
			},
			{
				name: 'recommend',
				path: 'recommend/:product?/:category?/:brand?/:shop?',
				component: Recommend,
				meta: {
					keepAlive: false,
				}
			},
			{
				name: 'updateinfo',
				path: '/updateinfo/:type',
				component: updateinfo
			},
			{
				name: 'integralList',
				path: '/integralList',
				component: IntegralList
			},
			{
				name: 'integralRule',
				path: '/integralRule',
				component: IntegralRule
			}
		]
	}
]
