<template>
	<div class="container">
		<!-- header -->
		<mt-header class="header" title="消息中心">
			<header-item slot="left" v-bind:isBack = true v-on:onclick="goBack()">
			</header-item>
		</mt-header>
		<!-- body -->
		<div class="flex-wrapper">

			<div class="newslist"  v-on:click="getOrderMessage()">
				<div class="ui-image-wrapper">
					<img src="../../assets/image/change-icon/e12_logistics@2x.png">
				</div>
				<div class="flex-right">
					<h3>订单消息</h3>
					<span v-if="orderMessage.length > 0">{{orderMessage[0].content}}</span>
					<span v-if="orderMessage.length <= 0">暂无信息</span>
					<span class="prompt" v-if="orderCount > 0"></span>
				</div>
			</div>

			<div class="newslist" v-on:click="getNoticeMessage()">
				<div class="ui-image-wrapper">
					<img src="../../assets/image/change-icon/e12_message@2x.png">
				</div>
				<div class="flex-right">
					<h3>通知消息</h3>
					<span v-if="noticeMessage.length > 0">{{noticeMessage[0].content}}</span>
					<span v-if="noticeMessage.length <= 0">暂无信息</span>
					<span class="prompt" v-if="noticeCount > 0"></span>
				</div>
			</div>

			<!-- <a href="https://www.sobot.com/chat/h5/index.html?sysNum=5b696ae2d5394f06b558e64ebbaf3be7?partnerId=''"> -->
				<div class="newslist zhiCustomBtns" >
					<div class="ui-image-wrapper">
						<img src="../../assets/image/change-icon/e12_service@2x.png">
					</div>
					<div class="flex-right">
						<h3>客服消息</h3>
						<span>在线客服咨询时间为08:00-22:00 </span>
					</div>
				</div>
			<!-- </a> -->

		</div>
	</div>
</template>

<script>
import { messageOrderList, messageSystemList } from "../../api/network/message"; // 订单消息 //通知消息
import { mapState, mapMutations } from "vuex";
export default {
	data() {
		return {
			noticeMessage: [],
			orderMessage: [],
			key: ""
		};
	},

	created() {
		let value = this.utils.openZhichiManager('', '');
		this.utils.getunreadCount(value, this, "key");
	},

	beforeRouteEnter(to, from, next) {
		next( (vm) => {
			if (to.name == 'News' && from.name) {
				window.location.reload();
			}
		})
	},

	// beforeRouteUpdate (to, from, next) {
	// 	console.log('beforeRouteUpdate');
	// 	next();
	// 	window.location.reload();
	// },

	// beforeRouteLeave (to, from , next) {
	// 	if (from.name == 'news' && to.name != 'newsOrderMessage' && to.name != 'newsNoticeMessage') {
	// 		window.location.reload();
	// 	}
	// 	next();
	// },

	computed: {
		...mapState({
			orderNews: state => state.news.orderNews,
			noticeNews: state => state.news.noticeNews,
			status: state => state.news.status,
			orderCount: state => state.news.orderCount,
			noticeCount: state => state.news.noticeCount,
			isOnline: state => state.auth.isOnline,
			user: state => state.auth.user
		})
	},

	mounted() {
		this.getmessageSystemList();
		this.getmessageOrderList();
	},

	methods: {
		...mapMutations({
			saveMessageTime: "saveMessageTime",
			changeType: "changeType",
			saveOrderNews: "saveOrderNews",
			saveNoticeNews: "saveNoticeNews",
			changestatus: "changestatus"
		}),

		goBack() {
			this.$router.go(-1);
		},

	    // 订单消息
	    getOrderMessage() {
	    	this.$router.push("newsOrderMessage");
	    },

	    // 获取订单消息列表数据
	    getmessageOrderList() {
	    	messageOrderList(1, 10).then(res => {
	    		if (res) {
	    			this.orderMessage = res.messages;
	    			if(this.orderNews && this.orderNews.paged) {
	    				if(this.orderNews.paged.total < res.paged.total) {
	    					this.changestatus({'isShowOrder': true, 'isShowNotice': this.status.isShowNotice});
	    				} else {
	    					this.changestatus({'isShowOrder': false, 'isShowNotice': this.status.isShowNotice});
	    				}
	    			}
	    			// this.saveOrderNews(res);
	    		}
	    	});
	    },

	    // 通知消息
	    getNoticeMessage() {
	    	this.$router.push("newsNoticeMessage");
	    },

	    // 获取通知消息数据
	    getmessageSystemList() {
	    	messageSystemList(1, 10).then(res => {
	    		if (res) {
	    			this.noticeMessage = res.messages;
	    			if(this.noticeNews && this.noticeNews.paged) {
	    				if(this.noticeNews.paged.total < res.paged.total) {
	    					this.changestatus({'isShowNotice': true, 'isShowOrder': this.status.isShowOrder});
	    				} else {
	    					this.changestatus({'isShowNotice': false, 'isShowOrder': this.status.isShowOrder});
	    				}
	    			}
	    			// this.saveNoticeNews(res);
	    		}
	    	});
	    },

	    openzhichi() {

	    }
	}
};
</script>

<style lang='scss' scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.header {
		@include header;
		border-bottom: 1px solid #e8eaed;
	}
	.flex-wrapper {
		background: rgba(255, 255, 255, 1);
		.newslist {
			display: flex;
			width: auto;
			align-items: center;
			justify-content: space-between;
			padding: 15px 19px 15px 15px;
			position: relative;
			border-bottom: 1px solid #e8eaed;
			height: 80px;
			box-sizing: border-box;
			.ui-image-wrapper {
				img {
					width: 50px;
					height: 50px;
					margin-right: 15px;
				}
			}
			.flex-right {
				width: 100%;
				overflow: hidden;
				h3 {
					font-size: 14px;
					color: #4e545d;
					padding-bottom: 10px;
				}
				span {
					font-size: 12px;
					color: #7c7f88;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
				}
				.prompt {
					width: 6px;
					height: 6px;
					position: absolute;
					right: 19px;
					top: 50%;
					background-color: #f23030;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>

