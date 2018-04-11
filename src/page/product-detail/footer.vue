<!-- footer.vue -->
<template>
	<div class="ui-detail-footer" v-if="detailInfo">

		<div class="footer-flex">
			<div class="left">
				<img src="../../assets/image/change-icon/b0_cart@2x.png" v-on:click='goCart()'>
				<span class="icon" v-if='quantity > 0'>{{ quantity }}</span>
				<div class="price">
					<span>AED {{ detailInfo.current_price }}</span>
					<span>AED {{ detailInfo.price }}</span>
				</div>
			</div>
			<!-- v-bind:class="{'disabled-cart': quantity <= 0, 'active-cart': quantity > 0}" -->
			<div class="right" v-on:click="addShopping(true)" v-bind:class="{'disabled-cart': detailInfo.good_stock <= 0, 'active-cart': detailInfo.good_stock > 0}">加入购物车</div>
		</div>

		<shopping v-if='isShowcartInfo'></shopping>

		<!-- 加入购物车显示动画 -->
		<div class="ui-cart-animation" v-if='isAnimation'>
			<mt-spinner type="snake" color='rgb(239,51,56)'></mt-spinner>
		</div>

	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import shopping from './child/Shopping';
	import { getCartTotal } from '../../api/network/cart';

	export default {
		data() {
			return {
				isAnimation: false,  //加入购物车成功之后是否显示动画
				quantity: 0  //购物车总数
			}
		},

		components: {
			shopping
		},

		computed: mapState({
			//是否显示购物车浮层
			isShowcartInfo: state => state.detail.isShowcartInfo,
			detailInfo: state => state.detail.detailInfo
		}),

		created(){
			this.getShoppingTotal();
			this.$on('start-addcart-animation', () => {
				this.isAnimation = true;
			});
			this.$on('end-addcart-animation', () => {
				this.isAnimation = false;
				this.saveCartState(false);
				this.hideCommodity(false);
				this.getShoppingTotal();
			});
		},

		methods: {
			...mapMutations({
				saveCartState: 'saveCartState',
				hideCommodity: 'setIsHideCommodity'
			}),

			// 加入购物车
			addShopping(value) {
				this.saveCartState(value);
			},

			// 获取购物车总数
			getShoppingTotal() {
				getCartTotal().then(res => {
					if (res) {
						this.quantity = res.quantity;
					}
				})
			},

			// 购物车
			goCart() {
				this.$router.push({'name':'cart'});
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-detail-footer {
		background:rgba(255,255,255,1);
		box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
		width: auto;

		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 1;

		.footer-flex {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			height:50px;
		}
		div.left{
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
				/*padding: 0px 10px;*/
				flex-shrink: 0;
			}
			span.icon {
				position: absolute;
			    left: 20px;
			    top: 11px;
			    font-size: 10px;
			    font-family: 'HelveticaNeue';
			    line-height: 14px;
			    width: 18px;
			    height: 14px;
			    background: rgba(239,51,56,1);
			    border-radius: 20px;
			    text-align: center;
			    color: #fff;
			}
			div.price {
				padding-left: 15px;
				border-left: 1px solid #E8EAED;
				span {
					display: block;
					font-weight: normal;
					&:first-child {
						font-size:16px;
						font-family:'HelveticaNeue';
						color:rgba(239,51,56,1);
						line-height:20px;
					}
					&:last-child {
						font-size:12px;
						font-family:'HelveticaNeue';
						color:rgba(164,170,179,1);
						line-height:20px;
						text-decoration: line-through;
					}
				}
			}
		}
		div.right {
			width:120px;
			height:50px;
			font-size:16px;
			font-family:'PingFangSC-Regular';
			color:rgba(255,255,255,1);
			text-align: center;
			line-height: 50px;
			cursor: pointer;
			&.disabled-cart {
				background:rgba(199,199,205,1);
			}
			&.active-cart {
				background:rgba(239,51,56,1);
			}
		}
	}
	.ui-cart-animation {
		position: fixed;
	    top: 50%;
	    left: 50%;
	}
</style>
