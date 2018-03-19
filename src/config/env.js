let apiBaseUrl = '';
let photoBaseUrl = '';

if (process.env.NODE_ENV === 'development') {
  	apiBaseUrl = 'http://api.wenchao.dev.geek-zoo.cn';
  	// apiBaseUrl = 'http://api.wenchao.pre.geek-zoo.cn/';
} else if (process.env.NODE_ENV === 'production') {
  	apiBaseUrl = 'http://api.wenchao.ae';
} 

// API域名
export const BASE_URL = '';
// 签名密钥
const SIGN_KEY = 'q781cXa9Z8hp0Z7aJL8ssG5oiP1R9nA7';
// 加密密钥
const ENCRYPT_KEY = 'aV2woc00FmtOi8HCLsbPMQD0iih0vQ3h';

export {
  apiBaseUrl,
  photoBaseUrl,
  SIGN_KEY,
  ENCRYPT_KEY,
}

