import CryptoJS from 'crypto-js'
import xxtea from './xxtea'
import { apiBaseUrl, SIGN_KEY, ENCRYPT_KEY } from '../config/env'

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
    // xSign格式: sign,timestamp
    let xSign = sign + ',' + timestamp;
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    headers.append('Cache-Control', 'no-cache');
    // TODO: user token
    // if (authInfo.isOnline) {
    //   headers.append('X-ECAPI-Authorization', authInfo.token);
    // } else {
    headers.append('X-ECN-Authorization', null);
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
    })
      .then(response => response.json())
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
        // let errorInfo = getErrorInfo(response.errCode, error.message);
        reject(error);
        // if (__DEV__) {
        //   logItem.responseBody = {};
        //   logItem.responseError = error.message;
        // }
      });
  });
}

function getErrorInfo(errorCode, errorMsg) {
  let error = new Object();
  error.errorCode = errorCode;
  error.errorMsg = errorMsg;
  return error;
}

function toQueryString(obj) {
  return obj
    ? Object.keys(obj)
      .sort()
      .map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
          return val
            .sort()
            .map(function (val2) {
              return key + '=' + encodeURIComponent(val2);
            })
            .join('&');
        }
        return key + '=' + encodeURIComponent(val);
      })
      .join('&')
    : '';
}

