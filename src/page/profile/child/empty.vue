<template>
	<div class="empty-wrappers">
		<img v-bind:src="imgurl">
		<p>{{ info }}</p>
	</div>
</template>

<script>
	export default{
		data() {
			return {}
		},

		props: ['imgurl', 'info'],

		created() {},

		computed: {
			/*
			 *  getImgUrl: 获取图片地址
			 */
			getImgUrl() {
				if (this.imgurl) {
					let url = require(' '+this.imgurl+' ');
					return url;
				}
			}
		}
	}
</script>
