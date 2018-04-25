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

			<div class="goods-properties" v-if="detailInfo && detailInfo.properties && detailInfo.properties.length > 0" v-for="(item, index) in detailInfo.properties" :key="index">
				<p>{{ item.name }}{{ids}}</p>
				<div class="properties-list">
					<span  v-for="(key, keyindex) in item.attrs" :key="keyindex" @click="setCurrentIndex(index, key.id)" v-bind:class="{'active-properties': item.currentIndex == key.id}">{{ key.attr_name }}</span>
					<!-- <span class="disabled-properties">白色 (加￥498)</span>
					<span class="active-properties">白色 (加￥498)</span> -->
				</div>
			</div>

			<div class="info-body">
				<p>数量</p>
				<div class="ui-number">
					<div class="reduce ui-common" v-on:click='reduceNumber()'>-</div><input type="number" min="1" class="number" value='1' v-model="numbers" v-on:keyup ='getInputNumber($event)'><div class="add ui-common" v-on:click='addNumber()'>+</div>
				</div>
			</div>

			<div class="info-footer" v-on:click='addShoppingCart()'>确定</div>

		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { Toast } from 'mint-ui';

	import { cartAdd } from '../../../api/network/cart';

	import { ENUM } from '../../../config/enum';

	export default {
		data(){
			return {
				numbers: this.$store.state.detail.number > 0 ? this.$store.state.detail.number : 1,  //todo 临时解决
				productId: this.$route.params.id ? this.$route.params.id : '',
				toastConfig: {
					message: '商品达到每单限购数量',
					position: 'middle'
				},
				ids: [],
				proDisabled: {}
			}
		},

		created(){
			this.buildProperties();
			this.ids.length = this.detailInfo.properties.length;
		},

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
				if (this.ids.length > 0) {
					params.property = JSON.stringify(this.ids);
				}
				cartAdd(params.product, params.property, params.amount).then(res => {
					if (res && res.code == ENUM.ERROR_CODE.OK) {
						this.saveNumber(this.numbers);
						this.$parent.$emit('end-addcart-animation');
					} else {
						this.$parent.$emit('end-addcart-animation');
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
			},

			/*
			 * buildProperties: 构建多属性， 为每个规格添加当前点击的id值
			 */
			buildProperties() {
				if (this.detailInfo && this.detailInfo.properties && this.detailInfo.properties.length > 0) {
					let len = this.detailInfo.properties.length;
					for (let i = 0; i <= len-1; i++) {
						this.detailInfo.properties[i].currentIndex = '';
						// 给每种规格下的属性添加 是否还有库存的字段
						let attr = this.detailInfo.properties[i].attrs;
						for (let j = 0, len = attr.length; j <= len -1; j++) {
							attr[j].ishasstock = this.singleProperties(attr[j].id);
						}
					}
					console.log(this.detailInfo.properties);
				}
			},

			/*
			 * setCurrentIndex: 设置当前选中的规格的id,
			 * @parmas: index 当前规格的index
			 * @parmas: keyid 当前选择的规格的index
			 */
			setCurrentIndex(index, keyid) {
				this.detailInfo.properties[index].currentIndex = keyid;
				this.detailInfo.properties = Object.assign([], this.detailInfo.properties);
				this.ids[index] = keyid;
				// let str = this.fromatArray('|', this.ids);
				// this.proDisabled = this.isHasStock(str);
			},

			/*
			 * fromatArray: 格式化数组
			 */
			fromatArray(delimiter, arrays) {
				let data = '';
				if (delimiter) {
					data = arrays.join(delimiter);
				}
				return delimiter ? data : arrays;
			},

			/*
			 * isHasStock: 是否还有库存, 组合促销
			 */
			isHasStock(id) {
				let data = this.detailInfo.stock;
				if (data.length > 0) {
					for (let i = 0, len = data.length; i <= len -1; i++) {
						if (data[i].goods_attr == id) {
							return data[i];
						}
					}
				}
			},

			/*
			 * singleProperties: 单个属性
			 */
			singleProperties(id) {
				let data = this.detailInfo.stock;
				if (data.length > 0) {
					for (let i = 0, len = data.length; i <= len -1; i++) {
						if (data[i].goods_attr == id) {
							if (data[i].stock_number > 0) {
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					}
				}
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
			div.goods-properties {
				padding: 30px 15px 0px 15px;
				p {
					font-size:16px;
					color:rgba(41,43,45,1);
					line-height:16px;
					margin: 0px;
				}
				div.properties-list{
					span {
						font-size:14px;
						color:rgba(78,84,93,1);
						line-height:14px;
						display: inline-block;
						padding: 7px 14px;
						border: 1px solid #404245;
						border-radius: 2px ;
						cursor: pointer;
						margin-top: 15px;
						&:nth-child(even) {
							margin-left: 15px;
						}
						&.active-properties{
							background:rgba(239,51,56,1);
							color:rgba(255,255,255,1);
							border: 1px solid #EF3338;
						}
						&.disabled-properties {
							color: #B1B5BB;
							cursor: none;
							border: 1px solid #A2A6AD;
						}
					}
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
