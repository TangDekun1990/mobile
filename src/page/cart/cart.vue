<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header ref="header" :issShowTabbar="type"></v-cart-header>
		<!-- list -->
		<v-cart-list ref='list' :issShowTabbar="type" :isCheckedAll="isDelete"></v-cart-list>
		<!-- 促销 -->
		<v-cart-promos ref='promos' :issShowTabbar="type" :isCheckedAll="isDelete"></v-cart-promos>
		<!-- footer -->
		<v-cart-footer :issShowTabbar="type" :isCheckedAll="isDelete" :isStatus="isStatus"></v-cart-footer>
		<!-- 底部tabbar -->
		<v-cart-tabBar v-if='type'></v-cart-tabBar>
	</div>
</template>

<script>
	import cartHeader from './child/CartHeader'
	import cartList from './child/CartList'
	import cartFooter from './child/CartFooter'
	import cartPromos from './child/Promos'
	import tabBar from '../../components/common/Tabbar';

	import { mapState, mapMutations } from 'vuex';

	export default {
		data(){
			return {
				type: parseInt(this.$route.params.type ? this.$route.params.type : 0),  //判断是否显示购物车底部的tabbar 1 ： 显示 0 不显示
				isDelete: false,  //编辑 false - 编辑~完成  true - 完成~编辑 false
				isStatus: true,
				target: ''
			}
		},

		computed: mapState({
			height: state => state.cart.height  //TODO
		}),

		watch: {
			height: function (value) {
				let totalHeight = (44 * 2) + value + 20;
				if (this.type) {
					totalHeight = totalHeight + 50;
				}
				const target = this.target;
		    	this.utils.fillTheScreen({target, totalHeight})
			}
		},

		created(){
			// 监听是否改变购物车列表选中的状态
			this.$on('change-list-selected', (data) => {
				// data.isFinish ? 表示是完成状态 : 编辑状态
				this.isDelete = data.isFinish;
				if (data.isFinish) {
					this.$refs.list.addChecked(false);
				} else {
					this.$refs.list.addChecked(true);
				}
				this.$refs.list.renderCart();
			});

			// 监听是否更新购物车列表
			this.$on('update-cart-list', (data) => {
				if (data.isdelete) {
					this.$refs.list.deleteSelected();
				}
			});

			// 监听是否获取购物车促销信息
			this.$on('get-promos-data', (data) => {
				this.$refs.promos.getCartPromos(data);
			});

			// 监听购物车底部全选按钮是否选中
			this.$on('cart-bottom-status', (data) => {
				this.$refs.list.addChecked(data.isCheckAll);
				this.$refs.list.renderCart();
			});

			//监听列表一个个选中底部全选按钮默认选中
			this.$on('change-footer-status', (status) => {
				this.isStatus = status;
			})
		},

		mounted(){
			// 计算内容高度
		    this.$nextTick( () => {
		    	this.target = document.querySelector('.cart-list-wrapper');
		    	let totalHeight = (44 * 2) + this.height + 20;
				if (this.type) {
					totalHeight = totalHeight + 50;
				}
				const target = this.target;
		    	this.utils.fillTheScreen({target, totalHeight});
		    })
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
