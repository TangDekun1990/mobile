import App from '../App'

import Home from '../page/home/Home'
import Category from '../page/category/Category'
import Product from '../page/product/Product'
import Search from '../page/search/Search'
import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'
import Profile from '../page/profile/Profile'
import Setting from '../page/profile/Setting'
import ProfileInfo from '../page/profile/ProfileInfo'

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
			}
		]
	}
]
