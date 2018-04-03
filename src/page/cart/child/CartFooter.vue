<!-- CartFooter.vue -->
<template>
	<div class="ui-cart-footer">
		<div class="list-checkbox">

			<input type="checkbox" class='checkbox' id='checkbox-all' v-model="isSelected" @change="selectedAll(isSelected)">
			<label for="checkbox-all"></label>
			<i v-if='isShowHeader'>全选</i>
			<i v-if='!isShowHeader' class="total-price">合计<span>AED {{ total_price }} </span></i>
		</div>
		<span class="cart-footer-btn" v-if='isShowHeader' @click="deleteSelected()">删除</span>
		<span class="cart-footer-btn" v-if='!isShowHeader'>结算({{total_amount }})</span>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';

	import { deleteCart, checkoutCart} from '../../../api/network/cart'
	export default {
		data() {
			return {
				isSelected: true,
				deleteGoods: []
			}
		},
		computed: mapState({
			isSelectedAll: state => state.cart.isSelectedAll,
			isShowHeader: state => state.cart.isShowHeader,
			total_amount: state => state.cart.total_amount,
			total_price: state => state.cart.total_price,
			saveCartList: state => state.cart.saveCartList
		}),
		watch: {
			// isSelected: function(value) {
			// 	this.selectedAll(value)
			// },
			isSelectedAll: function (value) {
				this.isSelected = value;
			}
		},
		methods: {
			...mapMutations({
				changedAll: 'changedSelectedAll',
				saveCartData: 'saveCartData'
			}),
			selectedAll(value) {
				this.$parent.$emit('redener-cart-price');
				this.changedAll(value);
			},

			//删除
			deleteSelected() {
				let data = this.saveCartList;
				for (let i = 0, len = data.length; i <= len-1; i++) {
					if (data[i].checked) {
						this.deleteGoods.push(data[i].id);
					}
				}
				let params = {'good': (this.deleteGoods)};
				if (this.deleteGoods.length > 0) {
					params.good = JSON.stringify(params.good);
				} else {
					Toast('当前没有可删除的商品');
					return;
				}
				Indicator.open();
				deleteCart(params).then(res => {
					if (res) {
						this.$parent.$emit('redener-cart-list', false);
						// this.updateCartList();
						Indicator.close();
					}
				})
			},

			// 删除之后更新购物车列表
			updateCartList() {
				let data = this.saveCartList;
				for (let i = 0, len = data.length; i <= len-1; i++) {
					for (let j = 0; j <= this.deleteGoods.length-1; j++) {
						if (data[i].id == this.deleteGoods[j]) {
							data.splice(i, 1);
						}
					}
				}
				this.saveCartData(data);
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
		box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
		padding-left: 12px;
		bottom: 0px;
    	position: absolute;
    	width: -webkit-fill-available;
		.list-checkbox {
			// width: 20px;
			// height:20px;
			// flex-basis: 20px;
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
</style>
