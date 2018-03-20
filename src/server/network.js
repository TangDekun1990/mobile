 import axios from 'axios'
import XXTEA from './xxtea'
import CryptoJS from 'crypto-js' 

import { apiBaseUrl, SIGN_KEY, ENCRYPT_KEY } from '../config/env'
import ENUM from '../config/enum';

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return key + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return key + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

function getErrorInfo(errorCode, errorMsg) {
    let error = new Object();
    error.errorCode = errorCode;
    error.errorMsg = errorMsg;
    return error;
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

            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            config.headers['X-ECAPI-Sign']  = xSign ;
            config.headers['X-ECAPI-UserAgent'] = 'UserAgent';
            config.headers['X-ECAPI-UDID'] = 'udid'; 

            let encry_post_body = '';
            let body = null;
            console.log(post_body);
            if (post_body && post_body.length) {
                encry_post_body = XXTEA.encryptToString(post_body, ENCRYPT_KEY);
                body = toQueryString({ x: encry_post_body });
                body = body.replace(/\+/g, '%2B');
            }
            config.data = {};
            config.data = body;
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
            if (response.data && response.data.data){
                var raw = XXTEA.decryptToString(response.data.data, ENCRYPT_KEY);
                var json = JSON.parse(raw);
                if (json) {
                    delete response.data.data;
                    for (var key in json) {
                        response.data[key] = json[key];
                    }
                }
                console.log(response.data);
                return response.data;
            } else if (response.data && response) {
                let errorMessage = response.data.message;
                let errorCode = response.data.code;
                if (response.data.error) {
                    errorMessage = '网络错误, 错误代码:=' + errorCode + "错误信息:="+ errorMessage;
                }
                console.log(errorMessage);
            }
        } else {
            console.log("请求地址错误!");
        }
    } else {
        console.log("网络错误");
    }
}, error => {
    return Promise.reject(error.response.data)
})

// 发起请求
export function fetchEndpoint(reqUrl, type = 'POST', data = {}){
    if (!reqUrl) {return}
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

    return new Promise((resolve,reject) => {
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
