<template>
	<div class="app">
		<!-- 这里是会被缓存的视图组件-->
		<!-- <keep-alive>
		    <router-view v-if="$route.meta.keepAlive">

		    </router-view>
		</keep-alive> -->

 		<!-- 这里是不被缓存的视图组件-->
		<!-- <router-view v-if="!$route.meta.keepAlive">

		</router-view> -->
		<template v-if="$route.matched.length">
			<router-view></router-view>
		</template>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	},
	created: function() {
		console.log('App route is', this.$router)
	},
	methods: {
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
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
