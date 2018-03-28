import App from '../App'

// home
import Home from '../page/home/Home'

// category
import Category from '../page/category/Category'

// product
import Product from '../page/product/Product'

// search
import Search from '../page/search/Search'

/* 商品详情 */
const detail = r => require.ensure([], () => r(require( '../page/detail/Goods')), 'goods');

/* 商品详情 */
const demo = r => require.ensure([], () => r(require( '../page/product-detail/index')), 'demo');


// auth
import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'

// profile
import Profile from '../page/profile/Profile'
import ProfileInfo from '../page/profile/ProfileInfo'
import Setting from '../page/profile/Setting'

// address
import AddressList from '../page/address/AddressList'
import AddressManage from '../page/address/AddressManage'

// coupon
import CouponList from '../page/coupon/CouponList'
import CouponUsable from '../page/coupon/CouponUsable'

// checkout
import Checkout from '../page/checkout/Checkout'
import GoodsList from '../page/checkout/GoodsList'
import Shipping from '../page/checkout/Shipping'
import Invoice from '../page/checkout/Invoice'

// 商品详情
import commodity from '../page/product-detail/child/commodity';
import aspect from '../page/product-detail/child/aspect';
import review from '../page/product-detail/child/Evaluation';

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
				component: AddressManage
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
				name: 'detail',
				path: '/detial/:id?',
				component: detail
			},
			{
				name: 'demo',
				path: '/demo/:id?',
				component: demo
			},
			{
				name: 'commodity',
				path: '/commodity',
				component: commodity
			},
			{
				name: 'aspect',
				path: '/aspect',
				component: aspect
			},
			{
				name: 'review',
				path: '/review',
				component: review
			}
		]
	}
]
