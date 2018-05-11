<!-- Like.vue -->
<template>
	<div class="ui-like-wrapper" v-if='detailInfo && detailInfo.collector && detailInfo.collector.length > 0'>
		<div class="ui-detail-common">
			<div class="header">
				<span>点赞</span>
				<span>{{ detailInfo.collector.length }}</span>
			</div>
		</div>

		<div class="like-body">
			<div v-for="(item, index) in detailInfo.collector" v-if="index < 10" v-bind:key="index">
				<img :src="item.thumb" v-if="item.thumb">
				<img src="../../../assets/image/change-icon/img_avatar@2x.png" v-if="!item.thumb" v-bind:style="{left: -(index * 10) +'px', zIndex: detailInfo.collector.length - index}">
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {}
		},

		mounted(){
		},

		created() {
		},

		// props:['count'],

		computed: {
			...mapState({
		      	detailInfo: state => state.detail.detailInfo
		    })
		}
	}
</script>

<style lang='scss' scoped>
	.ui-like-wrapper {
		background-color: #ffffff;
		.header{
			border-bottom: 0.5px solid #e8eaed;
			span:first-child{
				font-size:16px;
				color:rgba(78,84,93,1);
				line-height:20px;
			}
			span:last-child {
				font-size:13px;
				color:rgba(124,127,136,1);
				line-height:18px;
			}
		}
		.like-body {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			padding: 14px 11px;
			position: relative;
			overflow: auto;
			div{
				width:40px;
				height:40px;
				display: inline-block;
				position: relative;
				img {
					width:40px;
					height:40px;
					position: relative;
					border: 2px solid #fff;
    				border-radius: 50%;
					box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1)
				}
			}
		}
	}
</style>
