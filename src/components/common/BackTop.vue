<!-- BackTop.vue 回到顶部 -->
<template>
	<div class="ui-back-top">
		<div class="back-top" v-if="!isTop">
			<img src="../../assets/image/change-icon/top@2x.png" @click="goBackTop()">
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
		created() {
			// this.srollertop = document.documentElement.scrollTop || document.body.scrollTop;
			var that = this;
			document.addEventListener('scroll', (event) => {
	        	if (document.documentElement.scrollTop ||  document.body.scrollTop >= 100) {
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
				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
				this.isTop = true;
			}
		}
	}
</script>

<style lang="scss">
</style>
