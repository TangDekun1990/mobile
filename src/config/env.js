let apiBaseUrl = '';
let photoBaseUrl = '';

if (process.env.NODE_ENV === 'development') {
	// apiBaseUrl = 'http://api.wenchao.dev.geek-zoo.cn';
  	apiBaseUrl = 'http://api.wenchao.pre.geek-zoo.cn';
} else if (process.env.NODE_ENV === 'production') {
	apiBaseUrl = 'http://api.wenchao.dev.geek-zoo.cn';
	// apiBaseUrl = 'http://api.wenchao.ae';
}

// 版本号
const VERSION = '1.0.0';

// 签名密钥
const SIGN_KEY = 'q781cXa9Z8hp0Z7aJL8ssG5oiP1R9nA7';

// 加密密钥
const ENCRYPT_KEY = 'aV2woc00FmtOi8HCLsbPMQD0iih0vQ3h';

// 路由模式
const ROUTERMODE = 'hash';

export {
	apiBaseUrl,
	photoBaseUrl,
	SIGN_KEY,
	ENCRYPT_KEY,
	ROUTERMODE,
	VERSION,
}

