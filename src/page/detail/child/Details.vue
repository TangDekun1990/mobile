<!-- Details.vue -->
<template>
	<div class="set-ui-iframe">
		<div class="ui-iframe" :class="{'hastop': unqie == 'detail'}" v-if="url">
			<!-- <iframe  v-bind:src="url" class="agreemnt-iframe" allowfullscreen='true' id="iframe" name="iframe"></iframe> -->
			<webview :url.asyc="url" isHtml>
    	</webview>
		</div>

		<div class="list-empty" v-if="!url">
			<img src="../../../assets/image/change-icon/goods_details_empty@2x.png">
			<p>本商品暂无详情</p>
		</div>

	</div>
</template>

<script>
	import { Webview } from '../../../components/common'
	export default {
		data(){
			return {
			}
		},
		props:['url', 'unqie'], // CODE REVIEW: WHTAT'S unqie???
		created(){
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.set-ui-iframe {
		height: 100%;
	}
	.ui-iframe{
	    height: 100%;
	    width: 100%;
	    &.hastop {
	 		padding-top: 44px;
	    }
	    iframe {
	    	height: 100%;
	    	width: 100%;
	    	border: 0px;
	    }
	},
	.list-empty {
		position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    text-align: center;
	    img {
	    	width: 55px;
	    }
	    p {
	    	color: #7C7F88;
	    	font-size:17px;
	    	padding: 0px;
	    	margin: 0px;
	    	font-weight: normal;
	    }
	}
</style>
