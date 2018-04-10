<!-- OrderNav.vue -->
<template> 
	<div class="order-wrapepr">
		<!-- header -->
		<div class="order-header">
			<ul>
				<li class="item" 
					v-for="(item, index) in ORDERNAV" 
					v-bind::key="item.id" 
					v-bind:class="{'active': currentNAVId == item.id}"
					v-on:click="setOrderNavActive(item)"
				>{{ item.name }}</li>
			</ul>
		</div>
		<!-- body -->
		<div  v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="order-body" v-if="orderList.length > 0 ">
				<div class="list" v-for="(item, index) in orderList">
					<h3 class="title">{{ getOrderStatusBy(item.status) }}</h3>
					<div class="order-image" v-if="item.goods.length > 0">
						<img v-bind:src="image.product.photos[0].large" v-for="image in item.goods" v-if="image.product.photos.length > 0" @click="goOrderDetail()">
						<!-- <img src="../../../assets/image/change-icon/default_image_02@2x.png" > -->
					</div>
					<div class="price">(共计{{item.goods.length}}件商品) 合计 : AED <i>{{item.total}}</i><i class="freight">(含运费:AED8.40)</i>
					</div>
					<div class="order-list-opratio">
						<div class="btn" v-if="item.status == 0">
							<button v-on:click="cancel()">取消订单</button>
							<button class="buttonright" v-on:click="payment()">去支付</button>
						</div>

						<div class="btn"  v-if="item.status == 1">
							<button>查看物流</button>
							<button class="buttonright"  v-on:click="confirm()">确认收货</button>
						</div>

						<div class="btn" v-if="item.status == 3" >
							<button>评价晒单</button>
							<button class="buttonright">再次购买</button>
						</div>
					</div>
				</div>
			</div>
			<div v-if="orderList.length <= 0" class="order-air">
				<img src="../../../assets/image/change-icon/order_empty@2x.png">
				<p>你的订单为空</p>
				<button class="button">随便逛逛</button>
			</div>
		</div>
	</div>
</template>

<script>
// static 
import { ORDERSTATUS, ORDERNAV } from '../static';
import { orderList } from '../../../api/network/order-nav';
import { Indicator, MessageBox, Popup  } from 'mint-ui';
// import { MessageBox } from 'mint-ui';
// import { Popup } from 'mint-ui';
  export default {
    name:'page-navbar',
    data() {
      	return {
			ORDERNAV: ORDERNAV,
			ORDERSTATUS: ORDERSTATUS,
			currentNAVId: '',
			orderListParams: {'page': 0, 'per_page': 10, status: ''},
			orderList: [],
			loading: false,
			isMore: true
      	}
    },
    created() {
		this.getUrlParams();
	},
	methods: {

		getUrlParams() {
			let urlparams = this.$route.params;
			if(urlparams.order) {
				this.currentNAVId = urlparams.order;
			}
		},
		// 去订单详情
		goOrderDetail(){
			this.$router.push('/OrderDetail')
		},

		setOrderNavActive(item) {
			this.currentNAVId = item.id;
			this.orderList = [];
			this.orderListParams.page = 1;
			// this.loading = false;
			this.getOrderList();
		},

		// 获取订单列表
		getOrderList(ispush) {
			let data = this.orderListParams;
			data.status =  this.currentNAVId;
			orderList(data.page, data.per_page, data.status).then(res => {
				if(res) {
					this.isMore = res.paged.more;
					if(ispush) {
						this.orderList = this.orderList.concat( res.orders);
					} else {
						this.orderList = Object.assign([], this.orderList, res.orders);
					}
					Indicator.close();
				}
			})
		},

		// 根据订单状态值获取对应的状态
		getOrderStatusBy(status) {
			let data = this.ORDERSTATUS;
			for(let i = 0, len = data.length; i <= len-1; i++) {
				if(data[i].id == status) {
					return data[i].name;
				}
			}
		},
		//  加载更多数据
		getMore() {
			if(this.isMore) {
				Indicator.open({text: 'Loading...', spinnerType: 'fading-circle'});
			}
			this.orderListParams.page = ++this.orderListParams.page;
			if (this.isMore) {
				this.loading = false;
				this.getOrderList(true);
			} else {
				this.loading = true;
			}
		},

		// 取消订单
		cancel() {
			alert(1)
		},

		// 去支付
		payment() {
			this.$router.push('/OrderDetail')
		},
		// 确认收货
		confirm() {
			MessageBox({
				title: '确认收货',
				message: '是否确认收货？',
				showCancelButton: true
			});
		},

		

		

		// orderGet(ispush) {
		// 	this.loading = true;
		// 	setTimeout(() => {
		// 		let last = this.orderList[this.orderList.length - 1];
		// 		for (let i = 1; i <= 10; i++) {
		// 		this.orderList.push(last + i);
		// 		}
		// 		this.loading = false;
		// 	}, 2500);
		// }
	}
  }
</script>

<style lang="scss" scoped>
.order-wrapepr {
	height: 100%;
	.order-header {
		height: 44px;
		ul {
			list-style: none;
			width: auto;
			display: flex;
			justify-content: space-around;
			align-content: center;
			align-items: center;
			height: 100%;
			background:rgba(255,255,255,1);
			li {
				font-size:14px;
				font-family:'PingFangSC-Regular';
				color:rgba(124,127,136,1);
				height: 100%;
    			text-align: center;
    			line-height: 44px;
				border-bottom: 2px solid transparent;
				&.active {
					color:rgba(242,48,48,1);
					border-bottom-color: rgba(242,48,48,1);
				}
			}
		}
	}
	.order-body {
		margin-top: 11px;
		height: 100%;
		overflow: auto;
	 	height: 100%;
		position: absolute;
		width: 100%;
		.list {
			width: 100%;
			margin-top: 12px;
			h3 {
				padding: 0px;
				margin: 0px;
				font-size:14px;
				font-family:'PingFangSC-Regular';
				color:rgba(124,127,136,1);
				line-height:44px;
				height: 44px;
				text-align: right;
				background:rgba(255,255,255,1);
				box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
				padding: 0px 15px 0px 10px;
			}
			.order-image {
				height:91px; 
				background:rgba(250,250,250,1);
				width: 100%;
    			overflow: auto;
				white-space:nowrap;
				img {
					width:60px;
					height:60px; 
					border-radius: 1px ; 
					margin: 17px 10px 10px;
				}
			}
			.price {
				font-size:14px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:44px;
				height: 44px;
				background-color: #fff;
				padding: 0px 15px 0px 0px;
				border-bottom: 1px solid $lineColor;
				box-sizing: border-box;
				text-align: right;
			 	i{
					font-size: 19px;
					padding-left:5px;
					font-style: normal;
					&.freight{
						color:rgba(124,127,136,1);
						font-size: 12px;
					}
				}
			}
			.btn {
				height: 44px;
				display: flex;
				justify-content:flex-end;
				background:rgba(255,255,255,1);
				border-radius: 2px ; 
				button {
				width: 90px;
				height: 30px;
				font-size:14px;
				border-radius: 2px;
				margin: 7px 15px 7px 0px;
				background-color: #fff;
				border:1px solid #ccc;
				}
				.buttonright {
					background:rgba(255,255,255,1);
					border-radius: 2px ;
					color:#F23030;
					border:1px solid #F23030;
				}
			}
			
		}
		}
		.order-air {
			width:100%;
			img {
				width:52px;
				height:59px; 
				box-sizing: border-box;
				margin:	139px 161px 30px;
			}
			p {
				font-size:17px;
				font-family:'PingFangSC-Regular';
				color:rgba(124,127,136,1);
				line-height:17px;
				margin-top: 30px;
				text-align: center;
				margin: 0 auto;
			}
			.button {
				width:200px;
				height:44px; 
				background:rgba(252,46,57,1);
				border-radius: 2px ; 
				padding:14px 68px;
				margin: 28px 87px 88px;
				border:none;
				color:rgba(255,255,255,1);
				font-size:16px;
			}
	}
}
</style>



