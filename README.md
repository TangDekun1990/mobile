##README
###技术栈

`vue2 + vuex  + vue-router + webpack + es6  + axios + sass + flex`


###目录结构 

```

├── README.md  								# 项目说明
├── build									# 打包
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config									# 打包配置
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist									# 打包后目录
│   ├── index.html
│   └── static
│       ├── css
│       ├── img
│       └── js
├── index.html
├── package-lock.json
├── package.json
├── src										# 代码目录
│   ├── App.vue								# 根组件
│   ├── api									# api模板（yumi生成，无需修改）
│   │   ├── index.js						# api索引（可选）
│   │   └── network
│   ├── assets								# 资源文件
│   │   ├── image							# 图片资源
│   │   ├── font							# 字体文件
│   │   ├── js								# 第三方js插件
│   │   └── style
│   │       ├── _variable.scss				# scss变量文件
│   │       ├── mixin.scss					# scss函数文件
│   │       └── reset.scss					# 重置浏览器样式文件
│   ├── components							# 公共组件
│   │   └── common
│   ├── config								# 项目config目录
│   │   ├── const.js						# 常量文件
│   │   ├── enum.js							# 枚举文件
│   │   └── env.js							# 环境配置
│   ├── main.js								# 程序入口
│   ├── network								# 网络请求（api的公共部分）
│   │   └── network.js
│   ├── page								# 业务模块
│   │   ├── auth
│   │   ├── product							# 商品模块
│   │   │   ├── child						# 附属的子模块组件
│   │   │   ├── product.vue					# 模块组件
│   │   │   └── static.js					# 组件所需要的静态数据(可选）
│   │   ├── home
│   ├── router								# 路由组件
│   │   └── router.js
│   ├── service								# service部分（可选）
│   ├── store								# 状态管理
│   │   ├── actions.js						# 根级别的 action
│   │   ├── getter.js						# 根级别的 getter
│   │   ├── index.js
│   │   ├── modules							# 模块部分
│   │   │   ├── auth.js				
│   │   │   └── config.js
│   │   └── mutations.js					# 根级别的 mutation
│   └── util								# 公共的方法(原型链方式加上）
│       └── util.js
└── static

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
* vuex - api template (Done)
* css - sass?(Done) 
	* sass 
* 页面适配，使用rem or flex？(Done) 	 
	* flex 
* url中#是否可以去掉？(待完成)
	* 可以 

####功能模块
* 缓存处理机制
* flex 
* svg

###其它
* 打包自动更新的问题（微信端打开还是旧的版本） 
* 首页卡片组加载速度
	* 目标：首页加载秒开