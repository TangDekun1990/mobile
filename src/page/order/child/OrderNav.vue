<!-- OrderNav.vue -->
<template> 
	<div class="order-wrapepr">
		<!-- header -->
		<div class="order-header">
			<ul>
				<li class="item" 
					v-for="(item, index) in ORDERNAV" 
					v-bind:key="item.id" 
					v-bind:class="{'active': currentNAVId == item.id}"
					v-on:click="setOrderNavActive(item)"
				>{{ item.name }}</li>
			</ul>
		</div>
		<!-- body -->
		<div v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="order-body" v-if="orderList.length > 0 ">
				<div class="list" v-for="(item, index) in orderList">
					<h3 class="title" v-if="item.status != 4">{{ getOrderStatusBy(item.status) }}</h3>
					<h3 v-if="item.status == 4"> 
						<img src="../../../assets/image/change-icon/e3_seal@2x.png">
					</h3>
					<div class="order-image" v-if="item.goods.length > 0"  @click="goOrderDetail(item.id)">
						<img v-bind:src="image.product.photos[0].large" v-for="image in item.goods" v-if="image.product.photos.length > 0">
					</div>
					<div class="price">(共计{{item.goods.length}}件商品) 合计 : AED <i>{{item.total}}</i><i class="freight">(含运费:AED{{ item.shipping.price }})</i>
					</div>
					<div class="order-list-opratio">
						<!-- 待付款 -->
						<div class="btn" v-if="item.status == 0">
							<button v-on:click="cancel()">取消订单</button>
							<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
								<div class="cancels">
									<div class="cancelInfo">
										<span class="cancel" v-on:click="cancelInfo()">取消</span> 
										<span class="success" v-on:click="complete(item.id, index)">完成</span>
									</div>
									<div class="reason">
										<p v-for="(item, list) in reasonList" v-bind:key="list" v-on:click="getReasonItem(item)">{{item.name }} </p>
									</div>
								</div>
							</mt-popup>
							<button class="buttonright" v-on:click="payment(item)">去支付</button>
						</div>
						<!-- 待发货 -->
						<div class="btn"  v-if="item.status == 1 ? '':checkState">
						
						</div>
						<!-- 发货中 -->
						<div class="btn"  v-if="item.status == 2">
							<button v-on:click="track(item.id)">查看物流</button>
							<button class="buttonright" v-on:click="confirm(item,index)">确认收货</button>
						</div>
						<!-- 待评价 -->
						<div class="btn" v-if="item.status == 3" >
							<button v-on:click="goComment(item)">评价晒单</button>
							<button class="buttonright" v-on:click="goBuy(item.id)">再次购买</button>
						</div>
						<!-- 已完成 -->
						<div class="btn" v-if="item.status == 4" >
							<button class="buttonright" v-on:click="goBuy(item.id)">再次购买</button>
						</div>
						<!-- 已取消 -->
						<div class="btn" v-if="item.status == 5" >
							<button class="buttonright" v-on:click="goBuy(item.id)">再次购买</button>
						</div>
						<!-- 配货中 -->
						<div class="btn" v-if="item.status == 6" >
							<button v-on:click="track(item.id)">查看物流</button>
							<button class="buttonright" v-on:click="confirm(item,index)">确认收货</button>
						</div>
					</div>
				</div>
			</div>
			<div v-if="orderList.length <= 0" class="order-air">
				<img src="../../../assets/image/change-icon/order_empty@2x.png">
				<p>你的订单为空</p>
				<button class="button" v-on:click="goVisit()">
					<label>随便逛逛</label>
					</button>
			</div>
		</div>
	</div>
</template>

<script>
// static 
import { ORDERSTATUS, ORDERNAV } from '../static';
import { orderList, orderCancel, orderReasonList, orderConfirm, orderRebuy} from '../../../api/network/order'; //订单列表  //取消订单 //获取退货原因 //确认收货 //再次购买
import { Indicator, MessageBox, Popup  } from 'mint-ui';
import OrderNav from './OrderNav';
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
					orderCancel:[],
					isMore: true,
					popupVisible:false,
					slots: [
						{
						flex: 1,
						values: ['不想要了','支付不成功', '价格较贵', '缺货', '等待时间过长'],
						className: 'slot1',
						textAlign: 'center'
						}
						],
						reasonList: [],
						success:[],
						reasonId: '',
						message:'',
						checkState:''
			}
    },
    created() {
			this.getUrlParams();
			this.orderReasonList();
		},
	methods: {
		getUrlParams() {
			let urlparams = this.$route.params;
			if(urlparams.order) {
				this.currentNAVId = urlparams.order;
			}
		},
		// 去订单详情
		goOrderDetail(id){
			this.$router.push({name: 'orderDetail',params: {orderDetail: id}})
		},

		setOrderNavActive(item) {
			this.currentNAVId = item.id;
			this.orderList = [];
			this.orderListParams.page = 1;
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
			this.popupVisible = true;
			this.stop();
		},
		cancelInfo() {
			this.popupVisible = false;
		},
		complete(id, index) {
			this.popupVisible = false;
			this.getordersuccess(id, index);
		},

		/***滑动限制***/
    stop(){
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='hidden';
      document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    /***取消滑动限制
    move(){
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='';//出现滚动条
      document.removeEventListener("touchmove",mo,false);
		},
		***/
		
		// 查看物流
		track(id) {
			this.$router.push({ name: 'orderTrack', params: {orderTrack: id}});
		},
		// 去支付
		payment(order) {
			this.$router.push({ name: 'payment', params: { order: order }})
		},
		// 随便逛逛
		goVisit() {
			this.$router.push('/home');
		},
		// 确认收货
		confirm(item, index) {
			MessageBox.confirm('是否确认收货？', '确认收货').then(action => {        
			this.$router.push({name:'orderTrade', query: {'item': item}});
			this.orderConfirms(item.id, index);	
			});
		},
		// 获取确认收货数据
		orderConfirms(id, index) {
			orderConfirm(id).then(res => {
				if(res) {
					this.orderList[index] = res.order;
				}
			})
		},
		
		// 获取再次购买数据
		goBuy(id) {
			Indicator.open({
				spinnerType: 'fading-circle'
			});
			orderRebuy(id).then( res => {
				if(res) {
					Indicator.close();
					this.$router.push('/cart')
				}
			});
		},

		// 晒单评价
		goComment(item) {
      this.$router.push({ name: 'orderComment', params:{ order: item}});
		},
		
		// 获取退货原因数据
		orderReasonList() {
			orderReasonList().then(res => {
				if(res) {
					this.reasonList = Object.assign([], this.reasonList, res.reasons);
				}
			})
		},
		// 获取取消订单数据
		getordersuccess(id, index) {
			orderCancel(id, this.reasonId).then(res=> {
				if(res) {
					this.orderList = [];
					this.getOrderList();
				}
			})
		},
		// 
		getReasonItem(item) {
			this.reasonId = item.id;
		}
	},
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
			border-bottom: 1px solid #E8EAED;
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
		overflow: auto;
	 	height: 100%;
		position: absolute;
		width: 100%;
		.list {
			width: 100%;
			margin-top: 11px;
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
				img {
					width:76px;
					height:60px;	
				}
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

				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
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
			vertical-align: middle;
      text-align: center;
			img {
				width:52px;
				height:59px; 
				box-sizing: border-box;
				margin:	139px auto 30px;
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
				margin: 28px auto;
				border:none;
			}
			label {
				font-size:16px;
				color:#fff;
				display:inline-block;
				vertical-align: middle;
				height:16px;
				line-height: 16px;
			}
	}
	.mint-popup {
		width:100%;
		height:235px;
	}
	.cancels {
		height:100%;
		.cancelInfo {
			display: flex;
			flex-wrap: nowrap;
			justify-content:space-between;
			span {
				color:#000;
				font-size: 14px;	
			}
			.cancel {
				padding-left:15px;
			}
			.success {
				padding-right: 15px;
			}
		}
		.reason {
			width: 100%;
			p {
				height:16px;
				line-height: 16px;
				width:100%;
				text-align: center;
				padding-top: 10px;
				&:hover {
					color:red;
				}
			}
		}
	}
}
</style>



