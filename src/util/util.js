/*
	params: 参数
 */
export default{
    fetch(key){
        return JSON.parse(window.localStorage.getItem(key)||'[]')
    },
    save(key, value){
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    arrayFilter(array) {
    	let newAray = [];
    	for (let i = 0, len = array.length-1; i <= len; i++) {
    		if (newAray.indexOf(array[i] < 0)) {
    			newAray.push(array[i]);
    		}
    	}
    	return newAray;
    }
}
