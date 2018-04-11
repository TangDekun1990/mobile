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
	  	// why?
	  	let height = isWX ? document.documentElement.clientHeight : document.documentElement.clientHeight - document.documentElement.offsetHeight
	  	if (!obj.target || !obj.totalHeight) return
	  	height = 1 - obj.totalHeight / height
	  	obj.target.style.height = height * 100 + 'vh'
	},
	/**
	 * 简单的移动函数
	 * @param {HTML Object} el 目标节点
	 * @param {number} x 水平方向的移动
	 * @param {number} y 垂直方向的移动
	 * @param {Object} options 可选参数
	 * @param {Boolean} options.useTransfrom 是否通过transfrom来移动元素
	 * @param {Boolean} options.transitionTimingFunction transition的timingFunction
	 * @param {String} options.transitionDuration transition时间
	 */
 	translate(el, x, y, options) {
	 	const defaultOptions = {
	 		useTransfrom: true,
	 		transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
	 		transitionDuration: '0s'
	 	}
	 	for (let option in options) {
	 		defaultOptions[option] = options[option]
	 	}
	 	if (defaultOptions.useTransfrom) {
	 		el.style.transform = `translate3d(${x}px,${y}px,0)`
	 		el.style.transitionProperty = 'transform'
	 		el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
	 		el.style.transitionDuration = defaultOptions.transitionDuration
	 	} else {
	 		el.style.left = x
	 		el.style.top = y
	 	}
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
	}
}
