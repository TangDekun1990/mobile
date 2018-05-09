<template>
	<div class="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
	name: 'app',

	created: function() {
		window.location.href = 'wenchao://';
	},

	 watch: {
        $route(to, from) {
            // 路由改变发起重置
            this.resetStates();
        }
    },

	methods: {
		...mapMutations({
			saveToken: 'saveToken',
			clearToken: 'clearToken'
		}),

		...mapActions({
			resetStates: "resetStates"
		}),

		goBack () {
			window.history.length > 1 ? this.$router.go(-1): this.$router.push('/')
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
