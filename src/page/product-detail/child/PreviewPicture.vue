<!-- PreviewPicture.vue -->
<template>
	<div v-if="detailInfo">
		<mt-popup v-model="isshow"  popup-transition="popup-fade">
			<div class="preview-picture">
				<div class="picture-header" v-on:click='closePopup()'  v-if="!isshowPopHeader">
					<span>商品详情</span><span v-if="detailInfo.photos">{{defaultindex + 1}} / {{ detailInfo.photos.length }}</span>
				</div>

				<div class="picture-body">
					<mt-swipe :auto="0" :show-indicators=true :default-index='defaultindex' class='ui-common-swiper' :prevent=false :stop-propagation=true @change="handleChange">
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
	import { mapState, mapMutations } from 'vuex';
	export default {
		data(){
			return {
				isshowPopHeader: false
			}
		},

		props: {
			isshow:{
				type: Boolean,
				default: false
			},
			defaultindex: {
				type: Number,
				default: 0
			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		methods: {
			...mapMutations({
				setisPreviewPicture: 'setisPreviewPicture'
			}),

			/*
				handleChange: 轮播图改变时设置是否阻止事件冒泡
				@params: index 当前滑动的index
			 */
			handleChange(index) {
				this.defaultindex = index;
			},

			/*
			 *  closePopup: 关闭图片预览
			 */
			closePopup() {
				this.setisPreviewPicture(false);
				this.$parent.$emit('hide-priview-picture', false);
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

<style lang='scss' scoped>
.swipe-wrapper {
	width: 100%;
}
.mint-popup {
	width: 100%;
	height: 100%;
	background-color: #000;
}

.mint-swipe, .mint-swipe-items-wrap {
	position: static;
}
.preview-picture {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 10;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	background-color: #000;
	.picture-header {
		height: 44px;
		color: #000;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
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
		position: absolute;
		top: 44px;
		bottom: 0px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
}
</style>
