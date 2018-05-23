<template>
	<div class="container">
		<!-- header -->
		<mt-header class="header" title="订单消息">
			<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
			</header-item>
		</mt-header>
		<!-- body -->
		<div class="flex-wrapper body">
			<div class="order-message-body" v-for="(item, index) in messageOrderList" v-on:click="getOrderDetail(item.link)" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="messageOrderList.length > 0">
				<p>{{item.created_at * 1000| convertTime }}</p>
				<div class="order-track">
					<div class="arrow-left">
						<span>{{item.title}}</span>
						<div class="order-status">
							<div class="orderImage">
								<img :src="item.photo.thumb" v-if="item.photo != null">
								<img src="../../../assets/image/change-icon/default_image_02@2x.png" v-if=' item.photo == null'>
							</div>
							<p>{{item.content}}</p>
						</div>
					</div>
					<img class="arrow-right" src="../../../assets/image/change-icon/enter@2x.png">
				</div>
			</div>
			<v-empty-message :info="'您还没有消息通知'" :type="'message'" v-if="messageOrderList.length <= 0"></v-empty-message>
		</div>
	</div>
</template>

<script>
import { HeaderItem } from "../../../components/common";
import { Header, Indicator } from "mint-ui";
import { messageOrderList } from "../../../api/network/message"; //订单消息列表
import { openLink } from "../../cardpage/deeplink";
import { mapState, mapMutations } from "vuex";
import EmptyMessage from './empty'
export default {
	data() {
		return {
			messageOrderList: [],
			orderMessageParams: { 'page': 0, 'per_page': 10 },
  			loading: false,  //是否加载更多
			isMore: true  //是否有更多
		};
	},

	created() {
		// this.getmessageOrderList();
	},

	components: {
		'v-empty-message': EmptyMessage
	},

	methods: {
		...mapMutations({
			saveMessageTime: "saveMessageTime",
			changeType: "changeType",
			changestatus: "changestatus"
		}),

		goBack() {
			this.$router.go(-1);
		},

	    // 获取订单消息列表数据
	    getmessageOrderList(ispush) {
	    	Indicator.open();
	    	let data = this.orderMessageParams;
	    	messageOrderList(data.page, data.per_page).then(res => {
	    		if (res) {
	    			this.orderMessage = res.messages;
	    			if (res.messages.length > 0) {
	    				this.changeType(true);
		    			this.saveMessageTime({ ordertime: this.orderMessage[0].created_at });
		    			if (ispush) {
		    				this.messageOrderList = this.messageOrderList.concat(res.messages);
		    			} else {
		    				this.messageOrderList = Object.assign([], this.messageOrderList, res.messages);
		    			}
		    			this.isMore = res.paged.more == 1 ? true : false;
		    			this.changestatus({'isShowOrder': false});
	    			}
	    			Indicator.close();
	    		}
	    	});
	    },

	    // 从订单消息页面去订单详情页
	    getOrderDetail(link) {
	    	openLink(this.$router, link);
	    },

	    // 无缝滚动加载
	    getMore() {
	    	this.loading = true;
	    	this.orderMessageParams.page = ++this.orderMessageParams.page;
	    	if (this.isMore) {
	    		this.loading = false;
	    		this.getmessageOrderList(true);
	    	}
	    }
	}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	.header {
		@include header;
		border-bottom: 1px solid #e8eaed;
		position: fixed;
		width: 100%;
		z-index: 1;
	}
	.body {
		width: 100%;
		position: absolute;
		top: 44px;
		.order-message-body {
			width: 100%;
			> p {
				text-align: center;
				margin-top: 20px;
				margin-bottom: 10px;
				font-size: 12px;
				color: #7c7f88;
			}
			.order-track {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				background: rgba(255, 255, 255, 1);
				border-radius: 2px;
				margin: 0px 10px;
				.arrow-left {
					span {
						display: inline-block;
						padding: 12px 0px 0px 15px;
					}
					.order-status {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.orderImage {
							img {
								width: 60px;
								height: 60px;
								padding: 14px 10px 14px 15px;
							}
						}
						p {
							font-size: 13px;
							color: rgba(124, 127, 136, 1);
							width: 240px;
							height: 36px;
						}
					}
				}
				.arrow-right {
					width: 5px;
					height: 10px;
					padding-right: 12px;
					padding-left: 13px;
				}
			}
		}
	}
}
</style>


