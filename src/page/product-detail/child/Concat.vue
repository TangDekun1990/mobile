<!-- Concat.vue -->
<template>
	<div class="ui-concat-wrapper ui-detail-common">
		<div class="header zhiCustomBtn">
			<p>点击联系客服</p>
			<!-- <a href="https://www.sobot.com/chat/h5/index.html?sysNum=5b696ae2d5394f06b558e64ebbaf3be7&back=1&titleFlag=2&customTtile='智齿客服'&title_info='智齿_商品详情页_小智智能'&url_info='http://www.sobot.com/images/logo.png'&abstract_info='更精确的理解，更精确地回答，在闲聊寒暄中，拉近与客户的距离，导入知识库，意想不到的方便快捷，最简单的知识添加，事半功倍'&label_info=200&thumbnail_info='http://www.sobot.com/images/logo.png'">rrrr</a> -->
			<img src="../../../assets/image/change-icon/e5_service@2x.png">
		</div>
	</div>
</template>

<script>
 	import { mapState, mapMutations } from 'vuex';
	export default {
		data () {
			return {
			}
		},

		computed: mapState({
			user: state => state.auth.user,
			detailInfo: state => state.detail.detailInfo
		}),

		// TODO 解决detailInfo 一开始没有的情况
		watch: {
			detailInfo: function(value) {
				if (value) {
					this.initzhichi();
				}
			}
		},

		created(){
		},

		methods: {
			/*
			 * initzhichi: 初始化智齿
			 */
			initzhichi() {
				var data = this.detailInfo;
				var zhiManager = (getzhiSDKInstance());
			    //手动初始化时 通过 load 方法调用 js 组件
			    zhiManager.on("load", function(ret) {
			        zhiManager.initBtnDOM();
			        zhiManager.set('lazyFlag', true);
			        zhiManager.set('robotHelloWord', '您好! 我是机器人小超， 有什么吩咐您请说哦！');
			        // 设置商品浮层的数据
			        zhiManager.set('thumbnail_info', data.photos[0].thumb);
			        zhiManager.set('label_info', data.current_price);
			        zhiManager.set('abstract_info', data.desc);
			        zhiManager.set('url_info', 'http://192.168.10.18:8080/#/detial/'+data.id+'');
			        zhiManager.set('title_info', data.name);
			    });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-concat-wrapper {
		p{
			font-size:16px;
			font-family:PingFangSC-Regular;
			color:rgba(78,84,93,1);
			line-height:20px;
			padding: 0px;
			margin: 0px;
		}
		img {
			width:12px;
			height:13px;
			cursor: pointer;
		}
	}
</style>
