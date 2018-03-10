//  定义路由模式
const routerMode = 'hash'

// 定义接口地址
var baseUrl = ''
if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://v2.api.ecnative.cn';
} else if (process.env.NODE_ENV == 'production'){
	baseUrl = 'http://v2.api.ecnative.cn';
}

const url = baseUrl

exports.envConst = {
	'routerMode': routerMode,
	'baseUrl': baseUrl,
}
