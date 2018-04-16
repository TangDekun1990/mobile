<template>
	<div class="ui-empty-page">
		<div>
			<img v-bind:style="{'width': width + 'px', 'height': height +'px'}" src="../../assets/image/change-icon/e0_coupon@2x.png">
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
				default: 62
			},
			height: {
				type: Number,
				default: 51
			}
		},

		methods: {},

		mounted(){
		}
	}
</script>

<style style="scss">
.ui-empty-page{
	/* height: 100%; */
    padding-top: 50%;
    text-align: center;
    div {
    	width: 100%;
    	img {
    		/* width: 62px;
    		height: 51px; */
    	}
    	p {
    		color: #7C7F88;
			font-size:17px;
			margin-top: 30px;
    	}
    }
}
</style>
