<!-- Promos.vue 购物车促销 -->
<template>
	<div>
		<div class="ui-cart-promos" @click="changeStatus()">
			<div class="promos-list" v-for="item in promos_list" v-if='item.value.length > 0'>
				<div class="title">{{ item.name}}</div>
				<div class="item">
					<div v-for="list in item.value">
						<span class="name">{{ list.name }}</span>
						<span class="promo">{{list.promo}}</span>
					</div>
					<!-- <div v-for="list in item.value">
						<span class="name">{{ list.name }}</span>
						<span class="promo">{{list.promo}}</span>
					</div> -->
				</div>
				<img src="../../../assets/image/change-icon/enter@2x.png">
			</div>
		</div>

		<mt-popup v-model="popupvisible" position="bottom">
			<div class="promos-list" v-for="item in promos_list" v-if='item.value.length > 0'>
				<div class="title">{{ item.name}}</div>
				<div class="item">
					<div v-for="list in item.value">
						<span class="name">{{ list.name }}</span>
						<span class="promo">{{list.promo}}</span>
					</div>
					<div v-for="list in item.value">
						<span class="name">{{ list.name }}</span>
						<span class="promo">{{list.promo}}</span>
					</div>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { getCartPromos } from '../../../api/network/cart'
	export default {
		data() {
			return{
				popupvisible: false,
				ids: [],
				promos_list: {
					'promos': {
						"name": '已满足',
						"value": []
					},
					'un_promos': {
						"name": '未满足的优惠',
						"value": []
					}
				}
			}
		},
		computed:{
			...mapState({
				saveCartList: state => state.cart.saveCartList
			})
		},
		watch: {
			saveCartList: function(value) {
				this.getPromos();
			}
		},
		created(){
		},
		mounted(){
			this.$nextTick(function () {
				// debugger;
				// let cur = document.querySelectorAll("div[class='ui-cart-promos']");
			})
			// let cur = document.querySelectorAll("div[class='ui-cart-promos']");
			// let element = this.$el;
			// console.log(cur.clientHeight);
		},
		methods: {
			// 获取选中的商品id
			getCartgoodId(){
				this.ids = [];
				let data = this.saveCartList;
				if (data.length > 0) {
					for (let i = 0, len = data.length; i <= len-1; i++) {
						if (data[i].checked) {
							this.ids.push(data[i].id);
						}
					}
				}
			},

			// 获取促销信息
			getCartPromos() {
				let params = {'cart_good_id': []};
				if (this.ids.length > 0) {
					params.cart_good_id = JSON.stringify(this.ids);
				} else {
					return;
				}
				getCartPromos(params).then(res => {
					if (res) {
						let data = res.cart_product_promos;
						this.promos_list.promos.value = [];
						this.promos_list.un_promos.value = [];

						if (data.promos.length > 0) {
							this.promos_list.promos.value = data.promos;
						}
						if (data.un_promos.length > 0) {
							this.promos_list.un_promos.value = data.un_promos;
						}
					}
				})
			},

			getPromos() {
				this.getCartgoodId();
				this.getCartPromos();
			},

			// 切换促销浮层是否显示
			changeStatus() {
				this.popupvisible = !this.popupvisible;
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
	    bottom: 44px;
	    img {
	    	width: 6px;
		    height: 10px;
		    align-self: center;
		    position: absolute;
    		right: 10px;
	    }
	}
	.promos-list {
    	display: flex;
    	flex-basis: auto;
    	align-items: flex-start;
    	align-content: flex-start;
    	padding: 14px 10px;
		div.title {
			font-size:12px;
			font-family:PingFangSC-Regular;
			color:rgba(78,84,93,1);
			line-height:17px;
		}
		div.item {
			div:first-child {
				margin-bottom: 10px;
			}
			span.name {
				border: 1px solid #FC2E39;
				padding: 1px 4px;
				border-radius: 2px ;
				font-size:10px;
				font-family:'PingFangSC-Regular';
				color:rgba(252,46,57,1);
				margin: 0px 10px;
				display: inline-block;
			}
			span.promo {
				font-size:12px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:17px;
			}
		}
    }
    .mint-popup-bottom {
    	width: 100%;
	    height: 50%;
	    border: 0px;
    }
</style>
