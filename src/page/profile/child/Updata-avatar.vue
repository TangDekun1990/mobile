<!-- Updata-avatar.vue 修改用户头像 -->
<template>
	<div class="ui-update-avater">
		<div class="common-update-avatar">
			<span>更换头像</span>
			<input type="file" placeholder="请选择头像" capture="camera" accept="image/*" @change="getInputFile($event)">
			<img v-bind:src="user.avatar.thumb" v-if="user.avatar && user.avatar.thumb">
			<img src="../../../assets/image/change-icon/img_avatar@2x.png" v-if="!user.avatar || !user.avatar.thumb">
		</div>
		<v-cropper-comp v-if='isShowCropper' :imageurl="imgBase64"></v-cropper-comp>
	</div>
</template>

<script>
	// 插件
	import * as qiniu from 'qiniu-js'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	//  状态管理
	import { mapState, mapMutations, mapActions } from 'vuex'
	// 图片裁剪 组件
	import Imagecropper from './Image-cropper';

	export default {
		computed: {
			...mapState({
				user: state => state.auth.user,
				token: state => state.auth.token,
				config: state => state.config.config
			}),
		},

		data() {
			return {
				files:'',
				isShowCropper: false,
				imgBase64: ''
			}
		},

		components: {
			'v-cropper-comp': Imagecropper
		},

		created() {
			this.$on('cancal-image-cropper', () => {
				this.isShowCropper = !this.isShowCropper;
			});
			this.$on('get-image-cropper', (data) => {
				this.startUpload(data);
			});
			console.log(this.user);
		},

		methods: {
			...mapMutations({
				clearToken: 'signout',
				signin: 'signin'
			}),

			...mapActions({
		      fetchConfig: 'fetchConfig'
		    }),

			/*
			 * getInputFile:
			 */
			getInputFile(event) {
				let target = event.target;
				if (target.files && target.files[0]) {
					this.files = target.files[0];
					this.uploadImg(event);
					// this.getBase64(target.files[0]).then(data => {
					// 	this.isShowCropper = true;
					// 	this.cropperData(data);
					// });
				}
			},

			uploadImg (e) {
				var file = e.target.files[0];
				var that = this;
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					Toast('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					return false
				}
				var reader = new FileReader()
				reader.onload = (e) => {
					let data
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					that.imgBase64 = data;
					that.isShowCropper = true;
				},
				reader.readAsArrayBuffer(file)
			},

			/*
			 *  获取base64位
			 */
			getBase64(file) {
			    return new Promise((resolve, reject) => {
				    const reader = new FileReader();
				    reader.readAsDataURL(file);
				    reader.onload = () => resolve(reader.result);
				    reader.onerror = error => reject(error);
				});
			},

			/*
			 * cropperData: 裁剪图片
			 */
			cropperData(data) {
			 	this.imgBase64 = data;
			},

			/*
			 * qi'niu上传
			 */
			_qiniu(bolbfile, filename, token, config, putExtra) {
				var that = this;
				qiniu.upload(bolbfile, filename, token, config, putExtra).subscribe({
					next(res) {
						if (res.total.percent < 100) {
							Indicator.open({text: '上传中...',spinnerType: 'fading-circle'});
						} else {
							Indicator.close();
						}
					},
					error(err) {
						console.log(err);
						Toast(err.message);
					},
					complete(res) {
						let avatar_url = that.user.id+'-'+ that.getCurrentTime();
						let data = {
							'avatar_url': avatar_url
						}
						// TODO
						// that.fetchConfig();
						that.$parent.$emit('update-user-info', data);
						that.isShowCropper = false;
						Indicator.close();
					}
				});
			},

			/*
			 * getCurrentTime: 获取当前的时间
			 */
			getCurrentTime() {
				var date = new Date();
				let year = date.getFullYear(),
					month = date.getMonth() + 1,
        			data = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		            minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		            second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		        return ''+year+''+''+month+''+''+data+''+''+hour+''+''+minute+''+''+second+'';
			},

			/*
			 * startUpload: 开始上传
			 */
			startUpload(bolbfile) {
				let file = this.files;
				// 上传参数
				let params = {
					'bolbfile': bolbfile ? bolbfile : file,
					'filename': this.user.id +'-'+ this.getCurrentTime(),
					'token': this.config.qiniu.token,
					'config': {
						'concurrentRequestLimit': 0,
						'useCdnDomain': true
					},
					'putExtra': {
						'fname': this.user.id +'-'+ this.getCurrentTime(),
						'mimeType': ["image/png", "image/jpeg", "image/gif"]
					}
				};
				this._qiniu(params.bolbfile, params.filename, params.token, {}, params.putExtra);
			}
		}
	}

</script>

<style lang="scss" scoped>
	.ui-update-avater {
		.common-update-avatar{
			position: relative;
			span {
				color: #4E545D;
				font-size:15px;
			}
			input[type='file'] {
				position: absolute;
			    top: 0px;
			    right: 0px;
			    bottom: 0px;
			    left: 0px;
			    height: 50px;
			    border: 1px solid;
			    opacity: 0;
	    		filter: alpha(opacity=0);
	    		width: 100%;
			    &:focus {
					outline: 0px;
			    }
			}
			img {
				width:45px;
				height:45px;
				border-radius: 50%;
			}
		}
	}
</style>
