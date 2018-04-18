<template>
	<div>
		<input type="file" capture="camera" accept="image/*">
		<!--video用于显示媒体设备的视频流，自动播放-->
		<video id="video" autoplay style="width: 480px;height: 320px" class="video"></video>
		<!--拍照按钮-->
		<div><button id="capture" @click="clickEvent()">拍照</button></div>
		<!--描绘video截图-->
		<canvas id="canvas" width="480" height="320" class="canvas"></canvas>
	</div>
</template>

<script>
export default {
	data() {
		return{
			video: '',
			canvas: '',
			context: ''
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.video = document.querySelector(".video");
			this.canvas = document.querySelector(".canvas");
			this.context = canvas.getContext("2d");

			let video = this.video;
			if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
				//调用用户媒体设备，访问摄像头
				this.getUserMedia({video:{width:480,height:320}}, this.success, this.error);
			} else {
				alert("你的浏览器不支持访问用户媒体设备");
			}
		});
	},

	created() {
		// let video = this.video;
		// console.log(this.video);
		// if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
		// 	//调用用户媒体设备，访问摄像头
		// 	this.getUserMedia({video:{width:480,height:320}}, this.success, this.error);
		// } else {
		// 	alert("你的浏览器不支持访问用户媒体设备");
		// }
		// //注册拍照按钮的单击事件
		// document.getElementById("capture").addEventListener("click",function(){
		//     //绘制画面
		//     context.drawImage(video,0,0,480,320);
		// });
	},

	methods: {
			/*
			 * 访问用户媒体设备的兼容方法
			 */
			getUserMedia(constrains,success,error){
				alert(constrains);
			 	if(navigator.mediaDevices.getUserMedia){
			        //最新标准API
			        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
			    } else if (navigator.webkitGetUserMedia){
			        //webkit内核浏览器
			        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
			    } else if (navigator.mozGetUserMedia){
			        //Firefox浏览器
			        navagator.mozGetUserMedia(constrains).then(success).catch(error);
			    } else if (navigator.getUserMedia){
			        //旧版API
			        navigator.getUserMedia(constrains).then(success).catch(error);
			    }
			},

			//成功的回调函数
			success(stream){
				alert('success');
			    //兼容webkit内核浏览器
			    var CompatibleURL = window.URL || window.webkitURL;
			    //将视频流设置为video元素的源
			    this.video.src = CompatibleURL.createObjectURL(stream);
			    //播放视频
			    this.video.play();
			},

			//异常的回调函数
			error(error){
				alert('error');
				console.log("访问用户媒体设备失败：",error.name,error.message);
			},

			/*
			 *
			 */
			clickEvent() {
				this.context.drawImage(this.video, 0, 0, 480, 320);
			}
	}
}
</script>

<style>

</style>
