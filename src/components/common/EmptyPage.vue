<template>
	<div class="ui-empty-page">
		<div class="empty-page-image">
			<img src="../../assets/image/change-icon/coupons_empty@2x.png">
		</div>
		<div>
			<p>{{ title }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{}
		},
		props: {
			icon: {
				type: String
			},
			title: {
				type: String,
				default: '你暂时没有可以使用的优惠券'
			},
			width: {
				type: Number,
				default: 112
			},
			height: {
				type: Number,
				default: 112
			}
		},

		methods: {},

		mounted(){
		}
	}
</script>

<style style="scss" scoped>
	.ui-empty-page{
	    padding-top: 50%;
	    text-align: center;
	}
	div.empty-page-image img{
		width: 112px;
		height: 112px;
	}
	p {
    	font-size:17px;
    	color:rgba(124,127,136,1);
    	line-height:17px;
    	padding: 0px;
    	margin: 0px;
    	margin-top: 20px;
	}
</style>
