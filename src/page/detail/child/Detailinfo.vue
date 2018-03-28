<!-- Detailinfo.vue -->
<template>
	<div class="ui-detail-info">

		<div class="info-header ui-flex">
			<h3>{{ productinfo.name }}</h3>
			<div>
				<img src="../../../assets/image/change-icon/b2_comment@2x.png">
				<img src="../../../assets/image/change-icon/b2_unfavorite@2x.png">
			</div>
		</div>

		<div class="info-sub ui-flex">
			<p>
				{{ productinfo.desc}}
			</p>
		</div>

		<div class="info-promotions">
			<img src="../../../assets/image/change-icon/b2_tag@2x.png">
			<span>限购10件 已售100件</span>
		</div>

		<div class="info-tips ui-flex">
			<p>
				服务：由温超物流发货，并提供售后服务。9：30前完成下单，预计次日送达服务：由温超物流发货，并提供售后服务。9：30前完成下单，预计次日送达
			</p>
		</div>

	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		props: ['productinfo'],
		created(){},
		methods: {

		}
	}
</script>

<style lang="scss">
	.ui-detail-info {
		padding: 0px 15px;
		background: #ffffff;
		.ui-flex{
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			flex-basis: 100%;
			width: auto;
		}
		.info-header {
			padding: 15px 0px;
			h3 {
				color: #4E545D;
				font-size: 16px;
				padding: 0px;
				margin: 0px;
				font-weight: normal;
			}
			div {
				border-left: 1px solid #C7C7CD;
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				img {
					width: 24px;
					height: 24px;
					vertical-align: middle;
					padding-left: 15px;
				}
			}
		}

		.info-sub {
			box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
			padding-bottom: 15px;
			p {
				padding: 0px;
				margin: 0px;
				color: #EF3338;
				font-size: 12px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
		}

		.info-promotions {
			display: flex;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			padding: 15px 0px;
			box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
			span {
				margin-left: 15px;
				font-size:12px;
				font-family:'PingFangSC-Regular';
				color:rgba(143,142,148,1);
			}
			img {
				width: 38px;
			}
		}

		.info-tips {
			padding: 15px 0px;
			p {
				font-size:12px;
				font-family:PingFangSC-Regular;
				color:rgba(143,142,148,1);
				line-height:20px;
			}
		}
	}
</style>
