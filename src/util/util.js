export default {

	fetch(key){
		return JSON.parse(window.localStorage.getItem(key)||'[]')
	},
	save(key, value){
		window.localStorage.setItem(key, JSON.stringify(value))
	},
	stopPrevent(event) {
		let e = event || window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else{
	        window.event.returnValue = false;//IE
	    }
	},
	/*
	 *  arrayFilter: 数组去重
	 */
	arrayFilter(array) {
		let newAray = [];
		for (let i = 0, len = array.length-1; i <= len; i++) {
			if (newAray.indexOf(array[i]) < 0){
				newAray.push(array[i]);
			}
		}
		return newAray;
	},

	fillTheScreen(obj) {
		const isWX = /micromessenger/.test(navigator.userAgent.toLowerCase())
	  	// why? document.documentElement.clientHeight - document.documentElement.offsetHeight
	  	let height = isWX ? document.documentElement.clientHeight : document.documentElement.offsetHeight
	  	if (!obj.target || !obj.totalHeight) return
	  	height = 1 - obj.totalHeight / height
	  	obj.target.style.height = height * 100 + 'vh'
	},

	/*
		*@param start  开始展示的字符
		*@param end 结束字符展示位置
		*@param target 目标字符
	*/
	replaceStr(target,  start, end, length) {
		let str = '';
		if (start) {
			str = target.substr(start, length) + '***';
		} else if (end) {
			str = '***'+ target.substr(end, length);
		} else {
			str = target.substr(0, 1) + '***'+ target.substr(target.length-1, 1);
		}
		return str;
	},

	/*
		date 日期
		fmt 显示的格式
	*/
	formatDate(date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
			}
		}
		return fmt;
	},

	padLeftZero(str) {
		return ('00' + str).substr(str.length);
	},

	/*
		price 价格
		格式化价格（保留两位小数）
	*/
	currencyPrice(price) {
		return parseFloat(price).toFixed(2)
	},

	/**
	 * value 要判断的参数值
	 * 是否是数值
	 */
	isNumber(value) {
		let reg = new RegExp('^[0-9]*$')
		if (!reg.test(value)) {
			return false
		}
		return true
	},

	/**
	 * beginAt 开始时间（时间戳）
	 * endAt 结束时间（时间戳）
	 */
	activityStatus (beginAt, endAt) {
		let status = -1 // (0: 未开始；1: 进行中；2: 已过期)
		let timestamp = Date.parse(new Date()) / 1000
		if (beginAt > timestamp) {
			status = 0
		} else if (timestamp > beginAt && timestamp < endAt) {
			status = 1
		} else if (timestamp > endAt) {
			status = 2
		}
		return status
	},

	/**
	 * interval 时间间隔（单位为s）
	 * 把秒数换为*天*时*分*秒的时间格式
	 */
	formatTimeInterval (interval) {
		let format = null
		let day = parseInt(interval / 60.0 / 60.0 / 24.0)
		let hour = parseInt(interval / 60 / 60 % 24)
		let minute = parseInt(interval / 60 % 60)
		let second = interval % 60
		format = day + ' 天 ' + hour + ' 时 ' + minute + ' 分 ' + second + ' 秒'
		return format
	},

	/*
	 * getOpenBrowser: 获取打开的设备
	 */
	getOpenBrowser() {
		let browser = {
			versions: function () {
			  	var u = navigator.userAgent,
			  		app = navigator.appVersion;
			  	return {   //移动终端浏览器版本信息
				   trident: u.indexOf('Trident') > -1, //IE内核
				   presto: u.indexOf('Presto') > -1, //opera内核
				   webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				   gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				   mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				   ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				   android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				   iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				   iPad: u.indexOf('iPad') > -1, //是否iPad
				   webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			  	};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		};
		let browserHeight = 0;
		if (browser.versions.mobile) {//判断是否是移动设备打开。
		    let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
		    //在微信中打开
			if (ua.match(/MicroMessenger/i) == "micromessenger") {}
			//在新浪微博客户端打开
		    if (ua.match(/WeiBo/i) == "weibo") {}
		    //在QQ空间打开
		  	if (ua.match(/QQ/i) == "qq") {}
		  	//是否在IOS浏览器打开
		  	if (browser.versions.ios) {
		  		browserHeight = 44;
		  	}
		  	//是否在安卓浏览器打开
		    if(browser.versions.android){
		    	browserHeight = 44;
		    }
		} else {
		  //否则就是PC浏览器打开
		}
		return browserHeight;
	},

	/*
	 * 调用智齿
	 */
	openZhichiManager(detail) {
		let zhiManager = (getzhiSDKInstance());
		zhiManager.on('load', function() {
			zhiManager.init();
			zhiManager.initBtnDOM();
			zhiManager.set('customBtn', 'true');
			zhiManager.set('lazyFlag', true);
			zhiManger.set('satDegree_A',true);
			zhiManger.set('isFeedBackFlag',true);
	    	zhiManager.set('robotHelloWord', '您好! 我是机器人小超， 有什么吩咐您请说哦！');
	    });
	    // debugger;
	    if (detail) {
			zhiManager.set('thumbnail_info', detail.photos[0].thumb);
	        zhiManager.set('label_info', detail.current_price + 'AED');
	        zhiManager.set('abstract_info', detail.desc);
	        zhiManager.set('url_info', window.location.href);
	        zhiManager.set('title_info', detail.name);
		}
		return zhiManager;
	},

	/*
	 * getunreadCount: 获取未读消息数
	 */
	getunreadCount(zhiManager, scoped, key) {
		zhiManager.on("unread.count",function(data){
	    	console.log(data);
		});
		zhiManager.on("receivemessage",function(ret){
			scoped[key] = ret;
			console.log(ret);
		});
	}
}
