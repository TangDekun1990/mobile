<!-- Promos.vue 购物车促销 v-bind:class="{'has-bottom': type}"-->
<template>
	<div>
		<div class="ui-cart-promos" @click="changeStatus()" v-if="!isCheckedAll" v-bind:class="{'has-bottom': issShowTabbar}">
			<!-- {{ promos_list }} -->
			<div class="promos-list">
				<div class="item" v-for="item in promos_list" v-if='promos_list'>
					<table>
						<tr v-for="(list, index) in item.value" v-if="item.value.length > 0 && index <= 1">
							<td v-bind:class="{'hide': index != 0}" class="title">{{ item.name}}</td>
							<td class="name">{{ list.name }}</td>
							<td class="promo">{{list.promo}}</td>
							<td><img src="../../../assets/image/change-icon/enter@2x.png" v-bind:class="{'hide': index != 0}"></td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<mt-popup v-model="popupvisible" position="bottom">
			<div class="promos-list">
				<div class="header">
					<h3>订单促销</h3>
					<img src="../../../assets/image/change-icon/close@2x.png" v-on:click="close()">
				</div>
				<div class="item" v-for="item in promos_list" v-if='promos_list' >
					<table>
						<tr v-for="(list, index) in item.value" v-if="item.value.length > 0 ">
							<td v-bind:class="{'hide': index != 0}" class="title">{{ item.name}}</td>
							<td class="name">{{ list.name }}</td>
							<td class="promo">{{list.promo}}</td>
							<td style="display:none"><img src="../../../assets/image/change-icon/enter@2x.png"></td>
						</tr>
					</table>
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
				promos_list: {},
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
					this.promos_list = {};
					return;
				}
			},

			cartPromos(ids) {
				cartPromos(ids).then(res => {
					if (res) {
						let data = res.cart_product_promos;
						// this.promos_list = {};
						this.promos_list = Object.assign({}, this.buildData(data));
						this.height = this.getPromosHeight();
						this.setHeight(this.height);
					}
				})
			},

			/*
			 * buildData: 构建promos_list数据
			 * @param： data 促销数据
			 */
			buildData(data) {
				let list = this.promos_list;
				if (data) {
					for (let item in data) {
						let name = '';
						if (item == "promos") {
							name = '已满足';
						} else if (item == 'un_promos'){
							name = '未满足的优惠';
						}
						list[item] = {'name': name, 'value': data[item]};
					}
				}
				return list;
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
				for (const item in data) {
					let value = data[item].value;
					if (value.length = 1) {
						height += 39;
					} else if (value.length >= 2){
						height += 2 * 39;
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
	    box-shadow: 0px -0.5px 0px 0px rgba(232,234,237,1);
	    position: absolute;
	    width: 100%;
	    box-shadow: 0px 0.5px 0px 0px #e8eaed;
	    bottom: 44px;
	}
	.promos-list {
    	display: block;
    	padding-top: 0px;
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
			    right: 0px;
			    width: 16px;
			    height: 16px;
	    	}
    	}
		div.item {
			width: 100%;
			table {
				table-layout:fixed;
				width: 100%;
				border-collapse: separate;
    			border-spacing: 10px;
				td.promo{
					width:100%;
				    word-break:keep-all;/* 不换行 */
				    white-space:nowrap;/* 不换行 */
				    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
				    text-overflow:ellipsis;
				}
				td.title,
				td.name{
					width: 75px;
				}
				td.last-child {
					width: 6px;
				}
				img {
					width: 6px;
		    		height: 10px;
					&.hide {
						visibility: hidden;
					}
				}
			}
			.title {
				font-size:12px;
				color:rgba(78,84,93,1);
				line-height:17px;
				&.hide {
					visibility:  hidden;
				}
			}
			.name {
				border: 1px solid #FC2E39;
				padding: 1px 4px;
				border-radius: 2px ;
				font-size:10px;
				color:rgba(252,46,57,1);
				margin: 0px 10px;
				text-align: center;
			}
			.promo {
				font-size:12px;
				color:rgba(78,84,93,1);
				line-height:17px;
			}
		}
    }
    .has-bottom {
    	bottom: 94px;
    }
</style>
