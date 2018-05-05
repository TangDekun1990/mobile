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
	mounted () {
		if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
			 let token = bridge.getToken(function(responseData) {
				 console.log('====================================');
				console.log('responseData is ', responseData);
				console.log('====================================');	 
				 if (responseData && responseData.length) {
					 this.saveToken({ 'token': responseData })
				 }
			  })
		}
		console.log('====================================');
		console.log('getToken...');
		console.log('====================================');
	},
	methods: {
		...mapMutations({
			saveToken: 'saveToken'
		}),
		goBack () {
			window.history.length > 1
			? this.$router.go(-1)
			: this.$router.push('/')
		}
	}
}
</script>

<style>
	div.app {
		height: 100%;
	}
</style>
