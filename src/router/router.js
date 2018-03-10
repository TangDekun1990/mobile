import App from '../App'

/*home*/
const home = r => require.ensure([], () => r( require('../page/home/home')), 'home');
import Category from '../page/category/Category.vue'

// const home = function (r) {
// 	return require.ensure([], function(){
// 		return r(require('../page/hello/hello.vue'))
// 	}, 'home')
// }

export default [
	{
		path: '/',
		component: App,
		children: [
			{
				path: '',
				redirect: '/category'
			},
			{
				path: '/home',
				component: home
			},
			{
				path: '/category',
				component: Category
			}
		]
	}
]