<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header></v-cart-header>

		<!-- list -->
		<v-cart-list ref='list'  v-bind:style="{bottom: bottom+ 'px'}"></v-cart-list>

		<!-- 促销 -->
		<v-cart-promos ref='promos'></v-cart-promos>

		<!-- footer -->
		<v-cart-footer></v-cart-footer>
	</div>
</template>

<script>
	import cartHeader from './child/CartHeader'
	import cartList from './child/CartList'
	import cartFooter from './child/CartFooter'
	import cartPromos from './child/Promos'

	export default {
		data(){
			return {
				bottom: 44
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
			// console.log(this.$refs.promos.$el.style.height);
			// this.$nextTick(() => {
			// 	let cur = document.querySelectorAll("div[class='ui-cart-promos']");
		 //    	let curHeight = cur.offsetHeight;
			// 	console.log(curHeight);
			// });
		},
		components: {
			'v-cart-header': cartHeader,
			'v-cart-list': cartList,
			'v-cart-footer': cartFooter,
			'v-cart-promos': cartPromos
		}

	}
</script>

<style lang='scss' scoped>
	.ui-cart-wrapper {
	}
</style>
