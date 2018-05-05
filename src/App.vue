<template>
	<div class="app">
		<keep-alive>
		  <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	name: 'app',
	created: function() {
		window.location.href = 'wenchao://'		
		/*
		 * detectBack： 监听浏览器返回事件
		 */
		// var detectBack = {
	 //        initialize: function() {
	 //            //监听hashchange事件
	 //            window.addEventListener('hashchange', function() {
	 //            	console.log('eufgeuf');
	 //                //为当前导航页附加一个tag
	 //                this.history.replaceState('hasHash', '', '');
	 //            }, false);

	 //            window.addEventListener('popstate', function(e) {
	 //            	console.log('111');
	 //                if (e.state) {
	 //                    //侦测是用户触发的后退操作, dosomething
	 //                    //这里刷新当前url
	 //                    this.location.reload();
	 //                }
	 //            }, false);
	 //        }
  //   	};
	//   	detectBack.initialize();
	},
	methods: {
		...mapMutations({
			saveToken: 'saveToken',
			clearToken: 'clearToken'
		}),
		goBack () {
			window.history.length > 1
			? this.$router.go(-1)
			: this.$router.push('/')
		}
	},
	mounted () {
		if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {			
			// 加载页面时获取token			
			wenchaoApp.getToken((token) => {	 
				if (token && token.length) {
					this.saveToken({ 'token': token })
				} else {
					this.clearToken()
				}
			})
			// native登录成功后，重新获取token
			wenchaoApp.onLogin((token) => {
				if (token && token.length) {
					this.saveToken({ 'token': token })
				}
			})
		}		
	},
}
</script>

<style>
	div.app {
		height: 100%;
	}
</style>
