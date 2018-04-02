<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header></v-cart-header>
		<!-- list -->
		<v-cart-list></v-cart-list>
	</div>
</template>

<script>
	import cartHeader from './child/CartHeader'
	import cartList from './child/CartList'
	export default {
		data(){
			return {}
		},
		components: {
			'v-cart-header': cartHeader,
			'v-cart-list': cartList
		}

	}
</script>

<style lang='scss' scoped>
	.ui-cart-wrapper {
	}
</style>
