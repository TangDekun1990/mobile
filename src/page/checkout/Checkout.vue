<template>

  <div class="container">
    <mt-header class="header" title="确认订单">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="leftClick">
      </header-item>
      <header-item slot="right" title="联系客服" v-on:onclick="rightClick">
      </header-item>
    </mt-header>

    <checkout-address class="address" v-on:onclick="goAddress" v-bind:item="selectedAddress">
    </checkout-address>
    <checkout-goods class="goods section-header" v-on:onclick="goGoodsList" :items="cartGoods">
    </checkout-goods>
    <checkout-item class="item" title="配送方式" :subtitle="getShippingName" v-on:onclick="goShipping">
    </checkout-item>
    <checkout-item class="item section-header" title="送货时间" :subtitle="getSelectedDateStr" v-on:onclick="goDuration">
    </checkout-item>
    <checkout-item class="item section-header" title="发票类型" :subtitle="getInoviceTitle" v-on:onclick="goInvoice">
    </checkout-item>
    <checkout-item class="item section-header" title="优惠券" :subtitle="getCouponName" :tips="getCouponTips" v-on:onclick="goCouponList">
    </checkout-item>
    <checkout-comment ref="comment" class="comment section-header">
    </checkout-comment>
    <div class="desc section-header section-footer">
      <checkout-desc class="desc-item" title="商品金额" :subtitle="getOrderProductPrice">
      </checkout-desc>
      <checkout-desc class="desc-item" title="税额" :subtitle="getOrderTaxPrice">
      </checkout-desc>
      <checkout-desc class="desc-item" title="运费" :subtitle="getOrderShippingPrice">
      </checkout-desc>
      <checkout-desc class="desc-item" title="优惠券" :subtitle="getOrderDiscountPrice">
      </checkout-desc>
    </div>
    <div class="bottom-wrapper">
      <div class="amount-wrapper">
        <label class="amount">实付款: {{getOrderTotalPrice}}</label>
      </div>
      <button class="submit" @click="checkout">提交订单</button>
    </div>
    <delivery-time
      ref="timePicker"
      v-on:onClickDate="onClickDate"
      v-on:onClickTime="onClickTime">
    </delivery-time>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import CheckoutAddress from './child/CheckoutAddress'
import CheckoutGoods from './child/CheckoutGoods'
import CheckoutItem from './child/CheckoutItem'
import CheckoutComment from './child/CheckoutComment'
import CheckoutDesc from './child/CheckoutDesc'
import DeliveryTime from './DeliveryTime'
import { mapState, mapMutations, mapActions } from 'vuex'
import * as consignee from '../../api/network/consignee'
import * as order from '../../api/network/order'
import * as cart from '../../api/network/cart'
import { Toast, Indicator, MessageBox } from 'mint-ui'
export default {
	components: {
		CheckoutAddress,
		CheckoutGoods,
		CheckoutItem,
		CheckoutComment,
		CheckoutDesc,
		DeliveryTime,
	},
	data () {
		return {
			order_price: null
		}
	},
	computed: {
		...mapState({
			defaultAddress: state => state.address.defaultItem,
			selectedAddress: state => state.address.selectedItem,
			addressItems: state => state.address.items,
			selectedShipping: state => state.shipping.selectedItem,
			couponTotal: state => state.coupon.total,
			selectedCoupon: state => state.coupon.selectedItem,
			invoice: state => state.invoice,
			selectedDate: state => state.delivery.selectedDate,
			selectedTime: state => state.delivery.selectedTime,
			cartGoods: state => state.cart.saveCartList,
		}),
		// selectedAddress: function() {
		//   let item = this.selectedAddress
		//   if (item === null) {
		//     // 没有默认地址时，第一个地址为当前选中的地址
		//     if (this.defaultAddress === null) {
		//       let items = this.addressItems
		//       if (items && items.length) {
		//         this.selectAddressItem(items[0])
		//       }
		//     } else {
		//       this.selectAddressItem(this.defaultAddress)
		//     }
		//   }
		//   return this.selectedAddress
		// },
		// 获取订单商品数组(计算价格/获取货运公司列表)
		getOrderProducts: function () {
			let cartGoods = this.cartGoods
			let orderProducts = []
			if (cartGoods && cartGoods.length) {
				orderProducts = cartGoods.map(function (cardGood) {
					return {
						goods_id: cardGood.product ? cardGood.product.id : '',
						property: cardGood.attrs,
						num: cardGood.amount,
					}
				})
			}
			return orderProducts
		},
		// 获取购物车货品id数组
		getCartGoodsIds: function () {
			let cartGoods = this.cartGoods
			let goodsIds = []
			if (cartGoods && cartGoods.length) {
				goodsIds = cartGoods.map(function (cardGood) {
					return cardGood.id
				})
			}
			return goodsIds
		},
		getShippingName: function () {
			let name = ''
			let item = this.selectedShipping
			if (item && item.name) {
				name = item.name
			}
			return name
		},
		getCouponName: function () {
			let name = ''
			let coupon = this.selectedCoupon
			if (coupon && coupon.name) {
				name = coupon.name
			} else {
				name = '未使用'
			}
			return name
		},
		getCouponTips: function () {
			let tips = ''
			let coupon = this.selectedCoupon
			if (coupon) {
				tips = '已选1张'
			} else {
				let total = this.couponTotal
				tips = total + '张可用'
			}
			return tips
		},
		getInoviceTitle: function () {
			let title = ''
			if (this.invoice.isSave) {
				if (!this.getInoviceToggle) {
					if (this.invoice.type && this.invoice.type.name) {
						title = this.invoice.type.name
					}
				} else {
					title = '不要发票'
				}
			} else {
				title = '请选择发票类型'
			}
			return title
		},
		getInoviceToggle: function () {
			return this.invoice.toggle
		},
		getSelectedDateStr: function () {
			let str = ''
			let date = this.selectedDate
			let time = this.selectedTime
			if (date && time) {
				str = date + ' ' +time
			}
			return str
		},
		getSelectedDateValue: function () {
			let str = ''
			let date = this.selectedDate
			let time = this.selectedTime
			if (date && time) {
				str = date + '/' +time
			}
			return str
		},
		getOrderTotalPrice: function () {
			return 'AED ' + this.getPriceByKey('total_price')
		},
		getOrderProductPrice: function () {
			return 'AED ' + this.getPriceByKey('product_price')
		},
		getOrderTaxPrice: function () {
			return 'AED ' + this.getPriceByKey('tax_price')
		},
		getOrderShippingPrice: function () {
			return 'AED ' + this.getPriceByKey('shipping_price')
		},
		getOrderDiscountPrice: function () {
			return '-AED ' + this.getPriceByKey('discount_price')
		},
	},
	watch: {
		selectedAddress: function () {
			// TODO:
		}
	},
	created: function() {
		this.fetchAddressList()
		this.getOrderPrice()

		// 配送时间列表
		this.fetchDeliveryList()
	},
	methods: {
		...mapMutations({
			saveAddressItems: 'saveAddressItems',
			selectAddressItem: 'selectAddressItem',
		}),
		...mapActions({
			fetchShippingList: 'fetchShippingList',
			fetchCouponUsable: 'fetchCouponUsable',
			fetchDeliveryList: 'fetchDeliveryList',
		}),
		getPriceByKey (key) {
			let total = ''
			let order_price = this.order_price
			if (order_price && order_price[key]) {
				total = order_price[key]
			}
			return total
		},
		goBack() {
			this.$router.go(-1)
		},
		leftClick() {
			MessageBox.confirm('好货不等人 请三思而行').then(action => {
				this.goBack()
			})
		},
		rightClick() {
			// TODO:
		},
		goAddress() {
			if (this.addressItems && this.addressItems.length) {
				this.$router.push('addressList')
			} else {
				this.$router.push({ name: 'addressEdit', params: { mode: 'add', item: null } })
			}
		},
		goGoodsList() {
			this.$router.push('goodsList')
		},
		goShipping() {
			this.$router.push('shipping')
		},
		goInvoice() {
			let title = this.invoice ? this.invoice.title : ''
			this.$router.push({ name: 'invoice', params: { title: title} })
		},
		goDuration() {
			this.$refs.timePicker.open()
		},
		onClickDate(date) {

		},
		onClickTime(time) {

		},
		goCouponList() {
			this.$router.push('couponUsable')
		},
		// 收货地址列表
		fetchAddressList() {
			consignee.consigneeList().then(
			(response) => {
				let items = response.consignees
				// 保存地址列表
				this.saveAddressItems(items)
				this.loadShippingList()
			}, (error) => {
				Toast(error.errorMsg)
			})
		},
		// 配送方式列表
		loadShippingList() {
			let shop = null
			let products = this.getOrderProducts ? JSON.stringify(this.getOrderProducts) : null
			let address = this.selectedAddress ? this.selectedAddress.id : null
			this.fetchShippingList({
				shop : null,
				products: products,
				address: address
			})
		},
		// 可使用的优惠券列表
		fetchCouponList() {
			let shop = null
			let total_price = this.order_price ? this.order_price.total_price : null
			this.fetchCouponUsable({ page: 1, per_page: 10, shop: shop, total_price: total_price })
		},
		// 计算订单价格
		getOrderPrice() {
			let shop = null
			let order_product = this.getOrderProducts ? JSON.stringify(this.getOrderProducts) : null
			let consignee = this.selectedAddress ? this.selectedAddress.id : null
			let shipping = this.selectedShipping ? this.selectedShipping.id : null
			let coupon = this.selectedCoupon ? this.selectedCoupon.id : null
			// TODO:
			let cashgift = null
			let score = null
			order.orderPrice(shop, order_product, consignee, shipping, coupon, cashgift, score).then(
				(response) => {
					if (response && response.order_price) {
						this.order_price = response.order_price
						this.fetchCouponList()
					}
				}, (error) => {

				})
		},
		checkout() {
			// TODO: 确认订单
			let shop = null
			let consignee = this.selectedAddress ? this.selectedAddress.id : null
			let shipping = this.selectedShipping ? this.selectedShipping.id : null
			let invoiceType = (this.invoice && this.invoice.type)? this.invoice.type.name : null
			let invoiceContent = (this.invoice && this.invoice.content)? this.invoice.content.name : null
			let invoiceTitle = this.invoice ? this.invoice.title : null
			let coupon = this.selectedCoupon ? this.selectedCoupon.id : null
			// TODO:
			let cashgift = null
			let comment = this.$refs.comment.value
			let score = null
			let deliveryTime = this.getSelectedDateValue
			let cartGoods = this.getCartGoodsIds ? JSON.stringify(this.getCartGoodsIds) : null

			if (consignee === null || consignee === undefined) {
				Toast('请填写收货地址')
				return;
			}
			if (shipping === null || shipping === undefined) {
				Toast('请选择配送方式')
				return;
			}
			Indicator.open()
			cart.checkoutCart({
				shop: shop,
				consignee: consignee,
				shipping: shipping,
				invoice_type: invoiceType,
				invoice_content: invoiceContent,
				invoice_title: invoiceTitle,
				coupon: coupon,
				cashgift: cashgift,
				comment: comment,
				score: score,
				delivery_time: deliveryTime,
				cart_good_id: cartGoods
			}).then(
				(response) => {
					Indicator.close()
				}, (error) => {
					Indicator.close()
					Toast(error.errorMsg)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.header {
		@include header;
	}
	.address {
		height: 100px;
	}
	.goods {
		height: 90px;
	}
	.item {
		height: 50px;
	}
	.section-header {
		margin-top: 8px;
	}
	.section-footer {
		margin-bottom: 8px;
	}
	.comment {
		height: 145px;
	}
	.desc {
		height: 140px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.desc-item {
		flex: 1;
	}
	.bottom-wrapper {
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;
	}
	.amount-wrapper {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: #fff;
	}
	.amount {
		flex: 1;
		font-size: 16px;
		color: #E7010E;
		text-align: right;
		padding-right: 15px;
	}
	.submit {
		width: 150px;
		background-color: #F23030;
		font-size: 16px;
		color: #fff;
		text-align: center;
		border: none;
		&:focus {
			outline-style: none;
		}
	}
</style>

