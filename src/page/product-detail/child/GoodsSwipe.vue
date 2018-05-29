<!-- GoodsSwipe.vue -->
<template>
	<div class="swipe-wrapper ui-common-swiper" v-if="detailInfo">
		<!-- 轮播图 -->
		<mt-swipe :auto="0" class='ui-common-swiper' :prevent=false :stop-propagation=true @change="handleChange">
		  	<mt-swipe-item v-for="(item,index) in detailInfo.photos" v-bind:key="index" v-if='detailInfo.photos && detailInfo.photos.length > 0'>
		  		<img v-bind:src="item.thumb" v-on:click='setPopupVisible(index)'>
		  	</mt-swipe-item>
		  	<mt-swipe-item v-if='!detailInfo.photos || detailInfo.photos.length <= 0'>
		  		<img src="../../../assets/image/change-icon/default_image_02@3x.png" class="product-img">
		  	</mt-swipe-item>
		</mt-swipe>
		<!-- 预览图片 -->
		<!-- <v-picture v-if="popupVisible" :defaultindex="index" :isshow="popupVisible"></v-picture> -->
		<!-- <mt-popup v-model="popupVisible"  popup-transition="popup-fade">
			<div class="preview-picture">
				<div class="picture-header" v-on:click='closePopup()'  v-if="!isshowPopHeader">
					<span>商品详情</span><span v-if="detailInfo.photos">{{index + 1}} / {{ detailInfo.photos.length }}</span>
				</div>
				<div class="picture-body">
					<mt-swipe :auto="0" :show-indicators=true :default-index='index' class='ui-common-swiper' :prevent=false :stop-propagation=true @change="handleChange">
					  	<mt-swipe-item v-for="(item,index) in detailInfo.photos" v-bind:key="index" >
					  		<img v-bind:src="item.thumb" @click="setPopHeader()">
					  	</mt-swipe-item>
					  	<mt-swipe-item v-if='!detailInfo.photos || detailInfo.photos.length <= 0'>
					  		<img src="../../../assets/image/change-icon/default_image_02@3x.png" class="product-img" @click="setPopHeader()">
					  	</mt-swipe-item>
					</mt-swipe>
				</div>
			</div>
		</mt-popup> -->
	</div>
</template>

<script>
	import PreviewPicture from './PreviewPicture';
	import { mapState, mapMutations } from 'vuex';
	export default{
		data(){
			return {
				popupVisible: false,
				index: 0
			}
		},

		components: {
			'v-picture': PreviewPicture
		},

		created() {
			this.$on('hide-priview-picture', (value) => {
				this.popupVisible = value;
				this.setisPreviewPicture(value)
			})
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		methods: {
			...mapMutations({
				setisPreviewPicture: 'setisPreviewPicture',
				setSwiperId: 'setSwiperId'
			}),
			/*
				setPopupVisible: 点击图片进入到查看大图popup
			 */
			setPopupVisible() {
				this.popupVisible = true;
				this.setisPreviewPicture(true)
			},

			/*
				handleChange: 轮播图改变时设置是否阻止事件冒泡
				@params: index 当前滑动的index
			 */
			handleChange(index) {
				this.index = index;
				this.setSwiperId(index);
			}
		}
	}
</script>

<style lang='scss'>
	.ui-common-swiper{
		width: 100%;
		height: 300px !important;
		.mint-swipe-items-wrap {
			.mint-swipe-item {
				text-align: center;
    			overflow: hidden;
				img {
					height: 100%;
					width: auto;
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
