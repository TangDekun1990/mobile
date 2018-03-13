import CryptoJS from 'crypto-js'
import xxtea from './xxtea'
import { apiBaseUrl, SIGN_KEY, ENCRYPT_KEY } from '../config/env'

function getErrorInfo(errorCode, errorMsg) {
    let error = new Object();
    error.errorCode = errorCode;
    error.errorMsg = errorMsg;
    return error;
}

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

export function fetchEndpoint(endpoint, method, params) {
    return new Promise(function (resolve, reject) {
        for (const key in params) {
            if (params[key] === null || params[key] === undefined) {
                delete params[key];
            }
        }

        // Header
        let headers = new Headers();

        // post_body: 客户端HTTP请求包体，如：a=1&b=2&c=3，其中key需要升序排列
        let post_body = toQueryString(params);

        // timestamp: 客户端秒级时间戳
        let timestamp = Date.parse(new Date()) / 1000 + '';

        // sign: HMAC-SHA256( timestamp + post_body, SIGN_KEY )
        let sign = CryptoJS.HmacSHA256(timestamp + post_body, SIGN_KEY);
        console.log(sign);
        // xSign格式: sign,timestamp
        let xSign = sign + ',' + timestamp;

        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        // headers.append('Cache-Control', 'no-cache');

        // TODO: user token
        // if (authInfo.isOnline) {
        //   headers.append('X-ECAPI-Authorization', authInfo.token);
        // } else {
            // headers.append('X-ECN-Authorization', null);
        // }
    
        headers.append('X-ECAPI-Sign', xSign);
        headers.append('X-ECAPI-UserAgent', 'UserAgent'); // TODO:
        headers.append('X-ECAPI-UDID', 'udid'); // TODO:

        // TODO:
        // headers.append('X-ECAPI-Ver', appVersion);
        // Body
        let encry_post_body = '';
        let body = null;
        if (post_body && post_body.length) {
            encry_post_body = xxtea.encryptToString(post_body, ENCRYPT_KEY);
            body = toQueryString({ x: encry_post_body });
            // 字符串中+替换为%2B
            body = body.replace(/\+/g, '%2B');
        }

        fetch(apiBaseUrl + endpoint, {
            method: method,
            headers: headers,
            body: body,
            mode: 'cors'
        }).then(response => response.json())
        .then(response => {
            if (response.error) {
                let error = getErrorInfo(response.code, response.message);
                console.log(endpoint + '=>');
                console.log(error);
                reject(error);
            } else {
                // var decrypt_data = xxtea.toString(xxtea.decrypt(response.data, xxtea.toBytes(Constants.ENCRYPT_KEY)));
                let decrypt_data = xxtea.decryptToString(response.data, ENCRYPT_KEY);
                let data = JSON.parse(decrypt_data);
                console.log('====================================');
                console.log(endpoint);
                console.log(post_body)
                console.log(data);
                console.log('====================================');
                resolve(data);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}
// 
// import axios from 'axios'
// import XXTEA from './xxtea'
// import CryptoJS from 'crypto-js' 

// import { apiBaseUrl, SIGN_KEY, ENCRYPT_KEY } from '../config/env'

// function getKeys(object) {
//     var result = [];
//     for (let key in object) {
//         result.push(key);
//     }
//     return result;
// }

// function sortObjectKeys(obj) {
//     var keys = getKeys(obj);
//     keys.sort();
//     return keys;
// }

// // 请求加密
// axios.interceptors.request.use(config => {
//     let isAPIRequest = config.url.indexOf(apiBaseUrl) == 0 ? true : false;
//     if (isAPIRequest) {
//         let headerUA = 'Platform/Web';
//         let headerUDID = '';
//         let headerVer = "1.0.0";
//         let headerSign = '';
//         let headerToken = null;
//         let headerLang = '11';
//         let bodyData = '';

//         var params = config.data || {};
//         if (params != undefined) { 
//             for (let key in params) {
//                 if (params[key] === null || params[key] === undefined) {
//                     delete params[key];
//                 }
//             }
//             var resultKeys = sortObjectKeys(params);
//             var resultStr = "";
//             for (let i = 0, len = resultKeys.length; i < len; i++) {
//                 if (i > 0) {
//                     resultStr += "&";
//                 }
//                 var resultKey = resultKeys[i];
//                 var resultValue = params[resultKey];
//                 resultValue = encodeURIComponent(resultValue)
//                     .replace("!", "%21")
//                     .replace("*", "%2A")
//                     .replace("(", "%28")
//                     .replace(")", "%29")
//                     .replace(")", "%27")
//                     .replace("~", "%7E");
//                 resultStr += resultKey + "=" + resultValue;
//             }

//             var timestamp = Date.parse(new Date()) / 1000 + '';
//             var formData = timestamp + resultStr;
//             var signData = CryptoJS.HmacSHA256(formData, SIGN_KEY);
//             headerSign = signData + ',' + timestamp;

//             var encryptedData = XXTEA.encryptToString(resultStr, ENCRYPT_KEY);
//             var uriEncodeData = encodeURIComponent(encryptedData)
//                 .replace("!", "%21")
//                 .replace("*", "%2A")
//                 .replace("(", "%28")
//                 .replace(")", "%29")
//                 .replace(")", "%27")
//                 .replace("~", "%7E");
//             bodyData = encryptedData;

//             config.headers['X-ECAPI-Sign'] = headerSign;
//             config.headers['X-ECAPI-UserAgent'] = 'UserAgent';
//             config.headers['X-ECAPI-UDID'] = 'udid';
//             config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

//             if (headerToken) {
//                 config.headers['X-ECN-Authorization'] = headerToken;
//             } else {
//                 config.headers['X-ECN-Authorization'] = null;
//             }
//             config.data = {};
//             config.data['x'] = bodyData;
//         }
//     }
//     return config
// }, error => {
//     return Promise.reject(error)
// })

// export default async(reqUrl, type = 'POST', data = {}) => {
//     if (!reqUrl) {return}
//     type = type.toUpperCase()
//     reqUrl = apiBaseUrl + reqUrl
    
//     if (type == 'GET') {
//         let dataStr = ''; //数据拼接字符串
//         Object.keys(data).forEach(key => {
//             dataStr += key + '=' + data[key] + '&';
//         })

//         if (dataStr !== '') {
//             dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
//             reqUrl = reqUrl + '?' + dataStr;
//         }

//     }

//     return new Promise((resolve,reject) => {
//         axios({
//             method: type, 
//             url: reqUrl,
//             data: data
//         }).then(res => {
//             resolve(res)
//         }, error => {
//             reject(error)
//         })
//     })
// }
