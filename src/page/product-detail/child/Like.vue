<!-- Like.vue -->
<template>
	<div class="ui-like-wrapper">
		<div class="like-header">
			<span>点赞</span>
			<span v-if="detaillike">{{ detaillike.length }}</span>
		</div>
		<div class="like-body">
			<div v-for="(item, index) in detaillike">
				<img :src="item.thumb" v-if="item.thumb" v-bind:key="index">
				<img src="../../../assets/image/change-icon/img_avatar@2x.png" v-if="!item.thumb">
			</div>
			<!-- v-bind:style="{left: index * 10}" -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ['detaillike'],
		mounted(){
			// this.$nextTick(function() {
   //          	console.log(document.querySelectorAll('like-body img').length)
   //      	});
		},
		created() {
		}
	}
</script>

<style lang='scss' scoped>
	.ui-like-wrapper {
		background-color: #ffffff;
		padding: 0px 15px;
		width:  auto;
		margin-top: 8px;
		.like-header {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			padding: 15px 0px;
			box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
			span:first-child{
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:20px;
			}
			span:last-child {
				font-size:13px;
				font-family:'PingFangSC-Regular';
				color:rgba(124,127,136,1);
				line-height:18px;
			}
		}
		.like-body {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			padding: 15px 0px;
			position: relative;
			height: 40px;
			overflow: hidden;
			div{
				width:40px;
				height:40px;
				display: inline-block;
				position: relative;
				img {
					width:40px;
					height:40px;
					/*position: absolute;*/
				}
			}
		}
	}
</style>
