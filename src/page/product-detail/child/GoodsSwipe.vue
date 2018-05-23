<!-- GoodsSwipe.vue -->
<template>
	<div class="swipe ui-common-swiper" v-if="detailInfo">
		<!-- 轮播图 -->
		<mt-swipe :auto="0" class='ui-common-swiper' :prevent=false :stop-propagation='isStopPropagation' @change="handleChange" v-if='!isShowMode'>

		  	<mt-swipe-item v-for="(item,index) in detailInfo.photos" v-bind:key="index" v-if='detailInfo.photos && detailInfo.photos.length > 0'>
		  		<img v-bind:src="item.thumb" v-on:click='previewPicture(index)'>
		  	</mt-swipe-item>

		  	<mt-swipe-item v-if='!detailInfo.photos || detailInfo.photos.length <= 0'>
		  		<img src="../../../assets/image/change-icon/default_image_02@3x.png" class="product-img">
		  	</mt-swipe-item>
		</mt-swipe>

		<!-- 预览图片 -->
		<preview-picture :data="detailInfo.photos" v-bind:currentIndex="index" v-if='isShowMode' :title="title"></preview-picture>

	</div>
</template>

<script>
	import PreviewPicture from './PreviewPicture';
	import { mapState, mapMutations } from 'vuex';
	export default{
		data(){
			return {
				isShowMode: false,
				index: 0,
				title: '商品详情',
				isStopPropagation: true
			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		components: {
			PreviewPicture
		},

		created() {
			this.$on('close-preview-picture', () => {
				this.isShowMode = false;
				this.hideCommodity(false);
			});
		},

		methods: {
			...mapMutations({
				change: 'changeStatus',
				hideCommodity: 'setIsHideCommodity'
			}),

			/*
				previewPicture: 点击图片进入到查看大图组件
				@params: index 当前滑动图片的index
			 */
			previewPicture(index) {
				this.index = index;
				this.isShowMode = true;
				this.change(true);
				this.hideCommodity(true);
			},

			/*
				handleChange: 轮播图改变时设置是否阻止事件冒泡
				@params: index 当前滑动的index
			 */
			handleChange(index) {
				if (index == this.photos.length-1) {
					this.isStopPropagation = false;
				} else {
					this.isStopPropagation = true;
				}
			}
		}
	}
</script>

<style lang='scss'>
	.ui-common-swiper{
		width: 100%;
		height: 300px !important;
		background-color: #ffffff;
		.mint-swipe-items-wrap {
			.mint-swipe-item {
				text-align: center;
    			overflow: hidden;
				img {
					height: 100%;
					/* width: auto; */
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
