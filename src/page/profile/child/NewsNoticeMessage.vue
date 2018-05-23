<template>
  	<div class="container">
		<!-- header -->
		<mt-header class="header" title="通知消息">
		  	<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack"></header-item>
	  	</mt-header>
  		<!-- body -->
	  	<div class="body" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		  	<div class="notice-message-body" v-for="(item, index) in NoticeMessage" :key="index" v-on:click="goNotice(item.link)" v-if="NoticeMessage.length > 0">
				<p>{{item.created_at * 1000 | convertTime }}</p>
				<div class="notice-track">
					<div class="notice-status">
						<p class="title">{{item.title}}</p>
						<p class="content" v-if="item.content">{{item.content}}</p>
						<p class="content" v-if="!item.content">暂无信息</p>
					</div>
					<img class="arrow-right"src="../../../assets/image/change-icon/enter@2x.png">
				</div>
			</div>
			<v-empty-message :info="'您还没有消息通知'" :type="'message'" v-if="NoticeMessage.length <= 0"></v-empty-message>
		</div>
	</div>
</template>

<script>
import { HeaderItem } from "../../../components/common";
import { Header, Indicator } from "mint-ui";
import { messageSystemList } from "../../../api/network/message"; //通知消息
import { openLink } from "../../cardpage/deeplink";
import { mapState, mapMutations } from "vuex";
import EmptyMessage from './empty'
export default {
	data() {
		return {
			NoticeMessage: [],
			params: {'page': 0, 'per_page': 10},
			isMore: true,
			loading: false
		};
	},

	created() {
		// this.getmessageSystemList();
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

		// 获取通知消息数据
		getmessageSystemList(ispush) {
			Indicator.open();
			let params = this.params;
			messageSystemList(params.page, params.per_page).then(res => {
				if (res) {
					if (res.messages.length > 0) {
						this.changeType(true);
						this.saveMessageTime({ noticeTime: res.messages[0].created_at });
						this.changestatus({'isShowNotice': false});
						if (ispush) {
		    				this.NoticeMessage = this.NoticeMessage.concat(res.messages);
		    			}
		    			this.isMore = res.paged.more == 1 ? true : false;
					}
	    			Indicator.close();
				}
			});
		},

		getMore() {
	    	this.loading = true;
	    	this.params.page = ++this.params.page;
	    	if (this.isMore) {
	    		this.loading = false;
	    		this.getmessageSystemList(true);
	    	}
	    },

		// 去到通知消息详情页面
		goNotice(link) {
			if (link && link.length) {
				openLink(this.$router, link);
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
	width:100%;
	position:absolute;
	top:44px;
	.notice-message-body {
	  width: 100%;
	  height: 100%;
	  > p {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #7c7f88;
	}
	.notice-track {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		margin: 0px 10px;
		.notice-status {
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  flex-wrap: wrap;
		  margin: 12px 0px 14px 15px;
		  .title {
			font-size: 14px;
			color: rgba(78, 84, 93, 1);
			margin: 0px 0px 14px 0px;
		}
		.content {
			font-size: 13px;
			color: rgba(124, 127, 136, 1);
			width: 100%;
			height: 100%;
		}
	}
	.arrow-right {
	  width: 5px;
	  height: 10px;
	  margin-right: 12px;
	  margin-left: 13px;
  }
}
}
}
}
</style>


