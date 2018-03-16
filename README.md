##README

###目录结构

```
.
├── App.vue
├── api		        // api模板（yumi生成，无需修改）
│   ├── category.js
│   ├── product.js
├── assets		     // 资源文件
│   ├── tabbar_home_nor.png
│   ├── tabbar_home_sel.png
├── components		 // 公共组件
│   └── common
│       └── Tabbar.vue
├── config		     // 配置文件
│   ├── const.js
│   ├── enum.js
│   └── env.js
├── main.js
├── page			      // 业务模块
│   ├── auth
│   │   └── Signin.vue
│   ├── category
│   │   └── Category.vue
│   ├── home
│   │   └── Home.vue
├── router		     // 路由
│   └── router.js
├── server		     // backend api
│   ├── network.js
├── service		    // model层
│   └── category.js
├── store			     // 状态管理
│   ├── actions.js
│   ├── index.js
│   ├── modules
│   │   └── category.js
│   └── mutations.js
└── style			     // 全局样式
    └── reset.scss
```    

###代码规范
####命名规范
#####文件夹命名
* 统一命名为小写 
* 业务模块文件夹（page）代表着模块的名字
	* 由名词组成（car、order、cart）
	* 单词只能有一个 （good: car order cart）（bad: carInfo carpage）

#####文件命名
* 组件文件命名 PascalCase (单词首字母大写命名)
	* PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定（备注：参阅[组件命名约定](https://cn.vuejs.org/v2/guide/components.html#%E7%BB%84%E4%BB%B6%E5%91%BD%E5%90%8D%E7%BA%A6%E5%AE%9A)）	
	* 尽量是名词
	* 大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList）
	* 常用结尾单词有（Detail、Edit、List、Info）
* 其它js文件命名小写 

####代码格式
* 换行
	* 换行为2个空格
	
	```
	<div id="app">
  	  {{ message }}
	</div>
	```
	
	```
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Hello Vue!'
	  }
	})
	```

###TODO:
###技术栈
* vuex - api template
* css - sass?
* 页面适配，使用rem or flex？	 
* url中#是否可以去掉？

####功能模块
* 缓存处理机制
* flex 
* svg

###其它
* 打包自动更新的问题（微信端打开还是旧的版本） 
* 首页卡片组加载速度
	* 目标：首页加载秒开