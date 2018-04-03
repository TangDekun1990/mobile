<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header></v-cart-header>
		<!-- list -->
		<v-cart-list ref='list'></v-cart-list>
		<!-- footer -->
		<v-cart-footer></v-cart-footer>
	</div>
</template>

<script>
	import cartHeader from './child/CartHeader'
	import cartList from './child/CartList'
	import cartFooter from './child/CartFooter'
	export default {
		data(){
			return {}
		},
		created(){
			this.$on('redener-cart-list', (value) => {
				this.$refs.list.getCartList(value);
			})
		},
		components: {
			'v-cart-header': cartHeader,
			'v-cart-list': cartList,
			'v-cart-footer': cartFooter
		}

	}
</script>

<style lang='scss' scoped>
	.ui-cart-wrapper {
	}
</style>
