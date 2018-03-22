import App from '../App'

import Home from '../page/home/Home'
import Category from '../page/category/Category'
import Product from '../page/product/Product'
import Search from '../page/search/Search'

import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'

import Profile from '../page/profile/Profile'
import ProfileInfo from '../page/profile/ProfileInfo'
import Setting from '../page/profile/Setting'

import AddressList from '../page/address/AddressList'
import AddressManage from '../page/address/AddressManage'

import CouponList from '../page/coupon/CouponList'
import CouponUsable from '../page/coupon/CouponUsable'

import Checkout from '../page/checkout/Checkout'
import GoodsList from '../page/checkout/GoodsList'

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
		]
	}
]
