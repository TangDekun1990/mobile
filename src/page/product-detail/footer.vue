<!-- footer.vue -->
<template>
	<div class="ui-detail-footer" v-if="detailInfo" v-bind:class="{'hidden-cart-footer': ispromotion, 'show-cart-footer': !ispromotion}">

		<div class="footer-flex">
			<div class="left">
				<img src="../../assets/image/change-icon/b0_cart@2x.png" v-on:click='goCart()'>
				<span class="icon" v-if="cartNumber <= 100 && cartNumber > 0">{{ cartNumber }}</span>
				<span class="icon" v-if="cartNumber >= 100  && cartNumber > 0 ">99+</span>
				<div class="price">
					<span>AED {{ detailInfo.current_price }}</span>
					<span>AED {{ detailInfo.price }}</span>
				</div>
			</div>
			<div class="right active-cart" v-on:click="addShopping(true)" v-if='detailInfo.good_stock > 0'>加入购物车</div>
			<div class="right disabled-cart" v-if='detailInfo.good_stock <= 0'>加入购物车</div>
		</div>
		<p class="good-stock-none" v-if='detailInfo.good_stock <= 0'>所选产品暂时无货，非常抱歉！</p>

		<shopping v-if='isShowcartInfo' :isShowcartInfo="isShowcartInfo"></shopping>

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
				isAnimation: false  //加入购物车成功之后是否显示动画
			}
		},

		components: {
			shopping
		},

		props: {
			ishidefooter: {
				type: Boolean,
				default: false
			}
		},

		computed: mapState({
			//是否显示购物车浮层
			isShowcartInfo: state => state.detail.isShowcartInfo,
			detailInfo: state => state.detail.detailInfo,
			isOnline: state => state.auth.isOnline,
			ispromotion: state => state.detail.ispromotion,
			cartNumber: state => state.tabBar.cartNumber
		}),

		created(){
			this.$on('start-addcart-animation', () => {
				this.isAnimation = true;
			});
			this.$on('end-addcart-animation', () => {
				this.isAnimation = false;
				this.saveCartState(false);
			});
		},

		methods: {
			...mapMutations({
				saveCartState: 'saveCartState',
				changeType: 'changeType'
			}),

			// 加入购物车
			addShopping(value) {
				this.saveCartState(value);
				this.changeType('确定');
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
				if (this.isOnline) {
					this.$router.push({'name':'cart', 'params': {type: 0}});
				} else {
					this.$router.push({'name': 'signin'});
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-detail-footer {
		background:rgba(255,255,255,1);
		border-top: 0.5px solid #e8eaed;
		width: auto;
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 0;
		&.hidden-cart-footer {
			display: none;
		}

		&.show-cart-footer {
			display: block;
		}

		.footer-flex {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			height:50px;
		}
		p.good-stock-none {
			width:100%;
			height:32px;
			background:rgba(216,216,216,1);
			opacity:0.5;
            font-size:14px;
            color:rgba(78,84,93,1);
            line-height:20px;
            position: absolute;
            text-align: center;
            line-height: 32px;
            padding: 0px;
            margin: 0px;
            bottom: 50px;
		}
		div.left{
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
				flex-shrink: 0;
				margin: 10px;
			}
			span.icon {
				position: absolute;
			    left: 20px;
			    top: 11px;
			    font-size: 10px;
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
				border-left: 0.5px solid #E8EAED;
				height: 50px;
			    line-height: 50px;
			    display: flex;
			    flex-direction: column;
			    justify-content: center;
				span {
					display: block;
					font-weight: normal;
					&:first-child {
						font-size:16px;
						color:rgba(239,51,56,1);
						line-height:20px;
					}
					&:last-child {
						font-size:12px;
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
