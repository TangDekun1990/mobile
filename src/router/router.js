import App from '../App'

// home
import Home from '../page/home/Home'

// category
import Category from '../page/category/Category'

// product list
import ProductList from '../page/product-list/ProductList'

// product detail
import ProductDetail from '../page/product-detail/ProductDetail'

// 购物车
import Cart from '../page/cart/cart'

// 查看推荐商品
import Recommend from '../page/recommend/Recommend'
import With from '../page/recommend/with' // TODO: CODE REVIW (rename)

import Promotions from '../page/promotions/Promotions'

// search
import Search from '../page/search/Search'

// auth
import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'
import WebPage from '../page/auth/WebPage'

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
import Collection from '../page/profile/Collection'

// cardpage
import CardPage from '../page/cardpage/CardPage'

// address
import AddressList from '../page/address/AddressList'
import AddressManage from '../page/address/AddressManage'
import AddressEdit from '../page/address/AddressEdit'

// coupon
import CouponList from '../page/coupon/CouponList'
import CouponUsable from '../page/coupon/CouponUsable'

// score
import ScoreList from '../page/score/ScoreList'
import ScoreRule from '../page/score/child/ScoreRule'

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
				component: Home,
				meta: {
					keepAlive: true,
					isshowtabbar: true,
				},
			},
			{
				name: 'category',
				path: '/category',
				component: Category,
				meta: {
					isshowtabbar: true
				},
			},
			{
				name: 'products',
				path: '/products',
				component: ProductList,
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
				name: 'webPage',
				path: '/webPage',
				component: WebPage
			},
			{
				name: 'profile',
				path: '/profile',
				component: Profile,
				meta: {
					isshowtabbar: true
				},
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
				component: News,
				meta: {
					keepAlive: false
				}
			},
			{
				name: 'NewsOrderMessage',
				path: '/newsOrderMessage',
				component: NewsOrderMessage
			},
			{
				name: 'newsNoticeMessage',
				path: '/newsNoticeMessage',
				component: NewsNoticeMessage
			},
			{
				name: 'Collection',
				path: '/collection',
				component: Collection
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
					keepAlive: false,
				},
			},
			{
				name: 'addressEdit',
				path: '/addressManage/addressEdit',
				component: AddressEdit,
				meta: {
					keepAlive: false,
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
					keepAlive: false,
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
				name: 'cardpage',
				path: '/cardpage/:name',
				component: CardPage
			},
			{
				name: 'order',
				path: '/order/:order?',
				component: Order
			},
			{
				name: 'orderDetail',
				path: '/orderDetail/:orderDetail?',
				component: OrderDetail,
				meta: {
					keepAlive: true,
				}
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
				name: 'product',
				path: '/product/:id?/:productId?',
				component: ProductDetail
			},
			{
				name: 'cart',
				path: '/cart/:type?',
				component: Cart,
				meta: {
					isshowtabbar: true,
					setIsShowTabBar: 'type'
				},
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
				name: 'with',
				path: '/with/:product?',
				component: With
			},
			{
				name: 'updateinfo',
				path: '/updateinfo/:type',
				component: updateinfo
			},
			{
				name: 'scoreList',
				path: '/scoreList',
				component: ScoreList
			},
			{
				name: 'scoreRule',
				path: '/scoreRule',
				component: ScoreRule
			},
			{
				name: 'promotions',
				path: '/promotions',
				component: Promotions
			}
		]
	}
]
