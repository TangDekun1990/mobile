<template>
	<div class="empty-wrappers">
		<img :src="getImgUrl">
		<p>{{ info }}</p>
	</div>
</template>

<script>
	export default{
		data() {
			return {}
		},

		props: {
			type: {
				type: String,
				default: 'message'
			},
			info: {
				type: String,
				default: '暂无信息'
			}
		},

		created() {},

		computed: {
			getImgUrl() {
				let url = '';
				if (this.type == 'message') {
					url = require('../../../assets/image/change-icon/message_empty@2x.png');
					return url;
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.empty-wrappers{
		height: 100%;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    padding-top: 25%;
	    img {
	    	width: 75px;
	    	height: 75px;
	    }
	    p {
		    font-size: 17px;
		    color: #7C7F88;
		    letter-spacing: 0;
		    text-align: left;
		    line-height: 17px;
		    padding-top: 36.5px;
	    }
	}
</style>
