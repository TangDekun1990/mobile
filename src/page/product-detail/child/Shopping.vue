<!-- Shopping.vue -->
<template>
	<div class="ui-add-shopping">
		<div class="shopping-info">

			<div class="info-header">
				<img src="../../../assets/image/change-icon/default_image_02@2x.png" class="info-image" v-if=' !info.photos  || info.photos.length <= 0'>
				<img v-bind:src="info.photos[0].thumb" class="info-image" v-if='info.photos && info.photos.length > 0'>
				<div>
					<span>&yen;{{ info.current_price }}</span>
					<span><img src="../../../assets/image/change-icon/b2_tag@2x.png" v-if='info.activity'> 数量：{{ number }}</span>
					<span v-if='info.activity'>限购{{info.activit.limit_count}}件 已售{{info.activit.sold_count }}件</span>
				</div>
				<img src="../../../assets/image/change-icon/close@2x.png" class="close" v-on:click='closeCartInfo(false)'>
			</div>

			<div class="info-body">
				<p>数量</p>
				<div class="ui-number">
					<div class="reduce ui-common" v-on:click='reduceNumber()'>-</div><input type="number" min="1" class="number" value="1" v-model="number"><div class="add ui-common" v-on:click='addNumber()'>+</div>
				</div>
			</div>

			<div class="info-footer" v-on:click='addShoppingCart()'>加入购物车</div>

		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { Toast } from 'mint-ui';

	import { addShopCart } from '../../../api/network/cart';

	export default {
		data(){
			return {
				number: 1,
				productId: this.$route.params.id ? this.$route.params.id : '',
				toastConfig: {
					message: '商品达到每单限购数量',
					position: 'middle'
				}
			}
		},
		props: ['info'],
		created(){},
		computed: {
			...mapState({
		      	isOnline: state => state.auth.isOnline
		    })
		},
		watch: {
			number: function(value) {
				if (value <= 0) {
					this.toastConfig.message = '受不了了，宝贝不能再少了';
					Toast(this.toastConfig);
				} else if (value > this.info.good_stock) {
					this.toastConfig.message = '商品库存不足';
					Toast(this.toastConfig);
				}
			}
		},
		methods: {
			...mapMutations({
				saveCartState: 'saveCartState',
				hideCommodity: 'setIsHideCommodity',
				saveNumber: 'saveNumber'
			}),
			// 关闭购物车浮层
			closeCartInfo(value) {
				this.saveCartState(value);
				this.hideCommodity(value);
			},
			// 数量加
			addNumber() {
				if (this.info.activit &&  this.number == this.info.activit.limit_count ) {
					Toast(this.toastConfig);
					return;
				}
				this.number++;
			},
			// 数量减
			reduceNumber() {
				if (this.number > 1) {
					this.number--;
				}
			},
			// 加入购物车
			addShoppingCart() {
				if (!this.isOnline) {
					this.$router.push({'name': 'signin'});
				} else {
					this.addShopCart();
				}
			},
			addShopCart() {
				this.$parent.$emit('start-addcart-animation');
				let params = {'product': this.productId, 'property': '', 'amount': this.number};
				addShopCart(params).then(res => {
					if (res) {
						this.$parent.$emit('end-addcart-animation');
						this.saveNumber(this.number);
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-add-shopping {
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		width: 100%;
		height: 100%;
		background:rgba(0,0,0, 0.4);
		.shopping-info {
			background:rgba(255,255,255,1);
			height: 60%;
			position: absolute;
			width: -webkit-fill-available;
			bottom: 0px;
			z-index: 10;
			.info-header {
				padding: 15px;
				display: flex;
				justify-content: flex-start;
				padding-bottom: 25px;
				img.info-image{
					width:120px;
					height:120px;
					border-radius: 1px;
					margin-top: -15px;
					position: absolute;
					top: -13px;
					/*border: 1px solid #FFFFFF;*/
					/*border-radius: 1px;*/
				}
				div {
					padding-left: 15px;
					margin-left: 120px;
					span{
						display: block;
						&:first-child {
							font-size:18px;
							font-family:'PingFangSC-Regular';
							color:rgba(41,43,45,1);
							line-height:20px;
							padding-bottom: 12px;
						}
						&:nth-child(2) {
							height: 20px;
							line-height: 20px;
							font-size:14px;
							font-family:'PingFangSC-Regular';
							color:rgba(143,142,148,1);
							line-height:20px;
							padding-bottom: 12px;
							img {
								width: 38px;
								vertical-align: middle;
								padding-right: 10px;
							}
						}
						&:last-child {
							font-size:14px;
							font-family:'PingFangSC-Regular';
							color:rgba(143,142,148,1);
							line-height:14px;
							padding-bottom: 9px;
						}
					}
				}
				img.close {
					position: absolute;
					top: 15px;
					right: 15px;
					width: 13px;
					height: 13px;
					cursor: pointer;
				}
			}
			.info-body {
				padding: 15px 15px 20px 15px;
				p {
					font-size:16px;
					font-family:'PingFangSC-Light';
					color:rgba(41,43,45,1);
					line-height:16px;
					padding: 0px;
					margin: 0px;
					padding-bottom: 9px;
				}
				div.ui-number{
					height: 30px;
					input, div {
						height: 28px;
						text-align: center;
						color: #404245;
						display: inline-block;
						padding: 0px;
						margin:  0px;
						border:  0px;
						outline-offset: 0px;
					}
					.ui-common {
						line-height: 27px;
						width: 30px;
						height: 28px;
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
						width: 40px;
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
			.info-footer {
				height:44px;
				background:rgba(239,51,56,1);
				line-height: 44px;
				text-align: center;
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(255,255,255,1);
				width: 100%;
				position: absolute;
				bottom: 0px;
			}
		}
	}
</style>
