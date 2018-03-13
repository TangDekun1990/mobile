<template>
	<div id="demo">
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import tabBar from '../../components/common/Tabbar'
	export default {
		data() {
			return {
				carData: ''
			}
		},
		components: {
			tabBar
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
</style>