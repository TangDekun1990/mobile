<!-- Concat.vue -->
<template>
	<div class="ui-concat-wrapper ui-detail-common zhiCustomBtns">
		<div class="header">
			<p>点击联系客服</p>
			<img src="../../../assets/image/change-icon/e5_service@2x.png">
		</div>
		<!-- <a href="https://www.sobot.com/chat/h5/index.html?sysNum=5b696ae2d5394f06b558e64ebbaf3be7&back=1&titleFlag=2&customTtile='智齿客服' ">
			<div class="header zhiCustomBtns" @click="openZhiManager()">
				<p>点击联系客服</p>
				<img src="../../../assets/image/change-icon/e5_service@2x.png">
			</div>
		</a> -->
	</div>
</template>

<script>
 	import { mapState, mapMutations } from 'vuex';
	export default {
		data () {
			return{}
		},

		computed: {
			...mapState({
		      	detailInfo: state => state.detail.detailInfo
		    })
		},

		watch: {
			detailInfo: function(value) {
				this.utils.openZhichiManager(value);
			}
		},

		mounted() {
			this.$nextTick( () => {});
		},

		created(){},

		methods: {}
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
