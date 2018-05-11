<!-- Concat.vue -->
<template>
	<div class="ui-concat-wrapper ui-detail-common">
		<a href="https://www.sobot.com/chat/h5/index.html?sysNum=5b696ae2d5394f06b558e64ebbaf3be7&back=1&titleFlag=2&customTtile='智齿客服' ">
			<div class="header zhiCustomBtns" @click="openZhiManager()">
				<p>点击联系客服</p>
				<img src="../../../assets/image/change-icon/e5_service@2x.png">
			</div>
		</a>
	</div>
</template>

<script>
 	import { mapState, mapMutations } from 'vuex';
	export default {
		data () {
			return {
				zhiManager: ''
			}
		},

		computed: mapState({
			detailInfo: state => state.detail.detailInfo
		}),

		// TODO 解决detailInfo 一开始没有的情况
		watch: {
			detailInfo: function(value) {
				if (value) {
					// this.initzhichi();
				}
			}
		},

		mounted() {},

		created(){
			// let zhiManager = (getzhiSDKInstance());
			// console.log(zhiManager);
			// //再调用load方法
			// zhiManager.on("load", function() {
			// 	zhiManager.initBtnDOM();
			// 	zhiManager.set('customBtn', 'true');
			// 	zhiManager.set('lazyFlag', true);
		 //    	zhiManager.set('robotHelloWord', '您好! 我是机器人小超， 有什么吩咐您请说哦！');
			// });
			// this.zhiManager = zhiManager;
		},

		methods: {
			/*
			 * initzhichi: 初始化智齿
			 */
			// initzhichi() {
			// 	var data = this.detailInfo;
			// 	let zhiManager = this.zhiManager;
		 //        zhiManager.set('thumbnail_info', data.photos[0].thumb);
		 //        zhiManager.set('label_info', data.current_price);
		 //        zhiManager.set('abstract_info', data.desc);
		 //        zhiManager.set('url_info', 'http://192.168.10.18:8080/#/detial/'+data.id+'');
		 //        zhiManager.set('title_info', data.name);
			// },

			// openZhiManager() {
			// 	this.zhiManager.expand();
			// }
		}

		// destroyed(){
		// 	this.zhiManager = null;
		// }
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
			width:16px;
			height:16px;
			cursor: pointer;
		}
	}
</style>
