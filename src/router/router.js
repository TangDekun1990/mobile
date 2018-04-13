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

// address
import AddressList from '../page/address/AddressList'
import AddressManage from '../page/address/AddressManage'
import AddressEdit from '../page/address/AddressEdit'

// coupon
import CouponList from '../page/coupon/CouponList'
import CouponUsable from '../page/coupon/CouponUsable'

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
import Cart from '../page/cart/index'

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
				path: '/product/:category?/:brand?/:shop?/:keywords?',
				component: Product
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
				name: 'profileInfo',
				path: '/profileInfo',
				component: ProfileInfo
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
				path: '/couponUsable',
				component: CouponUsable
			},
			{
				name: 'checkout',
				path: '/checkout',
				component: Checkout
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
				path: '/goodsList',
				component: GoodsList
			},
			{
				name: 'shipping',
				path: '/shipping',
				component: Shipping
			},
			{
				name: 'invoice',
				path: '/invoice',
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
		]
	}
]
