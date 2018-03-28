<!-- GoodsSwipe.vue -->
<template>
	<div class="swipe ui-common-swiper">
		<mt-swipe :auto="0" class='ui-common-swiper'>
		  	<mt-swipe-item v-for="(item,index) in photos.photos" v-bind:key="index">
		  		<img v-bind:src="item.thumb" v-on:click='previewPicture(index)'>
		  	</mt-swipe-item>
		</mt-swipe>

		<!-- 预览图片 -->
		<preview-picture :data="photos.photos" v-bind:currentIndex="index" v-if='isShowMode' :title="title"></preview-picture>
	</div>
</template>

<script>
	import PreviewPicture from './PreviewPicture';
	import { mapMutations } from 'vuex';
	export default{
		data(){
			return {
				isShowMode: false,
				index: 0,
				title: '商品详情'
			}
		},
		props: ['photos'],
		components: {
			PreviewPicture
		},
		created() {
			this.$on('close-preview-picture', () => {
				this.isShowMode = false;
			});
		},
		methods: {
			previewPicture(index) {
				this.index = index;
				this.isShowMode = true;
				this.change(false);
			},
			...mapMutations({
				change: 'changeStatus'
			})
		}
	}
</script>

<style lang='scss'>
	.ui-common-swiper{
		width: 100%;
		height: 300px;
		background-color: #ffffff;
		.mint-swipe-items-wrap {
			.mint-swipe-item {
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
		.mint-swipe-indicators {
			div.mint-swipe-indicator{
				background: #EFEFF4;
				opacity: 1;
				&.is-active {
					background: #EF3338;
				}
			}
		}
	}
</style>
