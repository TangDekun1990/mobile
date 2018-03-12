//  定义路由模式
const routerMode = 'hash'

// 定义接口地址
var baseUrl = ''
if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://v2.api.ecnative.cn';
} else if (process.env.NODE_ENV == 'production'){
	baseUrl = 'http://v2.api.ecnative.cn';
}

// 定义接口请求 添加的请求头
const reqHeader = {
	"Content-type": "application/x-www-form-urlencoded"
}

const ENCRYPT_KEY = "7yaYA368XgqJc4X7"

const signKey = "8UfkRWocQr6vjgv9"

export default {
	'routerMode': routerMode,
	'baseUrl': baseUrl,
	'reqHeader': reqHeader,
	'ENCRYPT_KEY': ENCRYPT_KEY,
	'signKey': signKey
}