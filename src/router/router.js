import App from '../App'

/* login */
const login = r => require.ensure([], ()=> r( require('../page/login/login')), 'login')

/*home*/
const home = r => require.ensure([], () => r( require('../page/home/home')), 'home');

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
				redirect: '/home'
			},
			{
				path: '/home',
				component: home
			},
			{
				path: '/login',
				component: login
			}
		]
	}
]