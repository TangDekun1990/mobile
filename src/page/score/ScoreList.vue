<template>
	<div class="container">
		<div class="ul-score">
			<mt-header class="header" title="我的积分">
			<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
			</header-item>
			<div class="right" slot="right" @click="goRecord">
				<img src="../../assets/image/change-icon/btn_rule@2x.png">积分规则</div>
			</mt-header>		
			<div class="header-info">			
				<div class="title">
					{{scoreInfo.score}}
				</div>
				<div class="desc">
					即将到账：{{scoreInfo.upcoming_score}}
					<img @click="touchExplain()" src="../../assets/image/change-icon/btn_integral@2x.png">
				</div>
			</div>		
			<div class="tab">
				<ul>
					<li class="tab-item" v-bind:class="{'active': currentIndex == 0}" @click="setCurrentItem(0)">积分换券</li>
					<li class="tab-item" v-bind:class="{'active': currentIndex == 1}" @click="setCurrentItem(1)">积分记录</li>
				</ul>
			</div>
		</div>
		<div v-if="currentIndex == 0" class="list" v-infinite-scroll="getMore" infinite-scroll-disabled="canNotLoadMoer" infinite-scroll-distance="10">
			<score-item
				class="item"
				v-for="item in exchangeList"
				:key="item.id"
				:item="item"
				v-on:touchExchange="touchExchange(item)">
			</score-item>
		</div>
		<div v-if="currentIndex == 1" class="list" v-infinite-scroll="getMore" infinite-scroll-disabled="canNotLoadMoer" infinite-scroll-distance="10">
			<score-record
				class="item"
				v-for="item in recordList"
				:key="item.id"
				:item="item">
			</score-record>
		</div>		
		<div v-if="(!exchangeList.length && currentIndex == 0) || (!recordList.length && currentIndex == 1) " class="empty">
			<img src="../../assets/image/change-icon/e2_wu@2x.png">
			<div class="desc">您还没有积分哦</div>
		</div>
	</div>
</template>

<script>

import HeaderItem  from '../../components/common'
import ScoreItem from './child/ScoreItem'
import ScoreRecord from './child/ScoreRecord'
import * as api from '../../api/network/score'
import { MessageBox, Toast } from 'mint-ui'

export default {
	data() {
		return {
			scoreInfo: {},
			recordList: [],  // 记录列表
			exchangeList: [],  // 兑换列表
			requestParams: {'page': 0, 'per_page': 10},  //获取优惠券列表的接口
			loading: false,  //是否加载更多
			isMore: true,  //是否有更多
			currentIndex: this.$route.query.index,  //当前的tab			
		}
	},
	created() {
		this.getScoreInfo();
	},
	computed: {
	  canNotLoadMoer: function () {
	    return this.loading || !this.isMore;
	  },
	},
	methods: {
		touchExchange(item) {
			api.scoreExchangeCoupon(item.id).then(res => {
				if ( res ) {	
					Toast('积分兑换成功')	
					this.getScoreInfo();			
				}
			}, error => {								
				Toast({
				  message: error.errorMsg,				  
				  duration: 1000
				});
			});
		},
		goBack() {
			this.$router.go(-1)
		},
		goRecord() {
			this.$router.push("/scoreRule");
		},		
		getScoreInfo() {
			api.scoreGet().then(res => {
				if ( res ) {
					this.scoreInfo = res;
				}
			});
		},
		// 获取兑换记录列表
		getScoreList() {
			let data = this.requestParams;
			api.scoreExchangeCouponRecordList(data.page, data.per_page).then(res => {
				this.loading = false;
				if ( res ) {
					this.recordList = this.recordList.concat(res.exchange_record);
					this.isMore = res.paged.more == 1 ? true : false;
				}
			},error => {
				this.loading = false;
				this.isMore = false;
			});
		},
		// 获取可兑换列表
		getScoreChageList() {
			let data = this.requestParams;
			api.scoreExchangeCouponList(data.page, data.per_page).then(res => {
				this.loading = false;
				if ( res ) {
					this.exchangeList = this.exchangeList.concat(res.exchange);
					this.isMore = res.paged.more == 1 ? true : false;
				}
			},error => {
				this.loading = false;
				this.isMore = false;
			});
		},
		// 解释
		touchExplain() {
			MessageBox({
				title: "",				
				message: "即将到账的积分将在付款成功后</br>自动充值到总积分当中！",
				confirmButtonText: "知道了",
				confirmButtonClass: "confirm-button-red"
			});
		},
		setCurrentItem(index) {
			if ( index == this.currentIndex ) {
				return;
			}
			this.requestParams = {'page': 0, 'per_page': 10};
			this.currentIndex = index;
			this.recordList = [];
			this.exchangeList = [];
			this.isMore = true;
			this.getMore();
		},
		/*
		 * getMore: 无限滚动加载
		 */
		getMore() {			
			this.loading = true;
			this.requestParams.page = ++this.requestParams.page;
			
			if ( this.isMore ) {
				if ( this.currentIndex == 0 ) {
					this.getScoreChageList();
				} else {
					this.getScoreList();
				}
			}
		}
	},
	components: {
		ScoreItem,
		ScoreRecord		
	}
}
</script>

<style lang="scss" scoped>
	.container {
		background-color: $mainbgColor;
		height: 100%;
		.ul-score {
			position: fixed;
			width: 100%;
			z-index: 100;
			.header-info {
				width: 100%;
				height: 170px;
				background: url('../../assets/image/change-icon/e2_bg@2x.png') no-repeat;
				background-size: cover;
				color: #fff;
				font-size: 18px;
				text-align: center;
				.title {
					font-size: 36px;
					padding-top: 28px;
				}
				.desc {
					margin-top: 12px;
					img {
						width: 16px;
						height: 16px;
						display: inline-block;
						vertical-align: middle;		
						margin-top: -3px;			
					}
				}			
			}
			.tab {
				height: 50px;
				line-height: 50px;
				background:rgba(255,255,255,1);
				border-top: 1px solid #E8EAED;
				ul {
					padding: 0px;
					margin: 0px;
					list-style: none;
					display: flex;
					justify-content: space-around;
					align-content: center;
					align-items: center;
					li {
						height: -webkit-fill-available;
						padding: 0px 10px;
						font-size:14px;
						color:rgba(124,127,136,1);
						border-bottom: 2px solid;
						border-bottom-color: transparent;
						&.active {
							color:rgba(242,48,48,1);
							border-bottom-color: #F23030;
						}
					}
				}
			}
		}
		.list {
			margin-top: 10px;
			position: absolute;
			top: 265px;
			width: 100%;
		}
		.empty {
			padding-top: 285px;
			text-align: center;
			img {
				width: 181px;
				height: 164px;
			}
			.desc {
				margin-top: 30px;
				font-size: 18px;
				color: #A0A0A0;
			}
		}
	}
	.header {
		@include header;
		.right {
			font-size: 14px;
			color: #404245;
			img {
				width: 16px;
				height: 16px;
				vertical-align: middle;
				margin-right: 2px;
				margin-top: -4px;
			}
		}
	}
</style>

