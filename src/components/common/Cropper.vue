<!-- Cropper.vue -->
<template>
	<div class="cropper-image-wapper">
		<!-- box -->
		<div class="cropper-box">
			<div class="cropper-box-canvas">
				<img src="">
			</div>
		</div>
		<!-- 背景图 -->
		<div class="cropper-modal"></div>
		<!-- 裁剪框 -->
		<div class="cropper-crop-box"></div>
		<!-- button -->
		<div class="cropper-footer">
			<ul>
				<li class="item">取消</li>
				<li class="item">选取</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				defaults: {
					'width': 0,
					'height': 0
				}
			}
		},

		props: {
			img: {
				type: String
			}
		},

		created() {
			this.checkedImg();
		},

		methods: {
			/*
			 * checkedImg: 校验图片
			 */
			checkedImg() {
				if (this.img === '') {
					return;
				}
				let img = new Image;
				img.onload = () => {
					this.defaults.width = img.width;
					this.defaults.height = img.height;
				}
			},

			/*
			 * cancal： 取消
			 */
			cancal() {
				this.$parent.$emit('cancal-cropper-image');
			},

			/*
			 * confirm： 选取
			 */
			confirm() {
				this.$parent.$emit('confirm-cropper-image');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cropper-image-wapper {
		height: 100%;
		width: 100%;
		border: 1px solid;
		.cropper-box {
			height: 100%;
			width: 100%;
			position: relative;
			padding-bottom: 50px;
			.cropper-box-canvas {
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
		.cropper-modal {
			position: fixed;
			background-color: #000;
			bottom: 50px;
		}
		.cropper-crop-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border: 1px solid #fff;
		}
		.cropper-footer {
			height: 50px;
			background-color: #000;
			line-height: 50px;
			padding: 0px 15px;
			ul {
				list-style: none;
				padding: 0px;
				margin: 0px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				align-content:center;
				li{
					color: #fff;
					font-size: 16px;
				}
			}
		}
	}
</style>
