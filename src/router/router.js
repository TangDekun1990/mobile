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

// order
import Order from '../page/order/Order'

// payment
import Payment from '../page/payment/Payment'

// ship
import Ship from '../page/ship/Ship'

// recepit
import Receipt from '../page/recepit/Recepit'

// evaluate
import Evaluate from '../page/evaluate/Evaluate'

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
				name: 'order',
				path: '/order',
				component: Order
			},
			{
				name: 'payment',
				path: '/payment',
				component: Payment
			},
			{
				name: 'ship',
				path: '/ship',
				component: Ship
			},
			{
				name: 'recepit',
				path: '/recepit',
				component: Receipt
			},
			{
				name: 'evaluate',
				path: '/evaluate',
				component: Evaluate
			}
		]
	}
]
