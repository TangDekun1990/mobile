<!-- Promos.vue 购物车促销 v-bind:class="{'has-bottom': type}"  v-for="(item, key) in promos_list"-->
<template>
	<div v-if='isshowpromos'>
		<div class="ui-cart-promos" @click="changeStatus()" v-if="!isCheckedAll" v-bind:class="{'has-bottom': issShowTabbar}">
			<div class="promos-list" v-if='promos.length > 0 || un_promos.length >0'>
				<!-- 以满足促销信息 -->
				<div class="cart-promos-list">
					<span class="title">已满足</span>
					<div class="promos-content">
						<div v-for="(item, index) in promos"  v-if="index <= 1">
							<span class="name">{{ item.name }}</span>
							<span class="promo">{{item.promo}}</span>
						</div>
					</div>
					<img src="../../../assets/image/change-icon/enter@2x.png">
				</div>
				<!-- 为满足促销 -->
				<div class="cart-promos-list">
					<span class="title">未满足的优惠</span>
					<div class="promos-content">
						<div v-for="(item, index) in un_promos" v-if="index <= 1">
							<span class="name">{{ item.name }}</span>
							<span class="promo">{{item.promo}}</span>
						</div>
					</div>
					<img src="../../../assets/image/change-icon/enter@2x.png">
				</div>
			</div>
		</div>

		<mt-popup v-model="popupvisible" position="bottom">
			<div class="promos-list popup-bottom-promos">
				<div class="header">
					<h3>订单促销</h3>
					<img src="../../../assets/image/change-icon/close@2x.png" v-on:click="close()">
				</div>
				<!-- 以满足促销信息 -->
				<div class="cart-promos-list">
					<span class="title">已满足</span>
					<div class="promos-content">
						<div v-for="(item, index) in promos">
							<span class="name">{{ item.name }}</span>
							<span class="promo">{{item.promo}}</span>
						</div>
					</div>
				</div>
				<!-- 为满足促销 -->
				<div class="cart-promos-list">
					<span class="title">未满足的优惠</span>
					<div class="promos-content">
						<div v-for="(item, index) in un_promos">
							<span class="name">{{ item.name }}</span>
							<span class="promo">{{item.promo}}</span>
						</div>
					</div>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { cartPromos } from '../../../api/network/cart'
	export default {
		data() {
			return{
				popupvisible: false,  //促销弹框是否可见
				promos:[],
				un_promos:[],
				height: 0
			}
		},
		props: {
			isCheckedAll: {
				type: Boolean,
				default: false
			},
			issShowTabbar: {
				type: Number,
				default: 0
			},
			isshowpromos: {
				type: Boolean,
				default: true
			}
		},

		computed:{},

		mounted(){
			// this.$nextTick( () => {
			// 	var element = document.querySelectorAll('div[class="item"]');
			// 	console.log(element.length);
		 //    })
		},

		methods: {
			...mapMutations({
				setHeight: 'setHeight'
			}),
			/*
			 * getCartPromos: 获取促销信息
			 * @param: ids 选中的商品id
			 */
			getCartPromos(ids) {
				if (ids.length > 0) {
					ids = JSON.stringify(ids);
					this.cartPromos(ids);
				} else {
					return;
				}
			},

			cartPromos(ids) {
				cartPromos(ids).then(res => {
					if (res) {
						let un_promos = res.cart_product_promos.un_promos,
							promos = res.cart_product_promos.promos;
						this.un_promos = Object.assign([], un_promos);
						this.promos = Object.assign([], promos);
						this.height = this.getPromosHeight();
						this.setHeight(this.height);
					}
				})
			},

			/*
			 * changeStatus: 切换促销浮层是否显示
			 */
			changeStatus() {
				this.popupvisible = !this.popupvisible;
			},

			/*
			 * close: 关闭弹窗
			 */
			close() {
				this.popupvisible = false;
			},

			/*
			 * TODO
			 */
			getPromosHeight() {
				let data = this.promos_list,
					height = 0;
				if (this.promos) {
					if (this.promos.length > 2) {
						height += 2 * 39;
					} else {
						height += this.promos.length * 39;
					}
				}

				if (this.un_promos) {
					if (this.un_promos.length > 2) {
						height += 2 * 39;
					} else {
						height += this.un_promos.length * 39;
					}
				}
				return height;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-cart-promos {
		background: rgba(255,255,255,1);
	    position: absolute;
	    width: 100%;
	    border-bottom: 1px solid #e8eaed;
	    bottom: 44px;
	}
	.ui-cart-promos .promos-list div.item table td.promo {
		word-break:keep-all;/* 不换行 */
	    white-space:nowrap;/* 不换行 */
	    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
	    text-overflow:ellipsis;
	}

	.promos-list {
    	display: block;
    	border-bottom: 1px solid #E8EAED;
    	padding: 10px;
    	padding-bottom: 0px;
    	div.header {
    		position: relative;
			h3{
	    		font-size:15px;
				color:rgba(78,84,93,1);
				line-height:20px;
				padding: 0px;
				margin: 0px;
				height: 44px;
				line-height: 44px;
				text-align: center;
				border-bottom: 1px solid rgba(232,234,237,1);
	    	}
	    	img {
				position: absolute;
			    top: 14px;
			    right: 10px;
			    width: 16px;
			    height: 16px;
	    	}
    	}
		div.cart-promos-list{
			width: 100%;
			display: flex;
			span.title {
				font-size:12px;
				color:rgba(78,84,93,1);
				width: 72px;
				flex-basis: 72px;
				flex-shrink: 0;
				flex-grow: 0;
				align-self: flex-start;

			}
			div.promos-content{
				width: 100%;
				overflow: hidden;
				div {
					margin-bottom: 13px;
					width: 100%;
					span.name {
						border: 1px solid #FC2E39;
						padding: 1px 4px;
						border-radius: 2px ;
						font-size:10px;
						color:rgba(252,46,57,1);
						margin: 0px 10px;
						text-align: center;
						display: block;
						float: left;
					}
					span.promo {
						font-size:12px;
						color:rgba(78,84,93,1);
						line-height:17px;
						display: block;
						overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					}
				}
			}
			img {
				height: 10px;
				width: 6px;
				align-self: center;
			}
		}
		&.popup-bottom-promos {
			padding: 0px;
			div.cart-promos-list {
				padding: 10px;
				padding-bottom: 0px;
				width: auto;
				div.promos-content {
					div{
						span.promo{
							overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: normal;
						}
					}
				}
			}
		}
    }
    .has-bottom {
    	bottom: 94px;
    }
</style>
