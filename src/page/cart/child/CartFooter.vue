<!-- CartFooter.vue -->
<template>
	<div class="ui-cart-footer" v-bind:class="{'has-bottom': issShowTabbar}">
		<div class="list-checkbox">
			<input type="checkbox" class='checkbox' id='checkbox-all' v-model="isSelected" @change="selectedAll(isSelected)">
			<label for="checkbox-all"></label>
			<i v-if='isCheckedAll'>全选</i>
			<i v-if='!isCheckedAll' class="total-price">合计<span>AED {{ total_price }} </span></i>
		</div>
		<span class="cart-footer-btn" v-if='isCheckedAll' @click="deleteSelected()">删除</span>
		<span class="cart-footer-btn" v-if='!isCheckedAll' @click="checkout">结算({{total_amount }})</span>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				isSelected: true,
				deleteGoods: []
			}
		},
		computed: mapState({
			total_amount: state => state.cart.total_amount,
			total_price: state => state.cart.total_price
		}),

		props:{
			isCheckedAll: {
				type: Boolean,
				default: false
			},
			issShowTabbar: {
				type: Number,
				default: 0
			},
			isStatus: {
				type: Boolean,
				default: true
			}
		},

		watch: {
			isCheckedAll: function(value) {
				this.isSelected = !value;
			},

			isStatus: function(value) {
				this.isSelected = value;
			}
		},

		methods: {
			/*
			 *  selectedAll: 底部全选按钮的状态
			 *  @param: value 底部全选按钮的值
			 */
			selectedAll(value) {
				this.$parent.$emit('cart-bottom-status', {'isCheckAll': value});
			},

			/*
			 *  deleteSelected: 删除购物车商品
			 */
			deleteSelected() {
				this.$parent.$emit('update-cart-list', {'isdelete': true});
			},
			/*
			 *  checkout: 结算
			 */
			checkout() {
				if (this.total_price < 30) {
					Toast('30元起送');
					return;
				}
				this.$router.push('/checkout')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-cart-footer {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-content:center;
		align-items: center;
		height: 44px;
		background:rgba(255,255,255,1);
		border-bottom: 1px solid #E8EAED;
		padding-left: 12px;
		bottom: 0px;
    	position: absolute;
    	width: -webkit-fill-available;
		.list-checkbox {
			flex-shrink: 0;
			position: relative;
			margin-right: 5px;
			height: 44px;
			line-height: 44px;
			label {
				position: absolute;
				top: 12px;
				left: 0px;
				width: 20px;
				height: 20px;
				display: inline-block;
				background: url('../../../assets/image/change-icon/choice@2x.png') no-repeat;
				background-size: cover;
			}
			input {
				position: relative;
				// width: 20px;
				margin: 0px;
				z-index: -999;
				background-color: #fff;
				&:checked + label {
					background: url('../../../assets/image/change-icon/multi_sel@2x.png') no-repeat;
					background-size: cover;
					width: 20px;
					height: 20px;
				}
				&:focus {
					outline-offset: 0px;
				}
			}
			i{
			    padding-left: 12px;
			    font-style: normal;
			    font-size:14px;
				font-family:'PingFangSC-Regular';
				color:rgba(41,43,45,1);
				&.total-price span {
					color:rgba(231,1,14,1);
				}
			}
		}
		span.cart-footer-btn {
			width:150px;
			height:44px;
			background:rgba(242,48,48,1);
			display: inline-block;
			font-size:16px;
			font-family:'PingFangSC-Regular';
			color:rgba(255,255,255,1);
			line-height: 44px;
			text-align: center;
			cursor: pointer;
			font-weight: normal;
		}
	}
	.has-bottom {
		bottom: 50px;
	}
</style>
