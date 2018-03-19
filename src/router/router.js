import App from '../App'

/*home */
const home = r => require.ensure([], () => r( require('../page/home/home')), 'home');

/* 分类 */
const category = r => require.ensure([], () => r( require('../page/category/Category')), 'category');

/* 商品列表 */
const product = r => require.ensure([], () => r( require('../page/product/product')), 'product');

/* 搜索 */
const search = r => require.ensure([], () => r(require( '../page/search/search')), 'search');

// const home = function (r) {
// 	return require.ensure([], function(){
// 		return r(require('../page/hello/hello.vue'))
// 	}, 'home')
// }
import Signin from '../page/auth/Signin'
import Signup from '../page/auth/Signup'

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
				path: '/category',
				component: category
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
				name: 'product',
				path: '/product/:category/:brand/:shop/:keywords',
				component: product
			},
			{
				name: 'search',
				path: '/search',
				component: search
			}
		]
	}
]