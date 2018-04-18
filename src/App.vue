<template>
	<div class="app">
		<keep-alive>
		  <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
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
</style>
