<template>
	<div class="cart-list-wrapper">
		<div class="list">
			<div class="list-checkbox">
				<input type="checkbox" id='checkbox1'>
				<label for="checkbox1"></label>
			</div>
			<img src="../../../assets/image/change-icon/c7_commodity_list_3@2x.png">
			<div class="list-info">
				<h3>山东有机大蒜 500g 袋装 单颗约50g山东有机大蒜 500g 袋装 单颗约50g山东有机大蒜 500g 袋装 单颗约50g山东有机大蒜 500g 袋装 单颗约50g</h3>
				<div class="info-price">
					<p>AED 12467.53</p>
					<div class="ui-number">
						<div class="reduce ui-common">-</div><input type="number" min="1" class="number" value="1" v-model="number"><div class="add ui-common">+</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getCartTotal, getCartGroup, deleteCart, updateCartQuantity, clearCart, getCartPromos, checkoutCart} from '../../../api/network/cart'
	export default {
		data() {
			return {
				number: 1,
				cartList: []
			}
		},
		methods: {
			getCartList(){
				getCartGroup().then(res => {
					if (res) {
						this.cartList = res.goods_groups[0].goods;
					}
				})
			},
		}
	}
</script>

<style lang='scss' scoped>
	.cart-list-wrapper {
		display: relative;
		height: 100%;
		.list {
			display: flex;
			justify-content: space-around;
			align-content: center;
			align-items: center;
			background-color: #fff;
			padding:12px;
			border-bottom: 1px solid #E8EAED;
			div.list-checkbox {
				width: 20px;
				height:20px;
				flex-basis: 20px;
				flex-shrink: 0;
				position: relative;
				margin-right: 5px;
				label {
					position: absolute;
					top: 0px;
					width: 20px;
					height: 20px;
					display: inline-block;
					background: url('../../../assets/image/change-icon/choice@2x.png') no-repeat;
					background-size: cover;
				}
				input {
					position: relative;
					width: 20px;
					height: 20px;
					margin: 0px;
					z-index: -999;
					&:checked + label {
						background: url('../../../assets/image/change-icon/multi_sel@2x.png') no-repeat;
						background-size: cover;
						width: 20px;
						height: 20px;
					}
				}
			}
			img {
				width: 70px;
				height: 70px;
				flex-shrink: 0;
				flex-basis: 70px;
				border: 1px solid #E8EAED;
				border-radius: 3px;
			}
			div.list-info {
				margin-left: 5px;
				h3{
					font-size:14px;
					font-family:'PingFangSC-Regular';
					color:rgba(78,84,93,1);
					padding: 0px;
					margin: 0px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				div.info-price {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-content: center;
					align-items: center;
					margin-top: 18px;
					p {
						font-size:17px;
						font-family:'PingFangSC-Regular';
						color:rgba(242,48,48,1);
						line-height:17px;
						padding: 0px;
						margin: 0px;
						display: inline-block;
					}
				}
				div.ui-number{
					height: 24px;
					display: flex;
					input, div {
						height: 24px;
						text-align: center;
						color: #404245;
						display: inline-block;
						padding: 0px;
						margin:  0px;
						border:  0px;
						outline-offset: 0px;
					}
					.ui-common {
						line-height: 24px;
						width: 26px;
						height: 24px;
						border:  1px solid #404245;
						cursor: pointer;
					}
					.reduce {
						opacity:0.4;
						border-right: 0px;
					}
					.add {
						border-left: 0px;
					}
					input[type='number'] {
						width: 26px;
						border: 1px solid #404245;
						border-radius: 0px;
						border-image-width: 0px;
						box-shadow: 0px;
						vertical-align: bottom;
						&:focus {
							outline: none;
						}
					}
				}
			}
		}
	}
</style>
