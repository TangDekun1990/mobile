
import wx from 'weixin-js-sdk'
import { configGet, jssdkConfig } from '../api/network/config'
const wxApi = {
	/*
	 * [isweixin 判断是否微信浏览器]
	 */
	isweixin() {
		const ua = window.navigator.userAgent.toLowerCase()
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true
		} else {
			return false
		}
	},

	/*
	 * getConfigRes： 获取config微信配置
	 */
	getConfigRes(title, imgUrl, desc) {
		let that = this;
		// configGet().then(res => {
 		// 		if (res) {
		// 		let configs = res.config,
		// 			wechatConfig = {};
		// 		for (const key in configs) {
		// 			if (key == 'wechat.web') {
		// 				wechatConfig = configs[key];
		// 			}
		// 		}
		// 		that.wxRegister(wechatConfig, title, imgUrl, desc);
		// 	}
		// });
		jssdkConfig(window.location.href.split('#')[0]).then(res => {
			if (res) {
				let wechatConfig = res.config;
				that.wxRegister(wechatConfig, title, imgUrl, desc);
			}
		})
	},

	/*
	 * [wxRegister 微信Api初始化]
	 * @param  {Function} callback [ready回调函数]
	 */
	wxRegister(config, title, imgUrl, desc, url, callback) {
		wx.config({
			debug: false, // 开启调试模式
			appId: config.app_id, // 必填，公众号的唯一标识
			timestamp: config.timestamp, // 必填，生成签名的时间戳
			nonceStr: config.nonceStr, // 必填，生成签名的随机串
			signature: config.signature, // 必填，签名，见附录1
			jsApiList: [
				'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
				'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
				'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
				'onMenuShareWeibo' // 获取“分享到微博”按钮点击状态及自定义分享内容接口
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function () {
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				imgUrl: imgUrl, // 分享图标
				desc: desc, // 分享描述
				link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1],
				success: function() {
					window.alert('已分享给朋友');
				},
				error: function () {
					window.alert('分享失败');
				}
			});
		});
		wx.error(res => {
			alert('验证失败的信息:' + res.errMsg);
			// console.log(res);
		});
	},

	/*
	 * [ShareTimeline 微信分享到朋友圈]
	 * @param {[type]} opstion [分享信息]
	 * @param {[type]} success [成功回调]
	 * @param {[type]} error   [失败回调]
	 */
	ShareTimeline(opstion) {
		wx.onMenuShareTimeline({
			title: opstion.title, // 分享标题
			link: opstion.link, // 分享链接
			imgUrl: opstion.imgUrl, // 分享图标
			success() {
				// 用户成功分享后执行的回调函数
				opstion.success()
			},
			cancel() {
				// 用户取消分享后执行的回调函数
				opstion.error()
			}
		})
	},

	/*
	 * [ShareTimeline 微信分享给朋友]
	 * @param {[type]} option [分享信息]
	 * @param {[type]} success [成功回调]
	 * @param {[type]} error   [失败回调]
	 */
	ShareAppMessage(option) {
		wx.onMenuShareAppMessage({
			title: option.title, // 分享标题
			desc: option.desc ? option.desc : '', // 分享描述
			link: option.link ? option.link : '', // 分享链接
			imgUrl: option.imgUrl ? option.imgUrl : '', // 分享图标
			success() {
				// 用户成功分享后执行的回调函数
				option.success()
			},
			cancel() {
				// 用户取消分享后执行的回调函数
				option.error()
			}
		})
	},

	/*
	 * [ShareTimeline 微信分享到QQ]
	 * @param {[type]} opstion [分享信息]
	 * @param {[type]} success [成功回调]
	 * @param {[type]} error   [失败回调]
	 */
	ShareQQ(opstion) {
		wx.onMenuShareQQ({
			title: opstion.title, // 分享标题
			link: opstion.link, // 分享链接
			imgUrl: opstion.imgUrl, // 分享图标
			success() {
				// 用户成功分享后执行的回调函数
				opstion.success()
			},
			cancel() {
				// 用户取消分享后执行的回调函数
				opstion.error()
			}
		})
	},

	/*
	 * [ShareTimeline 微信分享到微博]
	 * @param {[type]} opstion [分享信息]
	 * @param {[type]} success [成功回调]
	 * @param {[type]} error   [失败回调]
	 */
	ShareWeibo(opstion) {
		wx.onMenuShareWeibo({
			title: opstion.title, // 分享标题
			link: opstion.link, // 分享链接
			imgUrl: opstion.imgUrl, // 分享图标
			success() {
				// 用户成功分享后执行的回调函数
				opstion.success()
			},
			cancel() {
				// 用户取消分享后执行的回调函数
				opstion.error()
			}
		})
	}
}

export default wxApi
