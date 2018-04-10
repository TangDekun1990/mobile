<!-- Detailinfo.vue -->
<template>
	<div class="ui-detail-info">
		<div class="info-header ui-flex">
			<h3>{{ detailInfo.name }}</h3>
			<div>
				<img src="../../../assets/image/change-icon/b2_comment@2x.png" @click="getCommentStatus()">

				<img src="../../../assets/image/change-icon/b2_unfavorite@2x.png" v-on:click='productLike()' v-if='!detailInfo.is_liked'>

				<img src="../../../assets/image/change-icon/b2-favorite@2x.png" v-on:click='productUnlike()' v-if='detailInfo.is_liked'>
			</div>
		</div>

		<div class="info-sub ui-flex" v-if="detailInfo.desc">
			<p>
				{{ detailInfo.desc}}
			</p>
		</div>

		<div class="info-promotions" v-if='detailInfo.activity'>
			<img src="../../../assets/image/change-icon/b2_tag@2x.png">
			<span>限购{{detailInfo.activity.limit_count }} 件 已售{{detailInfo.activity.sold_count }}件</span>
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
	import { productLike, productUnlike } from '../../../api/network/product';
	export default {
		data(){
			return {
				orderTime: '',  //下单时间
				arrivalsTime: '',  //到达时间
				arrivalsTitle: '', // 到达时间的标题
				arrivalsRange: ''  //到达时间区间
			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		created(){
			this.getCurrentDate();
		},

		methods: {
			...mapMutations({
				'commentStatus': 'changeIsComment'
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
				if ( time >= 2400 || time <= 930) {
					this.orderTime = '9:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '10:00-14:30';
				}
				// 9:30 - 14；30
				if (time > 930 || time <= 1430) {
					this.orderTime = '14:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '15:00-20:00';
				}
				// 14: 30 - 18:30
				if ( time > 1430 || time <  1830) {
					this.orderTime = '18:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '19:00-23:00';
				}
				// 18:30 - 24:00
				if (time >= 1830 || time < 2400) {
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
				let id = this.detailInfo.id;
				productLike(id).then( res => {
					if (res) {
						this.detailInfo.is_liked = res.is_liked;
					}
				})
			},

			/*
				productUnlike： 取消收藏
			*/
			productUnlike() {
				let id = this.detailInfo.id;
				productUnlike(id).then( res => {
					if (res) {
						this.detailInfo.is_liked = res.is_liked;
					}
				})
			},

			/*
				评论
			 */
			getCommentStatus() {
				this.commentStatus(true);
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
		}

		.info-sub {
			border-bottom: 1px solid #e8eaed;
			padding-bottom: 15px;
			p {
				padding: 0px;
				margin: 0px;
				color: #EF3338;
				font-size: 12px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
		}

		.info-promotions {
			display: flex;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			padding: 15px 0px;
			border-bottom: 1px solid #e8eaed;
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
