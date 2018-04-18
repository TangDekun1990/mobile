<!-- Image-cropper.vue -->
<template>
	<div class="ui-image-wrapper">
		<div class="ui-cropper">
			<vueCropper
			ref="cropper"
			:img="image"
			:autoCrop="example.autoCrop"
			:autoCropWidth="example.autoCropWidth"
			:autoCropHeight="example.autoCropHeight"
			:fixedBox="example.fixedBox"
		></vueCropper>
			<!-- <img v-bind:src="imageurl">
			<div class="image-cropper-box"></div> -->
		</div>
		<div class="cropper-footer">
			<span @click="cancal()">取消</span>
			<span @click="getCropBold()">选取</span>
		</div>
	</div>
</template>

<script>
	import VueCropper from 'vue-cropper'
	export default {
		data() {
			return {
				example: {
					img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
					autoCrop: true,
					autoCropWidth: 200,
					autoCropHeight: 200,
					fixedBox: true
				},
				image: this.imageurl
			}
		},

		props: ['imageurl'],

		created(){
		},

		components: {
			VueCropper
		},

		methods: {
			/*
			 * getCropBold: 选取
			 */
			getCropBold() {
				this.$refs.cropper.getCropBlob((data) => {
					this.$parent.$emit('get-image-cropper', data);
				})
			},

			/*
			 * cancal: 取消
			 */
			cancal() {
				this.$parent.$emit('cancal-image-cropper');
			},

			convertBase64UrlToBlob(){
			    var bytes=window.atob(this.imageurl.split(',')[1]);        //去掉url的头，并转换为byte
			    //处理异常,将ascii码小于0的转换为大于0
			    var ab = new ArrayBuffer(bytes.length);
			    var ia = new Uint8Array(ab);
			    for (var i = 0; i < bytes.length; i++) {
			        ia[i] = bytes.charCodeAt(i);
			    }
			    return new Blob( [ab] , {type : 'image/png'});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-image-wrapper {
		position: fixed;
		height: 100%;
		width: -webkit-fill-available;
    	left: 0px;
		.ui-cropper {
			position: fixed;
		    top: 0px;
		    bottom: 50px;
		    width: 100%;
		}
		.cropper-footer {
			position: fixed;
		    bottom: 0px;
		    height: 50px;
		    line-height: 50px;
		    background-color: #000;
		    color: #fff;
		    width: -webkit-fill-available;
		    display: flex;
		    justify-content: space-between;
		    padding: 0px 15px;
		}
	}
	.ui-cropper {
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		direction: ltr;
		touch-action: none;
  		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  		.image-cropper-box,
  		img {
  			position: absolute;
  			top: 50%;
  			left: 50%;
  			border: 1px solid;
  			transform: translate(-50%, -50%);
  			width: 200px;
  			height: 200px;
  		}
	}
</style>
