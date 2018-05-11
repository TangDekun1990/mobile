<template>
	<div class="cart-list-wrapper" v-bind:style="{'bottom': heigth + 'px'}">
		<div class="list" v-for="(item, index) in cartList">
			<div class="list-checkbox">
				<input type="checkbox" class='checkbox' :id='index' v-model="item.checked" @change="changeSingleStatu(item.checked, index)" :disabled="item.product.good_stock == 0" v-if="!isCheckedAll">
				<input type="checkbox" class='checkbox' :id='index' v-model="item.checked" @change="changeSingleStatu(item.checked, index)" v-if="isCheckedAll">
				<label :for="index"></label>
			</div>
			<div class="list-item" @click="goDetail(item.product.id)">
				<div class="item">
					<div class="ui-image">
						<img :src="item.product.photos[0].thumb" v-if='item.product.photos.length > 0'>
						<img src="../../../assets/image/change-icon/default_image_02@2x.png" v-if='item.product.photos.length <= 0'>
						<span v-if="item.product.good_stock == 0 " class='stock-info'>已售罄</span>
						<span v-if="item.product.good_stock > 0 && item.product.good_stock <= 10" class='stock-info'>仅剩{{ item.product.good_stock }}件</span>
						<span class="promos" v-if="item.product.activity && item.product.activity.display_time">促销</span>
					</div>
					<div class="list-info">
						<h3 v-bind:class="{'disabled-list': item.product.good_stock == 0}"> {{ item.product.name}}</h3>
						<h3 class="property-info">{{ item.property}}</h3>
						<div class="info-price">
							<p v-bind:class="{'disabled-list': item.product.good_stock == 0}">AED {{ item.product.current_price }}</p>
							<div class="ui-number">
								<div class="reduce ui-common" @click.stop="reduceNumber(item.id, item.amount, index)" v-bind:class="{'reduce-opacity':  item.amount <= 1}">-</div><input type="number" min="1" class="number" value="1" v-model="item.amount" readonly="true"><div class="add ui-common" @click.stop="addNumber(item.id, item.amount, item.product.good_stock, index)">+</div>
							</div>
						</div>
					</div>
				</div>
				<p class="list-promotion-info" v-if='item.product.promos && item.product.promos.length > 0' v-for="(key, value) in item.product.promos" :key="value"><span>{{key.name}}</span>{{key.promo}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { orderPrice } from '../../../api/network/order';
import { cartGet, cartDelete, cartUpdate} from '../../../api/network/cart'
import { productValidate } from '../../../api/network/product'

export default {
	data() {
		return {
				cartList: [], //购物车列表
				indicator: { spinnerType: 'fading-circle'},
				orderprice: [], // 购物车总价
				total_amount: 0, //购物车数量
				promosIds: []  //促销信息IDS
			}
	},

	created(){
		this.getCartList(true);
	},

	props: {
		isCheckedAll: {
			type: Boolean,
			default: false
		},
		heigth: {
			type: Number,
			default: 44
		}
	},

	mounted() {

	},

	methods: {
		...mapMutations({
			getAmount: 'calculationAmount',
			getPrice: 'calculationPrice'
		}),

		/*
		 * getCartList: 获取购物车列表
		 */
		 getCartList(value){
		 	cartGet().then(res => {
		 		if (res && res.goods_groups.length > 0) {
		 			this.cartList = Object.assign([], res.goods_groups[0].goods);
		 			this.addChecked(value);
		 			this.renderCart();
		 		} else {
		 			this.cartList = [];
		 		}
		 		this.$parent.$emit('list-is-empty', this.cartList);
		 	})
		 },

		/*
		 * addChecked: 为每个商品添加checked 属性
		 * @param: isSelectedall 是否选中商品 Boolean
		 */
		 addChecked(isSelectedall) {
		 	let list = this.cartList;
		 	for (let i = 0, len = list.length-1; i <= len; i++ ) {
		 		if (list[i].product.good_stock == 0 && !this.isCheckedAll) {
		 			list[i].checked = false;
		 		} else {
		 			list[i].checked = isSelectedall;
		 		}
		 	}
		 	this.cartList = Object.assign([], list);
		 },

		/*
		 *  updateList: 加减之后更新列表
		 */
		 updateList(index) {
		 	cartGet().then(res => {
		 		if (res && res.goods_groups.length > 0) {
		 			Indicator.close();
		 			let data = res.goods_groups[0].goods;
		 			this.cartList[index].amount = data[index].amount;
		 			this.renderCart();
		 		}
		 	})
		 },

		/*
		 *  renderCart: 修改商品数量和点击是否选中后 重新计算商品价格和数量
		 */
		 renderCart() {
		 	let data = this.cartList;
		 	this.total_amount = 0;
		 	this.orderprice = [];
		 	this.promosIds = [];
		 	for (let i = 0, len = data.length; i <= len-1; i++) {
		 		if (data[i].checked) {
		 			let obj = {'goods_id': data[i].product.id, 'property': [], 'num': data[i].amount};
		 			if (data[i].attrs) {
		 				obj.property = data[i].attrs.split(',');
		 			}
		 			this.orderprice.push(obj);
		 			this.promosIds.push(data[i].id);
		 			this.total_amount += data[i].amount;
		 		}
		 	}
		 	this.$parent.$emit('get-promos-data', this.promosIds);
		 	this.getOrderPrice();
		 },

		/*
		 *  getOrderPrice 获取购物车价格
		 */
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
		 		this.getPrice(0.00);
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

		/*
		 * deleteSelected: 删除购物车数据
		 */
		 deleteSelected() {
		 	let data = this.cartList,
		 	deleteGoods = [];
		 	this.promosIds = [];
		 	for (let i = 0, len = data.length; i <= len-1; i++) {
		 		if (data[i].checked) {
		 			deleteGoods.push(data[i].id);
		 			this.promosIds.push(data[i].id);
		 		}
		 	}
		 	if (deleteGoods.length > 0) {
		 		deleteGoods = JSON.stringify(deleteGoods);
		 	} else {
		 		Toast('当前没有可删除的商品');
		 		return;
		 	}
		 	Indicator.open();
		 	cartDelete(deleteGoods).then(res => {
		 		if (res) {
		 			this.getCartList(false);
		 			Indicator.close();
		 		}
		 	})
		 },

		/*
		 *  changeSingleStatu: 改变单个商品是否选中的状态, 然后重新获取商品的件数和价格
		 *  @param ： state 选中的状态
		 *  @param: index 当前改变的商品的index
		 */
		 changeSingleStatu(state, index) {
		 	let data = this.cartList,
		 	length = 0,
		 	status = false;
		 	for (let i = 0, len = data.length-1; i <= len; i++ ) {
		 		if (data[i].checked) {
		 			length = length+1;
		 		}
		 	}
		 	if (length == data.length) {
		 		status = true;
		 	} else {
		 		status = false;
		 	}
		 	this.$parent.$emit('change-footer-status', status);
		 	if (!this.isCheckedAll) {
		 		this.renderCart();
		 	}
		 },

		/*
		 *  reduceNumber: 数量减少
		 *  @param: id 当前减少的商品id
		 *  @param: amount 数量
		 *  @param： index 当前减少的index
		 */
		 reduceNumber(id, amount, index) {
		 	if (amount > 1) {
		 		amount--;
		 		this.updateCartQuantity(id, amount, index);
		 	} else {
		 		Toast({
		 			message: '受不了了， 宝贝不能再少了'
		 		});
		 	}
		 },

		/*
		 *  addNumber: 数量增加
		 *  @param: id 当前减少的商品id
		 *  @param: amount 数量
		 *  @param: stock 库存
		 *  @param： index 当前减少的index
		 */
		 addNumber(id, amount, stock, index) {
		 	if (amount <= stock) {
		 		amount++;
		 		this.updateCartQuantity(id, amount, index);
		 	} else {
		 		Toast({
		 			message: '该商品总库存不足'
		 		});
		 	}
		 },

		/*
		 * updateCartQuantity: 商品数量加减更新数
		 * @param: id 当前减少的商品id
		 * @param: amount 数量
		 * @param： index 当前操作的商品的index
		 */
		 updateCartQuantity(id, amount, index) {
		 	cartUpdate(id, amount).then( res => {
		 		if (res) {
		 			Indicator.open(this.indicator);
		 			this.updateList(index);
		 		}
		 	}, (error) => {
		 		Toast(error.errorMsg);
		 	});
		 },

		/*
		 *  goDetail: 跳转到详情
		 */
		goDetail(id) {
		  this.$router.push({'name': 'detail', 'params': {'id': id}});
		},

		/*
		 *productValidate: 结算时判断
		 */
		productValidate() {
			let data = this.cartList;
			let validate = [];
			for (let i = 0; i <= data.length-1; i++) {
				let obj = {'product_id': data[i].product.id, 'property': [], 'product_number': data[i].amount};
				if (data[i].attrs) {
					obj.property = data[i].attrs.split(',');
				}
				if (data[i].checked) {
		 			validate.push(obj);
		 		}
			}
			if (validate.length > 0) {
				productValidate(JSON.stringify(validate)).then( res => {
					if (res) {
						if (res.is_valid) {
							this.$router.push('/checkout')
						}
					}
				}, error => {
					Toast(error.errorMsg)
				});
			}
		}
	}
}
</script>

<style lang='scss' scoped>
.cart-list-wrapper {
	overflow-y: auto;
	position: fixed;
	width: 100%;
	bottom: 44px;
	top: 44px;
	margin-top: 8px;
	margin-bottom: 10px;
	.list {
		background-color: #fff;
		padding:12px;
		border-bottom: 1px solid #E8EAED;
		display: flex;
		align-content: center;
		align-items: center;
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
				margin: 0px;
				opacity: 0;
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
		.list-item {
			display: flex;
			width: 100%;
			flex-direction: column;
			div.item {
				display: flex;
				width: 100%;
				div.ui-image{
					flex-shrink: 0;
				    width: 90px;
				    height: 90px;
				    flex-basis: 90px;
					img {
						width: 100%;
						height: 100%;
						border: 1px solid #E8EAED;
						border-radius: 3px;
					}
					span.promos {
						position: absolute;
						background: url('../../../assets/image/change-icon/label@2x.png') no-repeat;
						width: 36px;
						height: 19px;
						color: #FFFFFF;
						font-size: 10px;
						top: 12px;
						/* left: 0px; */
						background-size: cover;
						font-weight: 100;
						line-height: 19px;
						text-align: left;
						padding-left: 5px;
					}
					span.stock-info{
						position: absolute;
						height:20px;
						background:rgba(243,244,245,1);
						line-height: 20px;
						text-align: center;
						font-size:14px;
						color:rgba(242,48,48,1);
						width: 100%;
						bottom: 0px;
						left: 0px;
					}
				}
				div.list-info {
					margin-left: 10px;
					width: 100%;
					display: flex;
				    flex-direction: column;
				    align-content: center;
				    justify-content: space-between;
					h3{
						font-size:14px;
						color:rgba(78,84,93,1);
						padding: 0px;
						margin: 0px;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						&.disabled-list {
							color: #A4AAB3;
						}
					}
					h3.property-info{
						font-size: 12px;
    					color: #7C7F88;
					}
					div.info-price {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-content: flex-end;
						align-items: flex-end;
						p {
							font-size:17px;
							color:rgba(242,48,48,1);
							padding: 0px;
							margin: 0px;
							display: inline-block;
							&.disabled-list {
								color: #A4AAB3;
							}
						}
					}
					div.ui-number{
						height: 24px;
						display: flex;
						border-radius: 3px 0px 0px 3px;
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
							border: 1px solid #C7C7CD;
							cursor: pointer;
						}
						.reduce {
							border-right: 0px;
						}
						.reduce-opacity {
							opacity:0.4;
						}
						.add {
							border-left: 0px;
						}
						input[type='number'] {
							width: 26px;
							border: 1px solid #C7C7CD;
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
			p.list-promotion-info {
				margin-top: 12px;
				padding: 8px 0px;
				line-height: auto;
				font-size:10px;
				color: #000;
				background: #F8F8F8;
				width: 100%;
				span {
					border: 1px solid #FC2E39;
					padding: 1px 4px;
					border-radius: 2px ;
					font-size:10px;
					color:rgba(252,46,57,1);
					margin: 0px 10px;
					text-align: center;
				}
			}
		}
	}
}
.has-bottom {
	bottom: 94px;
}
</style>
