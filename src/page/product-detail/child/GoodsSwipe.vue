<!-- GoodsSwipe.vue -->
<template>
	<div class="swipe ui-common-swiper" v-if="detailInfo">
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
		<mt-popup v-model="popupVisible"  popup-transition="popup-fade">
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
		</mt-popup>
	</div>
</template>

<script>
	import PreviewPicture from './PreviewPicture';
	import { mapState, mapMutations } from 'vuex';
	export default{
		data(){
			return {
				popupVisible: false,
				index: 0,
				isshowPopHeader: false
			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		methods: {
			/*
				setPopupVisible: 点击图片进入到查看大图popup
			 */
			setPopupVisible() {
				this.popupVisible = true;
			},

			/*
				handleChange: 轮播图改变时设置是否阻止事件冒泡
				@params: index 当前滑动的index
			 */
			handleChange(index) {
				this.index = index;
			},

			/*
			 *  closePopup: 关闭图片预览
			 */
			closePopup() {
				this.popupVisible = false;
				this.index = 0;
			},

			/*
			 * setPopHeader: 预览大图点击图片切换header
			 */
			setPopHeader(ev) {
				this.isshowPopHeader = !this.isshowPopHeader;
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

<style lang="scss" scoped="true">
	.mint-popup {
		width: 100%;
		height: 100%;
		background-color: #000;
		.mint-swipe, .mint-swipe-items-wrap {
			position: static;
		}
	}
	.preview-picture {
		width: 100%;
		height: 100%;
		.picture-header {
			height: 44px;
		    background-color: #fff;
		    display: flex;
		    justify-content: center;
		    align-content: center;
		    align-items: center;
		    position: fixed;
		    width: 100%;
		    top: 0px;
		    span{
		    	font-size: 14px;
		    	font-weight: normal;
		    	&:first-child {
		    		cursor: pointer;
		    		position: absolute;
    				left: 15px;
    				background: url('../../../assets/image/change-icon/back@2x.png') no-repeat 0px center;
    				background-size: 24px;
    				display: inline-block;
    				padding-left: 30px;
    				height: 44px;
    				line-height: 44px;
		    	}
		    }
		}
		.picture-body {
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
		}
	}
</style>
