<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header></v-cart-header>

		<!-- list -->
		<v-cart-list ref='list' :type="type"></v-cart-list>

		<!-- 促销 -->
		<v-cart-promos ref='promos' :type="type"></v-cart-promos>

		<!-- footer -->
		<v-cart-footer :type="type"></v-cart-footer>

		<!--  -->
		<v-cart-tabBar v-if='type'></v-cart-tabBar>
	</div>
</template>

<script>
	import cartHeader from './child/CartHeader'
	import cartList from './child/CartList'
	import cartFooter from './child/CartFooter'
	import cartPromos from './child/Promos'
	import tabBar from '../../components/common/Tabbar';

	export default {
		data(){
			return {
				bottom: 44,
				type: this.$route.params.type ? this.$route.params.type : 0
			}
		},
		created(){
			this.$on('redener-cart-list', (value) => {
				this.$refs.list.getCartList(value);
			})
			this.$on('redener-cart-price', (value) => {
				this.$refs.list.selectCartList(value)
				this.$refs.list.renderCart();
			});
			this.$on('redener-promos', () => {
				this.$refs.promos.getPromos();
			});
		},

		mounted(){
			console.log(this.$refs.promos.getHeight());
		},
		components: {
			'v-cart-header': cartHeader,
			'v-cart-list': cartList,
			'v-cart-footer': cartFooter,
			'v-cart-promos': cartPromos,
			'v-cart-tabBar': tabBar
		}

	}
</script>

<style lang='scss' scoped>
	.ui-cart-wrapper {
	}
</style>
