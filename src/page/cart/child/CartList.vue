<template>
	<div class="cart-list-wrapper">
		<p class="none-selected-all">{{ isSelectedAll }}</p>
		<div class="list" v-for="(item, index) in cartList">
			<div class="list-checkbox">
				<input type="checkbox" class='checkbox' :id='index' v-model="item.checked" @change="changeCart()" v-if='!isShowHeader'>
				<input type="checkbox" class='checkbox' :id='index' v-model="item.checked" v-if='isShowHeader'>
				<label :for="index"></label>
			</div>

			<img :src="item.product.photos[0].thumb" v-if='item.product.photos.length > 0'>
			<img src="../../../assets/image/change-icon/default_image_02@2x.png" v-if='item.product.photos.length <= 0'>

			<div class="list-info">
				<h3> {{ item.product.name}}</h3>
				<div class="info-price">
					<p>AED {{ item.product.current_price }}</p>
					<div class="ui-number">
						<div class="reduce ui-common" @click="reduceNumber(item.id, item.amount, index)">-</div><input type="number" min="1" class="number" value="1" v-model="item.amount" readonly="true"><div class="add ui-common" @click="addNumber(item.id, item.amount, item.product.good_stock, index)">+</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';

	import { orderPrice } from '../../../api/network/order';
	import { getCartGroup, updateCartQuantity, getCartPromos} from '../../../api/network/cart'
	export default {
		data() {
			return {
				cartList: [],
				updateGoods: {},
				indicator: {
					spinnerType: 'fading-circle'
				},
				orderprice: [], // 总价
				promos: [],  //购物车促销信息
				total_amount: 0 //购物车数量
			}
		},
		created(){
			this.getCartList(true);
		},
		computed:{
			...mapState({
				isSelectedAll: state => state.cart.isSelectedAll,
				saveCartList: state => state.cart.saveCartList,
				isShowHeader: state => state.cart.isShowHeader
			})
		},
		watch: {
			isSelectedAll: function(value) {
				this.selectCartList(value);
			}
		},
		methods: {
			...mapMutations({
				getAmount: 'calculationAmount',
				getPrice: 'calculationPrice',
				saveCartData: 'saveCartData'
			}),

			// 获取购物车列表
			/*
			isUpdate: 数量加减之后关闭loading
			value: 是否需要改变checkbox的值
			isMerg: 是否需要合并两个数组
			 */
			getCartList(value){
				this.cartList = [];
				getCartGroup().then(res => {
					if (res && res.goods_groups.length > 0) {
						this.cartList = Object.assign([], res.goods_groups[0].goods, this.cartList);
						this.selectCartList(value);
						this.renderCart();
						this.saveCartData(this.cartList);
					}
				})
			},

			//加减之后更新列表
			updateList(index ) {
				getCartGroup().then(res => {
					if (res && res.goods_groups.length > 0) {
						Indicator.close();
						let data = res.goods_groups[0].goods;
						this.cartList[index].amount = data[index].amount;
						this.renderCart();
						this.saveCartData(this.cartList);
					}
				})
			},

			//
			getMergData(data) {

				for (let i = 0, len = data.length; i <= len -1; i++) {

					for (let j = 0; j <= this.cartList.length-1; j++) {

						if (data[j].id == this.cartList[i].id) {

							// this.cartList[i].checked = [j].checked;
							this.cartList[j].amount = data[i].amount;
						}
					}
				}
			},

			// 数量减少
			reduceNumber(id, amount, index) {
				if (amount > 1) {
					Indicator.open(this.indicator);
					amount--;
					this.updateCartQuantity(id, amount, index);
				} else {
					Toast({
						duration:1000,
						message: '受不了了， 宝贝不能再少了'
					});
				}
			},

			// 数量增加
			addNumber(id, amount, stock, index) {
				if (amount <= stock) {
					Indicator.open(this.indicator);
					amount++;
					this.updateCartQuantity(id, amount, index);
				} else {
					Toast({
						duration:1000,
						message: '该商品总库存不足'
					});
				}
			},

			//  商品数量加减更新数量
			updateCartQuantity(id, amount, index) {
				let params = {'good': id, 'amount': amount};
				updateCartQuantity(params).then( res => {
					if (res) {
						this.updateList(index);
					}
				});
			},

			// 商品是否全选
			selectCartList(isselected) {
				for (let i = 0, len = this.cartList.length; i <= len-1; i++) {
					this.cartList[i].checked = isselected;
				}
				this.saveCartData(this.cartList);
			},

			// 获取商品价格
			getOrderPrice(){
				let params = {
					'shop': null,
					'order_product':'',
					'consignee':null,
					'shipping':null,
					'coupon': null,
					'cashgift':null,
					'score': null
				};
				if (this.orderprice.length > 0 ) {
					params.order_product = JSON.stringify(this.orderprice);
				} else {
					this.getAmount(0);
					this.getPrice(0);
					return;
				}
				orderPrice(params.shop, params.order_product, params.consignee, params.shipping, params.coupon, params.cashgift, params.score).then(res => {
					if (res) {
						let price = res.order_price.total_price;
						this.getAmount(this.total_amount);
						this.getPrice(price);
					}
				})
			},

			// 点击是否选中重新计算商品价格和数量
			renderCart() {
				let data = this.cartList;
				this.total_amount = 0;
				this.promos = [];
				this.orderprice = [];
				for (let i = 0, len = data.length; i <= len-1; i++) {
					if (data[i].checked) {
						this.orderprice.push({'goods_id': data[i].product.id, 'property': [], 'num': data[i].amount});
						this.promos.push(data[i].id);
						this.total_amount += data[i].amount;
					}
				}
				this.getOrderPrice();
			},

			// 点击复选框改变价格和数量
			changeCart() {
				this.renderCart();
				this.saveCartData(this.cartList);
			}
		}
	}
</script>

<style lang='scss' scoped>
	.cart-list-wrapper {
		overflow: auto;
		position: absolute;
	    width: 100%;
	    bottom: 44px;
	    top: 44px;
		p.none-selected-all {
			display: none;
		}
		.list {
			display: flex;
			/*justify-content: space-around;*/
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
					/*height: 20px;*/
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
			}
			img {
				width: 90px;
				height: 90px;
				flex-shrink: 0;
				flex-basis: 90px;
				border: 1px solid #E8EAED;
				border-radius: 3px;
			}
			div.list-info {
				margin-left: 5px;
				height: 90px;
				width: 100%;
				position: relative;
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
					position: absolute;
    				bottom: 0px;
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
