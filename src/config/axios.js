import axios from 'axios'
import envConst from './const'

let XXTEA = require('xxtea')
let CryptoJS = require("crypto-js");

function getKeys(object) {
	var result = [];
	for (let key in object) {
		result.push(key);
	}
	return result;
}

function sortObjectKeys(obj) {
	var keys = getKeys(obj);
	keys.sort();
	return keys;
}

// 请求加密
axios.interceptors.request.use(config => {
	// console.log(config)
	let isAPIRequest = config.url.indexOf(envConst.baseUrl) == 0 ? true : false;
	if (isAPIRequest) {

		let headerUA = 'Platform/Web';
		let headerUDID = '';
		let headerVer = "1.0.0";
		let headerSign = '';
		let headerToken = '111';
		let headerLang = '11';
		let bodyData = '';

		let params = config.data || {};
		if (params != undefined) { 
			let resultKeys = sortObjectKeys(params);
			var resultStr = "";
			for (let i = 0, len = resultKeys.length; i < len; i++) {
				if (i > 0) {
					resultStr = "&";
				}
				let resultKey = resultKeys[i];
				let resultValue = params[resultKey];
				params[resultKey] = escape(resultValue)
				resultValue = encodeURIComponent(resultValue)
				.replace("!", "%21")
				.replace("*", "%2A")
				.replace("(", "%28")
				.replace(")", "%29")
				.replace(")", "%27")
				.replace("~", "%7E");
				resultStr += resultKey + "=" + resultValue;
			}

			let timestamp = Date.parse(new Date()) / 1000 + "";
			let encryptedData = XXTEA.encrypt(resultStr, envConst.ENCRYPT_KEY);
			let uriEncodeData = encodeURIComponent(encryptedData)
			.replace("!", "%21")
			.replace("*", "%2A")
			.replace("(", "%28")
			.replace(")", "%29")
			.replace(")", "%27")
			.replace("~", "%7E");
			let formData = timestamp + 'x=' + uriEncodeData;
			let signData = CryptoJS.HmacSHA256(formData, envConst.signKey, {
				asBytes: false
			});

			headerSign = signData.toString(CryptoJS.enc.Hex) + "," + timestamp;
			bodyData = encryptedData;

			config.headers['X-PVG-UserAgent'] = headerUA;
			config.headers['X-PVG-UDID'] = headerUDID;
			config.headers['X-PVG-Ver'] = headerVer;
			config.headers['X-PVG-Sign'] = headerSign;
			config.headers['X-PVG-Lang'] = headerLang;

			if (headerToken) {
				config.headers['Authorization'] = headerToken;
			}
			config.data = {};
			config.data['x'] = bodyData;
		}
	}
	return config
}, error => {
	return Promise.reject(error)
})

export default async(reqUrl, type = 'POST', data = {}) => {
	if (!reqUrl) {return}
		type = type.toUpperCase()
	reqUrl = envConst.baseUrl + reqUrl
	
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
			reject(error)
		})
	})
}