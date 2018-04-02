<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header></v-cart-header>
		<!--  -->
	</div>
</template>

<script>
	import cartHeader from './child/CartHeader'
	export default {
		data(){
			return {}
		},
		components: {
			'v-cart-header': cartHeader
		}

	}
</script>

<style lang='scss' scoped>
	.ui-cart-wrapper {
		height: 100%;
		border: 1px solid red;
	}
</style>
