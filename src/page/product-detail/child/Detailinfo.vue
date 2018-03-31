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

		<div class="info-promotions" v-if='productinfo.activity'>
			<img src="../../../assets/image/change-icon/b2_tag@2x.png">
			<span>限购{{productinfo.limit_count }} 件 已售{{productinfo.sold_count }}件</span>
		</div>

		<div class="info-tips ui-flex">
			<p>
				服务：由温超物流发货，并提供售后服务。{{orderTime }}前完成下单，预计{{arrivalsTitle}}({{arrivalsTime}}){{arrivalsRange}}送达
			</p>
		</div>

	</div>
</template>

<script>
	export default {
		data(){
			return {
				orderTime: '',
				arrivalsTime: '',
				arrivalsTitle: '',
				arrivalsRange: ''
			}
		},
		props: ['productinfo'],
		created(){
			this.getCurrentDate();
		},
		methods: {
			getCurrentDate() {
				let date = new Date();
				let month = date.getMonth() + 1,
        			data = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		            minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		            second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		        this.getTimeRange(hour, minute, month, data);
			},
			getTimeRange(hour, minute, month, data) {
				if ( (hour > 0 && hour <= 9) &&  (minute >= 0 && minute <= 30)){
					this.orderTime = '9:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '10:00-14:30';
				} else if( (hour > 9 && hour <= 14) && (minute > 30 || minute <= 30)) {
					this.orderTime = '14:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '15:00-20:00';
				} else if ( (hour > 14 && hour <= 18) && (minute > 30 || minute <= 30) ) {
					this.orderTime = '18:30';
					this.arrivalsTitle = '当天';
					this.arrivalsTime = month + '月' + data + '日';
					this.arrivalsRange = '19:00-23:00';
				} else if( (hour >18 && hour <= 24) && (minute > 30 || minute <= 0) ) {
					this.orderTime = '09:30';
					this.arrivalsTitle = '次日';
					this.arrivalsTime = month + '月' + (data+1) + '日';
					this.arrivalsRange = '10:00-14:30';
				}
			}
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
					margin-left: 15px;
					flex-shrink: 0;
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
