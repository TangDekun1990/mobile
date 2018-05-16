<!-- Detailinfo.vue -->
<template>
	<div class="ui-detail-info" v-if="detailInfo">
		<div class="info-header ui-flex">
			<h3><span v-if="detailInfo.self_employed">自营</span>{{ detailInfo.name }}</h3>
			<div>
				<img src="../../../assets/image/change-icon/b2_comment@2x.png" @click="getCommentStatus()">

				<img src="../../../assets/image/change-icon/b2_unfavorite@2x.png" v-on:click='productLike()' v-if='!detailInfo.is_liked'>

				<img src="../../../assets/image/change-icon/b2-favorite@2x.png" v-on:click='productUnlike()' v-if='detailInfo.is_liked'>
			</div>
		</div>

		<div class="info-sub ui-flex" v-if="detailInfo.desc">
			<p class="ui-clip" v-if="!isShowDesc" style="-webkit-box-orient: vertical; -webkit-line-clamp: 2;">{{ detailInfo.desc}}</p>
			<p v-if="isShowDesc">{{ detailInfo.desc}}</p>
			<img src="../../../assets/image/change-icon/spread@2x.png" v-on:click="showDesc()" v-if="!isShowDesc">
			<img src="../../../assets/image/change-icon/withdraw@2x.png" v-on:click="showDesc()" v-if="isShowDesc">
		</div>

		<div class="info-promotions" v-if='detailInfo.activity'>
			<img src="../../../assets/image/change-icon/b2_tag@2x.png">
			<span>{{detailInfo.activity.name}}</span>
		</div>

		<div class="info-tips ui-flex">
			<p>
				服务：由温超物流发货，并提供售后服务。{{orderTime }}前完成下单，预计{{arrivalsTitle}}({{arrivalsTime}}){{arrivalsRange}}送达
			</p>
		</div>

	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { productLike, productUnlike, getProductDetail } from '../../../api/network/product';

	export default {
		data(){
			return {
				orderTime: '',  //下单时间
				arrivalsTime: '',  //到达时间
				arrivalsTitle: '', // 到达时间的标题
				arrivalsRange: '',  //到达时间区间,
				isShowDesc: false,  // 商品简介是否显示更多
				productId: this.$route.params.id ? this.$route.params.id : '',
			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo,
				user: state => state.auth.user
			})
		},

		// TODO
		watch: {
			detailInfo: function(value) {
				if(value) {
						let title = this.detailInfo.name;
						let imgUrl = '';
						if (this.detailInfo.photos) {
							imgUrl = this.detailInfo.photos[0].thumb;
						}
						this.wxApi.getConfigRes(title, imgUrl);
				}
			}
		},
		created(){
			this.getCurrentDate();
		},

		methods: {
			...mapMutations({
				'commentStatus': 'changeIsComment',
				'saveInfo': 'saveDetailInfo'
			}),
			/*
				getCurrentDate: 获取当前时间
			*/
			getCurrentDate() {
				let date = new Date();
				let month = date.getMonth() + 1,
        			data = date.getDate(),
								hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		            minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		            second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		        this.getTimeRange(hour, minute, month, data);
			},

			/*
				getTimeRange： 获取送货时间
				@params： hour：小时  minute： 分钟  month： 月份  data： 日期
			*/
			getTimeRange(hour, minute, month, data) {
				let time = hour +""+minute;
				// 24:00 - 9:30
				if ( time >= 2400 & time <= 930) {
					this.orderTime = '9:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '10:00-14:30';
				}
				// 9:30 - 14；30
				else if (time > 930 & time <= 1430) {
					this.orderTime = '14:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '15:00-20:00';
				}
				// 14: 30 - 18:30
				else if ( time > 1430 & time <  1830) {
					this.orderTime = '18:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '19:00-23:00';
				}
				// 18:30 - 24:00
				else if (time >= 1830 & time < 2400) {
					this.orderTime = '09:30';
					this.arrivalsTitle = '次日';
					this.arrivalsTime = month + '月' + (data+1) + '日';
					this.arrivalsRange = '10:00-14:30';
				}
			},

			/*
				productLike： 收藏商品
			*/
			productLike() {
				var that = this;
				if (this.user) {
					let id = this.detailInfo.id;
					productLike(id).then( res => {
						if (res) {
							this.detailInfo.is_liked = res.is_liked;
							this.getDetail();
						}
					})
				} else {
					this.$router.push({'name': 'signin'});
				}
			},

			/*
				productUnlike： 取消收藏
			*/
			productUnlike() {
				var that = this;
				if (this.user) {
					let id = this.detailInfo.id;
					productUnlike(id).then( res => {
						if (res) {
							this.detailInfo.is_liked = res.is_liked;
							this.getDetail();
						}
					})
				} else {
					this.$router.push({'name': 'signin'});
				}
			},

			/*
				getDetail: 获取商品详情， 并且存入状态管理
			*/
			getDetail() {
				getProductDetail(this.productId).then(res => {
					if (res) {
						this.detailInfo.collector = Object.assign([], res.product.collector);
					}
				})
			},

			/*
				评论
			 */
			getCommentStatus() {
				this.commentStatus(true);
			},

			/*
				showDesc: 是否显示商品简介更多
			 */
			showDesc() {
				this.isShowDesc = !this.isShowDesc;
			}
		}
	}
</script>

<style lang="scss">
	.ui-detail-info {
		padding: 0px 15px;
		background: #ffffff;
		.ui-flex{
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			flex-basis: 100%;
			width: auto;
		}
		.info-header {
			padding: 15px 0px;
			h3 {
				color: #4E545D;
				font-size: 16px;
				padding: 0px;
				margin: 0px;
				font-weight: normal;
			}
			div {
				border-left: 1px solid #C7C7CD;
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				img {
					width: 24px;
					height: 24px;
					vertical-align: middle;
					margin-left: 15px;
					flex-shrink: 0;
				}
			}
			span {
				width:30px;
				height:18px;
				line-height: 18px;
				text-align:center;
				background:rgba(239,51,56,1);
				border-radius: 2px ;
				font-size:12px;
				color:rgba(255,255,255,1);
				display: inline-block;
				margin-right: 10px;
			}
		}

		.info-sub {
			border-bottom: 0.5px solid #e8eaed;
			padding-bottom: 15px;
			p {
				padding: 0px;
				margin: 0px;
				color: #EF3338;
				font-size: 12px;
			    &.ui-clip {
					display: -webkit-box;
				    overflow: hidden;
			    }
			}
			img {
				width: 8px;
				height: 4px;
				margin-left: 11px;
			}
		}

		.info-promotions {
			display: flex;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			padding: 15px 0px;
			border-bottom: 0.5px solid #e8eaed;
			span {
				margin-left: 15px;
				font-size:12px;
				font-family:'PingFangSC-Regular';
				color:rgba(143,142,148,1);
			}
			img {
				width: 38px;
			}
		}

		.info-tips {
			padding: 15px 0px;
			p {
				font-size:12px;
				font-family:PingFangSC-Regular;
				color:rgba(143,142,148,1);
				line-height:20px;
			}
		}
	}
</style>
