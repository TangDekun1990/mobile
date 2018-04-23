<!-- Shopping.vue -->
<template>
	<div class="ui-add-shopping">
		<div class="shopping-info" v-if="detailInfo">
			<div class="info-header">
				<img src="../../../assets/image/change-icon/default_image_02@2x.png" class="info-image" v-if=' !detailInfo.photos  || detailInfo.photos.length <= 0'>

				<img v-bind:src="detailInfo.photos[0].thumb" class="info-image" v-if='detailInfo.photos && detailInfo.photos.length > 0'>

				<div>
					<span>AED {{ detailInfo.current_price }}</span>
					<span>
						<img src="../../../assets/image/change-icon/b2_tag@2x.png" v-if='detailInfo.activity'>
						<span v-if='detailInfo.activity'>{{detailInfo.activity.name}}</span>
					</span>
					<span>数量：{{ numbers }}</span>
				</div>

				<img src="../../../assets/image/change-icon/close@2x.png" class="close" v-on:click='closeCartInfo(false)'>
			</div>

			<div class="info-body">
				<p>数量</p>
				<div class="ui-number">
					<div class="reduce ui-common" v-on:click='reduceNumber()'>-</div><input type="number" min="1" class="number" value='1' v-model="numbers" v-on:keyup ='getInputNumber($event)'><div class="add ui-common" v-on:click='addNumber()'>+</div>
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

	import { ENUM } from '../../../config/enum';

	export default {
		data(){
			return {
				numbers: this.$store.state.detail.number > 0 ? this.$store.state.detail.number : 1,  //todo 临时解决
				productId: this.$route.params.id ? this.$route.params.id : '',
				toastConfig: {
					message: '商品达到每单限购数量',
					position: 'middle'
				}
			}
		},

		created(){},

		computed: {
			...mapState({
		      	isOnline: state => state.auth.isOnline,
		      	detailInfo: state => state.detail.detailInfo,
		      	number: state => state.detail.number,
		      	user: state => state.auth.user
		    })
		},

		watch: {
			numbers: function(value) {
				if (value) {
					if (value <= 0) {
						this.numbers = 1;
						this.toastConfig.message = '受不了了，宝贝不能再少了';
						Toast(this.toastConfig);
					} else if (value > this.detailInfo.good_stock) {
						this.toastConfig.message = '商品库存不足';
						Toast(this.toastConfig);
						this.numbers = this.detailInfo.good_stock;
					}
					this.saveNumber(this.numbers);
				}
			},

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
				if (this.detailInfo.good_stock && this.numbers > this.detailInfo.good_stock) {
					this.toastConfig.message = '商品库存不足';
					Toast(this.toastConfig);
					this.numbers = this.detailInfo.good_stock;
				} else {
					this.numbers++;
				}
			},

			// 数量减
			reduceNumber() {
				if (this.numbers > 1) {
					this.numbers--;
				} else {
					this.numbers = 1;
					this.toastConfig.message = '受不了了，宝贝不能再少了';
					Toast(this.toastConfig);
				}
			},

			// 加入购物车
			addShoppingCart() {
				if (!this.user) {
					this.$router.push({'name': 'signin'});
				} else {
					this.addShopCart();
				}
			},

			addShopCart() {
				this.$parent.$emit('start-addcart-animation');
				let params = {'product': this.productId, 'property': '', 'amount': this.numbers};
				addShopCart(params).then(res => {
					if (res && res.code == ENUM.ERROR_CODE.OK) {
						// this.$parent.$emit('start-addcart-animation');
						this.saveNumber(this.numbers);
						this.$parent.$emit('end-addcart-animation');
					} else {
						this.$parent.$emit('end-addcart-animation');
						// Toast(res.message);
					}
				},(error) => {
					Toast(error.errorMsg);
					this.$parent.$emit('end-addcart-animation');
				})
			},

			getInputNumber(e) {
				// alert(this.numbers);
				// alert(e.keyCode);
				// if (e.keyCode === 13) {
				// 	alert(this.numbers);
				// }
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
					width: 100%;
					span{
						display: block;
						color:rgba(239,51,56,1);
						&:first-child {
							font-size:18px;
							line-height:20px;
							padding-bottom: 12px;
						}
						&:nth-child(2) {
							img {
								vertical-align: middle;
								padding-right: 10px;
								width: 50px;
    							height: 20px;
							}
							span {
								display: inline;
								font-size:14px;
								color:rgba(143,142,148,1);
								line-height:14px;
								padding-bottom: 9px;
								padding-top: 12px;
							}
						}
						&:last-child {
							height: 20px;
							line-height: 20px;
							font-size:14px;
							line-height:20px;
							padding-top: 12px;
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
				color:rgba(255,255,255,1);
				width: 100%;
				position: absolute;
				bottom: 0px;
			}
		}
	}
</style>
