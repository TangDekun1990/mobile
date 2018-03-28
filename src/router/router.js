import App from '../App'

/*home */
const home = r => require.ensure([], () => r( require('../page/home/Home')), 'home');

/* 分类 */
const category = r => require.ensure([], () => r( require('../page/category/Category')), 'category');

/* 商品列表 */
const product = r => require.ensure([], () => r( require('../page/product/product')), 'product');

/* 搜索 */
const search = r => require.ensure([], () => r(require( '../page/search/search')), 'search');

/* 商品详情 */
const detail = r => require.ensure([], () => r(require( '../page/detail/Goods')), 'goods');

/* 商品详情 */
const demo = r => require.ensure([], () => r(require( '../page/product-detail/index')), 'demo');

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
		component: home
	},
	{
		name: 'category',
		path: '/category',
		component: category
	},
	{
		name: 'product',
		path: '/product/:category?/:brand?/:shop?/:keywords?',
		component: product
	},
	{
		name: 'search',
		path: '/search',
		component: search
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
		name: 'detail',
		path: '/detial/:id?',
		component: detail
	},
	{
		name: 'demo',
		path: '/demo/:id?',
		component: demo
	}
	]
}
]
