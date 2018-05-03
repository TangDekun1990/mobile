<!-- Shopping.vue -->
<template>
	<!-- <mt-popup  v-model="isShowcartInfo" position="bottom" v-if="detailInfo"> -->
		<div class="ui-add-shopping" v-if="detailInfo">

			<div class="shopping-info">

				<div class="info-header">
					<img src="../../../assets/image/change-icon/default_image_02@2x.png" class="info-image" v-if=' !detailInfo.photos  || detailInfo.photos.length <= 0'>
					<img v-bind:src="detailInfo.photos[0].thumb" class="info-image" v-if='detailInfo.photos && detailInfo.photos.length > 0'>
					<div>
						<span>AED {{ detailInfo.current_price }}</span>
						<span>
							<img src="../../../assets/image/change-icon/b2_tag@2x.png" v-if='detailInfo.activity'>
							<span v-if='detailInfo.activity'>{{detailInfo.activity.name}}</span>
						</span>
						<!-- {{ chooseinfo}} -->
						<span v-if="info.length > 0 ">已选{{ info.join(',') }} &nbsp;数量：{{ numbers }}</span>
						<span v-if="info.length <= 0 ">数量：{{ numbers }}</span>
					</div>
					<img src="../../../assets/image/change-icon/close@2x.png" class="close" v-on:click='closeCartInfo(false)'>
				</div>

				<div class="goods-detail-properties">
					<div class="goods-properties" v-if="detailInfo && detailInfo.properties && detailInfo.properties.length > 0" v-for="(item, index) in detailInfo.properties" :key="index">
						<p>{{ item.name }}</p>
						<div class="properties-list">
							<div v-for="(key, keyindex) in item.attrs" :key="keyindex">
								<span @click="setCurrentIndex(index, key.id, key)"
								v-bind:class="{'active-properties': item.currentIndex == key.id}"
								v-if="key.ishasstock"
								>{{ key.attr_name }}</span>
								<span v-bind:class="{'disabled-properties': !key.ishasstock}" v-if="!key.ishasstock">{{ key.attr_name }}</span>
							</div>
						</div>
					</div>
					<div class="info-body">
						<p>数量</p>
						<div class="ui-number">
							<div class="reduce ui-common" v-on:click='reduceNumber()'>-</div><input type="number" min="1" class="number" value='1' v-model="numbers" v-on:keyup ='getInputNumber($event)'><div class="add ui-common" v-on:click='addNumber()'>+</div>
						</div>
					</div>
				</div>

				<div class="info-footer" v-on:click='addShoppingCart()'>确定</div>

			</div>
		</div>
		<!-- </mt-popup> -->
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
			info: []
		}
	},

	props: {
		isShowcartInfo: {
			type: Boolean,
			default: false
		}
	},

	created(){
		this.info = this.chooseinfo.specification;
		this.ids = Object.assign([], this.chooseinfo.ids);
		this.buildProperties();
	},

	computed: {
		...mapState({
			isOnline: state => state.auth.isOnline,
			detailInfo: state => state.detail.detailInfo,
			number: state => state.detail.number,
			user: state => state.auth.user,
			chooseinfo: state => state.detail.chooseinfo
		})
	},

	watch: {
		numbers: function(value) {
			if (value) {
				let good_stock = this.getGoodsStock();
				if (value <= 0) {
					this.numbers = 1;
					this.toastConfig.message = '受不了了，宝贝不能再少了';
					Toast(this.toastConfig);
				} else if (value > good_stock) {
					this.toastConfig.message = '商品库存不足';
					Toast(this.toastConfig);
					this.numbers = good_stock;
				}
				this.saveNumber(this.numbers);
			}
		},

	},
	methods: {
			...mapMutations({
				saveCartState: 'saveCartState',
				hideCommodity: 'setIsHideCommodity',
				saveNumber: 'saveNumber',
				saveChooseInfo: 'saveChooseInfo'
			}),

			// 关闭购物车浮层
			closeCartInfo(value) {
				this.saveCartState(value);
				this.hideCommodity(value);
			},

			/*
			 * getGoodsStock: 获取是否还有库存
			 */
			getGoodsStock() {
				let good_stock = 0;
				if (this.ids.length <= 0) {
					good_stock = this.detailInfo.good_stock;
				} else {
					let str = this.fromatArray('|', this.ids);
					let stock = this.isHasStock(str);
					good_stock = stock ? parseInt(stock) : this.detailInfo.good_stock;
				}
				return good_stock;
			},

			// 数量加
			addNumber() {
				let good_stock = this.getGoodsStock();
				if (this.detailInfo.good_stock && this.numbers > good_stock) {
					this.toastConfig.message = '商品库存不足';
					Toast(this.toastConfig);
					this.numbers = good_stock;
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
					if (this.detailInfo.properties.length > 0) {
						if (this.ids.length <= 0) {
							Toast('请选择商品属性');
							return false;
						} else {
							let status = true;
							for (let i = 0; i <= this.ids.length-1; i++) {
								if (this.ids[i] == "") {
									this.status = false
									return false;
								}
							}
							if (status) {
								this.addShopCart();
							} else {
								Toast('请选择商品属性');
								return false;
							}
						}

					} else {
						this.addShopCart();
					}
				}
			},

			addShopCart() {
				let params = {'product': this.productId, 'property': '', 'amount': this.numbers};
				if (this.ids.length > 0) {
					params.property = JSON.stringify(this.ids);
					let str = this.fromatArray('|', this.ids),
					    stock = this.isHasStock(str);
					if (parseInt(stock) <= 0) {
						Toast('商品库存不足');
						return false;
					}
				}
				cartAdd(params.product, params.property, params.amount).then(res => {
					this.$parent.$emit('start-addcart-animation');
					if (res.cart_goods) {
						this.saveNumber(this.numbers);
						this.$parent.$emit('end-addcart-animation');
					}
				},(error) => {
					Toast(error.errorMsg);
				})
			},

			getInputNumber(e) {
			},

			/*
			 * buildProperties: 构建多属性， 为每个规格添加当前点击的id值
			 */
			 buildProperties() {
			 	if (this.detailInfo && this.detailInfo.properties && this.detailInfo.properties.length > 0) {
			 		let len = this.detailInfo.properties.length;
			 		// 循环 this.detailInfo.properties
			 		for (let i = 0; i <= len-1; i++) {
			 			this.detailInfo.properties[i].currentIndex = '';
						// 给每种规格下的属性添加 是否还有库存的字段
						let attr = this.detailInfo.properties[i].attrs;
						//  循环每每种规格下的属性
						for (let j = 0, len = attr.length; j <= len -1; j++) {
							if (this.ids.length > 0) {
								// 数据回填
								for (let x = 0; x <= this.ids.length-1; x++) {
									if (attr[j].id == this.ids[x]) {
										this.detailInfo.properties[i].currentIndex = this.ids[x];
									}
								}
							}
							// 循环库存
							let data = this.detailInfo.stock;
							let count = 0;
							for (let a = 0; a <= data.length -1; a++) {
					 			if (data[a].goods_attr.indexOf(''+attr[j].id+'') >= 0){
					 				count = count + data[a].stock_number;
					 				if (count > 0) {
					 					attr[j].ishasstock = true;
					 				} else {
					 					attr[j].ishasstock = false;
					 				}
					 			}
					 		}
						}
					}
					// console.log(this.detailInfo.properties);
				}
			},

			/*
			 * setCurrentIndex: 设置当前选中的规格的id,
			 * @parmas: index 当前规格的index
			 * @parmas: keyid 当前选择的规格的index
			 */
			 setCurrentIndex(index, keyid, item) {
			 	this.info = [];
			 	this.getCurrentStock(index, keyid);
			 	this.detailInfo.properties[index].currentIndex = keyid;
			 	this.detailInfo.properties = Object.assign([], this.detailInfo.properties);
			 	this.getIds();
			 },

			 /*
			  * getCurrentStock: 获取当前
			  */
			getCurrentStock(index, currentid) {
				let properties = this.detailInfo.properties;
				for (let i = 0; i <= properties.length-1; i++) {
					if (i != index) {
						let attrs = properties[i].attrs;
						for (let j = 0; j <= attrs.length-1; j++) {
							let combination = this.fromatArray('|', [currentid, attrs[j].id]);
							// 循环库存
							let stock = this.detailInfo.stock;
							for (let s = 0; s<= stock.length-1; s++) {
								if (stock[s].goods_attr.indexOf(combination) >= 0) {
									if (stock[s].stock_number > 0) {
										attrs[j].ishasstock = true;
									} else {
										attrs[j].ishasstock = false;
									}
								}
							}
						}
					}
				}
			},

			/*
			 * getIds: 获取选中的id
			 */
			 getIds() {
			 	let data = this.detailInfo.properties;
			 	for (let i = 0, len = data.length-1; i <= len; i++) {
					this.ids[i] = data[i].currentIndex;
					//  info
					for (let j = 0; j <= data[i].attrs.length -1; j++) {
						if (data[i].attrs[j].id == data[i].currentIndex) {
							this.info.push(data[i].attrs[j].attr_name);
						}
					}
				}
				let info = {
					'specification': this.info,
					'ids': this.ids
				};
				this.saveChooseInfo(info);
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
			 * isHasStock: 是否还有库存
			 */
			 isHasStock(id) {
			 	let data = this.detailInfo.stock;
			 	if (data.length > 0) {
			 		for (let i = 0, len = data.length; i <= len -1; i++) {
			 			if (data[i].goods_attr == id) {
			 				return ''+data[i].stock_number+'';
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
				padding-left: 135px;
				/* margin-left: 120px; */
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
						line-height: 20px;
						font-size:14px;
						line-height:20px;
						padding-top: 12px;
						width: 100%;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    padding-right: 15px;
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
		div.goods-detail-properties {
			position: absolute;
		    bottom: 44px;
		    height: inherit;
			overflow: auto;
		}
		div.goods-properties {
			padding: 30px 0px 0px 0px;
			p {
				font-size:16px;
				color:rgba(41,43,45,1);
				line-height:16px;
				margin: 0px;
				padding: 0px 15px;
			}
			div.properties-list{
				div {
					display: inline-block;
					margin-left: 15px;
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
				/* &:nth-child(even) {
					margin-left: 15px;
					} */
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
