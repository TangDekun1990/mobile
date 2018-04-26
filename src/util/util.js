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

	isNumber(value) {
		let reg = new RegExp('^[0-9]*$')
		if (!reg.test(value)) {
			return false
		}
		return true
	}
}
