<template>
	<div class="ui-cart-wrapper">
		<!-- header -->
		<v-cart-header ref="header" :issShowTabbar="type" :isEmpty="isEmpty"></v-cart-header>
		<div v-if='!isEmpty'>
			<!-- list -->
			<v-cart-list ref='list' :issShowTabbar="type" :isCheckedAll="isFinish"></v-cart-list>
			<!-- 促销 -->
			<v-cart-promos ref='promos' :issShowTabbar="type" :isCheckedAll="isFinish" :isshowpromos="isshowpromos"></v-cart-promos>
			<!-- footer -->
			<v-cart-footer :issShowTabbar="type" :isCheckedAll="isFinish" :isStatus="isStatus"></v-cart-footer>
		</div>

		<div v-if='isEmpty' class="empty-cart">
			<img src="../../assets/image/tabbar-icon/tabbar_cart_nor@2x.png">
			<p>您的购物车还是空的</p>
			<span @click="goHome()">随便逛逛</span>
		</div>

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
				isFinish: false,  //编辑 false - 编辑~完成  true - 完成~编辑 false
				isStatus: true,  //是否默认选中底部的全选按钮
				isshowpromos: true,  //是否显示促销信息
				target: '',  //设置高度的element元素
				isEmpty: false
			}
		},

		computed: mapState({
			height: state => state.cart.height,  //TODO
			user: state => state.auth.user
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
			this.isSignin();

			// 监听是否改变购物车列表选中的状态
			this.$on('change-list-selected', (data) => {
				// data.isFinish ? 表示是完成状态，1，列表默认全不选中 2，促销信息不显示， 3，改变列表的高度  : 编辑状态  1，列表默认全选中 2，促销信息显示， 3，改变列表的高度
				if (!this.isEmpty) {
					this.isFinish = data.isFinish;
					if (data.isFinish) {
						this.isshowpromos = false;
						this.setHeight(0);
						this.$refs.list.addChecked(false);
					} else {
						this.isshowpromos = true;
						this.setHeight(this.height);
						this.$refs.list.addChecked(true);
					}
					this.$refs.list.renderCart();
				}
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
				//data.isCheckAll ? true 1,显示促销信息， 2，重新计算列表的高度: false 1.隐藏促销信息， 2，重新计算列表的高度
				if (data.isCheckAll && !this.isFinish) {
					this.isshowpromos = true;
					this.setHeight(this.height);
				} else {
					this.isshowpromos = false;
					this.setHeight(0);
				}
				this.$refs.list.addChecked(data.isCheckAll);
				this.$refs.list.renderCart();
			});

			//监听列表一个个选中底部全选按钮默认选中
			this.$on('change-footer-status', (status) => {
				this.isStatus = status;
			});

			this.$on('list-is-empty', (data) => {
				if (data.length > 0) {
					this.isEmpty = false;
				} else {
					this.isEmpty = true;
				}
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
		},

		methods: {
			// TODO
			setHeight(height) {
				let totalHeight = (44 * 2) + height + 20;
				if (this.type) {
					totalHeight = totalHeight + 50;
				}
				const target = this.target;
		    	this.utils.fillTheScreen({target, totalHeight})
			},

			/*
			 * isSignin: 是否登录
			 */
			isSignin() {
				if (this.user) {
					this.isEmpty = false;
				}else {
					this.isEmpty = true;
				}
			},

			/*
			 * goHome: 跳转到首页
			 */
			goHome() {
				this.$router.push({'name': 'home'});
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-cart-wrapper {
	}
	.empty-cart{
		padding-top: 79px;
    	text-align: center;
    	img {
    		width: 75px;
    		height: 75px;
    	}
    	p {
	        font-size:16px;
	        color:rgba(124,127,136,1);
	        line-height:22px;
	        padding: 26px 0px 40px 0px;
    	}
    	span {
    		font-size:16px;
			color:rgba(255,255,255,1);
			height:44px;
			background:rgba(242,48,48,1);
			border-radius: 3px ;
			line-height: 44px;
			display: inline-block;
			width: 200px;
    	}
	}
</style>
