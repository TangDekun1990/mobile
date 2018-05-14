import axios from 'axios'
import XXTEA from '../assets/js/xxtea'
import CryptoJS from 'crypto-js'

import { apiBaseUrl, SIGN_KEY, ENCRYPT_KEY, VERSION } from '../config/env'
import store from '../store/index'
import { ENUM } from '../config/enum'

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return key + '=' + filterSpecialChars(encodeURIComponent(val2));
            }).join('&');
        }
        return key + '=' + filterSpecialChars(encodeURIComponent(val));
    }).join('&') : '';
}

function filterSpecialChars(str) {
    if (str && str.length) {
        // 处理特殊字符: ! ~ * ' ( )
        str = str.replace(/\!/g, '%21')
        str = str.replace(/\~/g, '%7e')
        str = str.replace(/\*/g, '%2A')
        str = str.replace(/\'/g, '%27')
        str = str.replace(/\(/g, '%28')
        str = str.replace(/\)/g, '%29')
    }
    return str
}

function getErrorInfo(errorCode, errorMsg) {
    let error = new Object();
    error.errorCode = errorCode;
    error.errorMsg = errorMsg;
    return error;
}

function getUserAgent() {
    let userAgent = ''
    let platform = 'Browser'
    const { width, height } = window.screen
    if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isWeixin()) {
        platform = 'Weixin'
    }
    var lang = (navigator.systemLanguage ? navigator.systemLanguage : navigator.language)
    userAgent = 'Platform/' + platform + ', Device/Unknown, Lang/' + lang + ', ScreenWidth/' + width + ', ScreenHeight/' + height
    console.log('userAgent is ', userAgent)
    return userAgent
}

// 请求加密
axios.interceptors.request.use(config => {
    let isAPIRequest = config.url.indexOf(apiBaseUrl) == 0 ? true : false;
    if (isAPIRequest) {
        var params = config.data || {};
        if (params != undefined) {
            for (let key in params) {
                if (params[key] === null || params[key] === undefined) {
                    delete params[key];
                }
            }
            // post_body: 客户端HTTP请求包体，如：a=1&b=2&c=3，其中key需要升序排列
            let post_body = toQueryString(params);

            // timestamp: 客户端秒级时间戳
            let timestamp = Date.parse(new Date()) / 1000 + '';

            // sign: HMAC-SHA256( timestamp + post_body, SIGN_KEY )
            let sign = CryptoJS.HmacSHA256(timestamp + post_body, SIGN_KEY);

            // xSign格式: sign,timestamp
            let xSign = sign + ',' + timestamp;
            let token = null;
            if (store.getters.isOnline && store.getters.token) {
                token = store.getters.token;
            }

            config.headers['X-ECAPI-Authorization'] = token;
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            config.headers['X-ECAPI-Sign'] = xSign;
            // TODO:
            config.headers['X-ECAPI-UserAgent'] = 'Platform/iOS, Device/iPhone, Lang/zh-Hans-CN, ScreenWidth/375.000000, ScreenHeight/667.000000'; // TODO:
            // config.headers['X-ECAPI-UserAgent'] = this.getUserAgent()
            // config.headers['X-ECAPI-UDID'] = 'udid';
            config.headers['X-ECAPI-Ver'] = VERSION;

            let encry_post_body = '';
            let body = null;
            if (post_body && post_body.length) {
                encry_post_body = XXTEA.encryptToBase64(post_body, ENCRYPT_KEY);

                body = toQueryString({ x: encry_post_body });
                body = body.replace(/\+/g, '%2B');
            }
            config.data = {};
            config.data = body;
            // TODO:
            if (process.env.NODE_ENV === 'development') {
                config.params = params ? JSON.stringify(params) : ''
            }
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应解密
axios.interceptors.response.use(response => {
    if (response) {
        let isAPIRequest = response.config.url.indexOf(apiBaseUrl) == 0 ? true : false;
        if (isAPIRequest) {
            if (response.data && response.data.data) {
                var raw = XXTEA.decryptFromBase64(response.data.data, ENCRYPT_KEY);
                var json = JSON.parse(raw);
                if (json) {
                    delete response.data.data;
                    for (var key in json) {
                        response.data[key] = json[key];
                    }
                }
                if (process.env.NODE_ENV === 'development') {
                    console.log('====================================');
                    console.log("request url is: ", response.config.url);
                    console.log("request params is: ", response.config.params);
                    console.log('response data is: ', response.data);
                }
                return response.data;
            } else if (response.data && response) {

                let errorMessage = response.data.message;
                let errorCode = response.data.code;
                if (response.data.error) {
                    // return response.data;
                    if (process.env.NODE_ENV === 'development') {
                        console.log("request url is: ", response.config.url);
                        console.log('网络错误, 错误代码:=' + errorCode + "错误信息:=" + errorMessage);
                    }
                    if (errorCode == ENUM.ERROR_CODE.TOKEN_INVALID || errorCode == ENUM.ERROR_CODE.TOKEN_EXPIRED) {
                    	window.location.href = '#/signin';
                    }
                    return Promise.reject({ 'errorCode': errorCode, 'errorMsg': errorMessage });
                }
            }
        } else {
            console.log("请求地址错误!");
        }
    } else {
        console.log("网络错误");
    }
    /*
    error => {return Promise.reject(error.response.data}
     */
})

// 发起请求
export function fetchEndpoint(reqUrl, type = 'POST', data = {}) {
    if (!reqUrl) { return }
    type = type.toUpperCase()
    reqUrl = apiBaseUrl + reqUrl

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            reqUrl = reqUrl + '?' + dataStr;
        }

    }

    return new Promise((resolve, reject) => {
        axios({
            method: type,
            url: reqUrl,
            data: data
        }).then(res => {
            resolve(res)
        }, error => {
            reject(error);
        })
    })
}
