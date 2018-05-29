<!-- DetailBackTop.vue -->
<template>
	<div class="detail-back-top ">
		<div v-if="!isTop">
			<img src="../../../assets/image/change-icon/top@2x.png" @click="goBackTop()">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isTop: false
			}
		},

		props: {
			target: {}
		},

		created() {
			// this.srollertop = document.documentElement.scrollTop || document.body.scrollTop;
			var that = this;
			this.target.addEventListener('scroll', (event) => {
	        	if (this.target.scrollTop ||  this.target.scrollTop >= 100) {
	        		that.isTop = false;
	        	} else {
	        		that.isTop = true;
	        	}
	        });
		},

		mounted(){},

		methods: {
			/*
			 *  goBackTop： 回到顶部
			 */
			goBackTop() {
				// console.log(this.target);
				this.target.scrollTop = 0;
				this.isTop = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
.detail-back-top {
	position: fixed;
	bottom: 60px;
	width: 50px;
	height: 50px;
	right: 10px;
	div {
		width: 100%;
		height: 100%;
		img {
			width: 50px;
			height: 50px;
		}
	}
}
</style>
