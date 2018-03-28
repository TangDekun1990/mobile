<!-- footer.vue -->
<template>
	<div class="ui-detail-footer">
		<div class="footer-flex">
			<div class="left">
				<img src="../../../assets/image/change-icon/b0_cart@2x.png">
				<span class="icon">{{ quantity }}</span>
				<div class="price">
					<span>AED {{ productinfo.current_price }}</span>
					<span>AED {{ productinfo.price }}</span>
				</div>
			</div>
			<div class="right" v-on:click="addShopping()" v-bind:class="{'disabled-cart': quantity <= 0, 'active-cart': quantity > 0}">加入购物车</div>
		</div>

		<shopping v-if='showcart' :info="productinfo"></shopping>
	</div>
</template>

<script>
	import shopping from './Shopping';
	import { mapState } from 'vuex';
	import { mapMutations } from 'vuex';
	import { getCartTotal } from '../../../api/network/cart';
	export default {
		data() {
			return {
				quantity: 0
				// showcart: false
			}
		},
		components: {
			shopping
		},
		props: ['productinfo', 'showcart'],
		computed: mapState({
			showcart: state => state.detail.isShowcartInfo
		}),
		created(){
			this.saveCartState(false);
			this.getShoppingTotal();
			this.$on('close-add-shopping', (data) => {
				this.saveCartState(false);
				// this.showcart = false;
			});

			this.$on('start-addcart-animation', () => {
				this.isAnimation = true;
			});
			this.$on('end-addcart-animation', () => {
				this.isAnimation = false;
				this.getShoppingTotal();
			});
		},
		methods: {
			...mapMutations({
				saveCartState: 'saveCartState'
			}),
			addShopping() {
				this.saveCartState(true);
			},
			getShoppingTotal() {
				getCartTotal().then(res => {
					if (res) {
						this.quantity = res.quantity;
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	.ui-detail-footer {
		background:rgba(255,255,255,1);
		box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
		width: auto;
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
				padding: 0px 10px;
				/*box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1), -0.5px 0px 0px 0px rgba(232,234,237,1)*/
			}
			span.icon {
				position: absolute;
			    left: 28px;
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
</style>
