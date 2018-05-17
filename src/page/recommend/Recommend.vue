<!-- Recommend.vue -->
<template>
	<div class="recommend-wrapper">
		<div class="ui-commmon-header">
			<img src="../../assets/image/change-icon/back@2x.png" v-on:click='goBack()' class="ui-go-back">
			<h3>相关商品</h3>
			<img src="../../assets/image/change-icon/b2_cart@2x.png" class="ui-cart" v-on:click='goCart()'>
			<span class="cart-number" v-if="cartNumber <= 100 && cartNumber > 0">{{ cartNumber }}</span>
			<span class="cart-number" v-if="cartNumber >= 100  && cartNumber > 0 ">99+</span>
		</div>
		<div class="ui-recommend-body" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<v-recommend-list v-for="(item, index) in recommendList" :item="item" :productId="item.id" v-bind:key="index"></v-recommend-list>
			<p class="recommend-no-more" v-if='!isMore'>没有更多了</p>
		</div>
	</div>
</template>

<script>
	import { recommendProductList } from '../../api/network/recommend';
	import { cartQuantity } from '../../api/network/cart';
	import productList from '../product/child/ProduceBody';
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				recommendList: [],
				listParams: {
                	"page": 0,
                	"per_page": 10
				},
				loading: false,
				isMore: true,
				quantity: 0
			}
		},

		components: {
			'v-recommend-list': productList
		},

		created(){
			this.$on('get-cart-quantity', () => {
				this.getCarNumber();
			})
		},

		computed: mapState({
			user: state => state.auth.user,
			cartNumber: state => state.tabBar.cartNumber
		}),

		mounted(){
			// 计算内容高度
		    this.$nextTick( () => {
		    	this.target = document.querySelector('.ui-recommend-body');
		    	let totalHeight = 45;
				const target = this.target;
		    	this.utils.fillTheScreen({target, totalHeight});
		    });
		},

		methods: {
			...mapMutations({
				setCartNumber: 'setCartNumber'
			}),
			/*
			 *  getCarNumber: 获取购物车数量
			 */
			getCarNumber() {
				cartQuantity().then(res => {
					if (res) {
						this.setCartNumber(res.quantity);
					}
				})
			},

			/*
				goBack: 返回到上一页
			 */
			goBack() {
				this.$router.go(-1);
			},

			/*
				recommendProductList: 获取相关商品列表
			 */
			recommendProductList() {
				let params = Object.assign({}, this.listParams, this.$route.params);
				recommendProductList(params.brand, params.category, params.shop, params.product, params.page, params.per_page).then(res => {
					if (res) {
						this.recommendList = this.recommendList.concat(res.products);
						this.isMore = res.paged.more;
					}
				})
			},

			/*
				getMore: 无限滚动
			 */
			getMore() {
				this.loading = true;
				this.listParams.page = ++this.listParams.page;
				if (this.isMore) {
					this.loading = false;
					this.recommendProductList(true);
				}
			},

			/*
			 *  goCart: 跳转到购物车
			 */
			goCart() {
				if (this.user) {
					this.$router.push({'name': 'cart', 'params': {type: 0}});
				} else {
					this.$router.push({'name': 'signin'});
				}
			}

		}
	}
</script>

<style lang='scss' scoped>
.recommend-wrapper {
	background-color: #ffffff;
	.ui-commmon-header {
		border-bottom: 1px solid #E8EAED;
		background-color: #ffffff;
		position: absolute;
		top: 0px;
		width: 100%;
		padding: 0px;
		span.cart-number {
			right: 15px;
		}
	}
	.ui-recommend-body {
		position: absolute;
		top: 45px;
		background-color: #ffffff;
		width: 100%;
		height: auto;
		overflow: auto;
	}
	.recommend-no-more {
		color: #7C7F88;
		font-size: 12px;
		padding: 0px;
		margin: 0px;
		text-align: center;
    padding: 10px 0px;
	}
}
</style>
