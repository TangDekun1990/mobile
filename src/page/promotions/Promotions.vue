<!-- Promotions.vue -->
<template>
	<div class="promotions-list-wrapper recommend-wrapper">
		<div class="ui-commmon-header">
			<img src="../../assets/image/change-icon/back@2x.png" v-on:click='goBack()' class="ui-go-back">
			<h3>{{ promotionsList.title }}</h3>
			<img src="../../assets/image/change-icon/b2_cart@2x.png" class="ui-cart" v-on:click='goCart()'>
			<span class="cart-number" v-if="cartNumber <= 100 && cartNumber > 0">{{ cartNumber }}</span>
			<span class="cart-number" v-if="cartNumber >= 100  && cartNumber > 0 ">99+</span>
		</div>

		<div class="time-body">
			<span class="title">距离活动结束时间</span>
			<div>
				<span>{{ day }}</span>&nbsp;天&nbsp;<span>{{ hours }}</span>&nbsp;时&nbsp;<span>{{minute}}</span>&nbsp;分&nbsp;<span>{{second}}</span>&nbsp;秒
			</div>
		</div>

		<div class="ui-recommend-body" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<v-promotions-list v-for="(item, index) in products" :item="item" :productId="item.id" v-bind:key="index"></v-promotions-list>
			<p class="recommend-no-more" v-if='!isMore'>没有更多了</p>
		</div>
	</div>
</template>

<script>
	import { cartQuantity } from '../../api/network/cart'
	import { productActivity } from '../../api/network/product'
	import { mapState, mapMutations } from 'vuex'
	import productList from '../product/child/ProduceBody';
	export default {
		data() {
			return {
				loading: false,
				isMore: true,
				params: {'page': 0, 'per_page': 10},
				promotionsList: {},
				products: [],
				flag: false,
				day: '',
				hours: '',
				minute:'',
				second:'',
				time: ''
			}
		},

		components: {
			'v-promotions-list': productList
		},

		created(){
			this.$on('get-cart-quantity', () => {
				this.getCarNumber();
			})
		},

		computed: mapState({
			user: state => state.auth.user,
			cartNumber: state => state.tabBar.cartNumber
		}),

		mounted(){
			// 计算内容高度
		    this.$nextTick( () => {
		    	this.target = document.querySelector('.ui-recommend-body');
		    	let totalHeight = 90;
				const target = this.target;
		    	this.utils.fillTheScreen({target, totalHeight});
		    });
		    this.time = setInterval(()=>{
                if(this.flag == true){
                   clearInterval(time);
                } else {
                	this.timeDown();
                }
           }, 1000);
		},

		methods: {
			...mapMutations({
				setCartNumber: 'setCartNumber'
			}),

			/*
			 *  getCarNumber: 获取购物车数量
			 */
			getCarNumber() {
				cartQuantity().then(res => {
					if (res) {
						this.setCartNumber(res.quantity);
					}
				})
			},

			/*
			 * goBack: 返回到上一页
			 */
			goBack() {
				this.$router.go(-1);
			},

			/*
			 * getMore: 无限滚动
			 */
			getMore() {
				this.loading = true;
				this.params.page = ++this.params.page;
				if (this.isMore) {
					this.loading = false;
					this.getPromotionsList();
				}
			},

			/*
			 *  goCart: 跳转到购物车
			 */
			goCart() {
				if (this.user) {
					this.$router.push({'name': 'cart', 'params': {type: 0}});
				} else {
					this.$router.push({'name': 'signin'});
				}
			},

			/*
			 * getPromotionsList: 获取促销列表
			 */
			getPromotionsList(){
				let params = Object.assign({}, this.params, this.$route.query);
				productActivity(params.id, params.page, params.per_page).then( res => {
					if (res) {
						this.promotionsList = Object.assign({}, res);
						this.products = this.products.concat(res.products);
						this.isMore = res.paged.more;
					}
				})
			},

			/*
			 * timeDown: 倒计时
			 */
            timeDown () {
            	if (this.promotionsList) {
            		const endTime = new Date(this.promotionsList.end_at * 1000);
	                const nowTime = new Date();
	                let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000);
	                this.day = parseInt(leftTime/(24*60*60));
	                this.hours = this.formate(parseInt(leftTime/(60*60)%24));
	                this.minute = this.formate(parseInt(leftTime/60%60));
	                this.second = this.formate(parseInt(leftTime%60));
	                if(leftTime <= 0){
	                   this.flag = true
	                   this.$emit('time-end')
	                }
            	}
            },

            /*
             * 格式化时间
             */
            formate (time) {
                if(time>=10){
                   return time
                }else{
                   return `0${time}`
                }
            }

		}
	}
</script>

<style lang='scss' scoped>
.recommend-wrapper {
	background-color: #ffffff;
	.ui-commmon-header {
		border-bottom: 1px solid #E8EAED;
		background-color: #ffffff;
		position: absolute;
		top: 0px;
		width: 100%;
		padding: 0px;
		span.cart-number {
			right: 15px;
		}
	}
	.ui-recommend-body {
		position: absolute;
		top: 90px;
		background-color: #ffffff;
		width: 100%;
		height: auto;
		overflow: auto;
	}
	.recommend-no-more {
		color: #7C7F88;
		font-size: 12px;
		padding: 0px;
		margin: 0px;
		text-align: center;
    	padding: 10px 0px;
	}
}
div.time-body {
	height:44px;
	background:rgba(255,255,255,1);
	padding: 0px;
	line-height: 44px;
	position: fixed;
	top: 45px;
	width: 100%;
	span.title {
		font-size:14px;
		color:rgba(239,51,56,1);
		display: inline-block;
		border-left: 2px solid #F23030;
		height: 100%;
		padding-left: 15px;
	}
	div {
		float: right;
		font-size: 12px;
		color:#F23030;
		padding-right: 20px;
		span {
			color: #EF3338;
			padding: 2px 3px;
			border-radius: 1px;
			border: 1px solid #F23030;
		}
	}
}
</style>

