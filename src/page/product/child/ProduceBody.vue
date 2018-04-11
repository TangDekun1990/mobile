<!-- ProduceBody.vue -->
<template>
	<div class="ui-product-body">
		<div class="list" v-on:click='goDetail()'>

			<div class="ui-image-wrapper">

				<img src="../../../assets/image/change-icon/default_image_02@2x.png" class="product-img" v-if='item.photos <= 0'>

				<img class="product-img" v-bind:src="item.photos[0].thumb" v-if='item.photos.length > 0' data-src='../../../assets/image/change-icon/default_image_02@2x.png' v-lazy="item.photos[0].thumb">

				<span class="" v-if="item.sales_count == item.good_stock">已售罄</span>

			</div>
			<!-- <span class="promos" v-if="item.promos.length > 0">促销</span> -->
			<span class="promos" v-if="item.activity && item.activity.display_time">促销</span>

			<div class="flex-right">

				<h3 class="title" style="-webkit-box-orient:vertical">{{ item.name }}</h3>

				<span class="sub-title" style="-webkit-box-orient:vertical">{{ item.desc }}</span>

				<div class="price">
					<span>AED{{ item.current_price }}</span>
					<span>AED{{ item.price }}</span>
				</div>

				<div class="sendway">
					<span v-if="item.self_employed" class="self-support">自营</span>
					<span>评论：{{ item.comment_count }}</span>
					<span>收藏：{{item.is_liked}}</span>
					<img src="../../../assets/image/change-icon/cart@2x.png">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
		}
	},
	props: ['item', 'productId'],
	methods: {
		goDetail() {
			this.$router.push({'name': 'detail', 'params': {'id': this.productId}});
		}
	}
}
</script>

<style lang='scss'>
.ui-product-body {
	border-bottom: 1px solid rgba(232,234,237,1);
	.list {
		display: flex;
		width: auto;
		align-items: center;
		justify-content: space-between;
		margin: 11px 10px;
		position: relative;
		div.ui-image-wrapper {
			width: 110px;
			height: 110px;
			display: flex;
		    justify-content: center;
		    align-content: center;
		    align-items: center;
			flex-basis: 110px;
			flex-shrink: 0;

			background-position:center center!important;
		    background: url("../../../assets/image/change-icon/default_image_02@2x.png");
		    background-size:100px 100px;
		    background-repeat:no-repeat;
		    -webkit-background-size: cover;
		    -moz-background-size: cover;
		    -o-background-size: cover;
		    background-size: cover;

			img.product-img{
				width: 110px;
				height: 110px;
				flex-basis: 110px;
				flex-shrink: 0;
				position: relative;
			}
			img.product-img[lazy=loading] {
				width: 30px;
				height: 30px;
			}
			img.product-im[lazy=error] {
				width: 30px;
				height: 30px;
			}
			img.product-img[lazy=loaded] {
				width: 110px;
				height: 110px;
				flex-basis: 110px;
				flex-shrink: 0;
				background:rgba(255,255,255,1);
			}

			span {
				position: absolute;
				height:20px;
				background:rgba(243,244,245,1);
				line-height: 20px;
				text-align: center;
				font-size:14px;
				color:rgba(242,48,48,1);
				width: 110px;
				bottom: 0px;
			}
		}

		span.promos {
			position: absolute;
			background: url('../../../assets/image/change-icon/label@2x.png') no-repeat;
			width: 36px;
			height: 19px;
			color: #FFFFFF;
			font-size: 10px;
			top: 0px;
			left: 0px;
			background-size: cover;
			font-weight: 100;
			line-height: 19px;
			text-align: left;
			padding-left: 5px;
		}
		.flex-right {
			padding-left: 14px;
			width: 100%;
			.title {
				color: #4E545D;
				font-size: 16px;
				font-weight: normal;
				font-family: 'PingFangSC';

				display:-moz-box;
			    display:-webkit-box;
			    display:box;

				-webkit-line-clamp: 2;
				-moz-line-clamp: 2;

				-moz-box-orient:vertical;
				-webkit-box-orient:vertical;
				box-orient:vertical;

				overflow: hidden;
				margin-bottom: 8px;
			}
			.sub-title {
				color: #55595F;
				font-family: 'PingFangSC';
				font-size: 12px;

				display:-moz-box;
			    display:-webkit-box;
			    display:box;

				-webkit-line-clamp: 1;
				-moz-line-clamp: 1;

				-moz-box-orient:vertical;
				-webkit-box-orient:vertical;
				box-orient:vertical;

				overflow: hidden;
				margin-bottom: 8px;
			}
			.price {
				margin-bottom: 8px;
				span {
					&:first-child {
						color: #F23030;
						font-size: 16px;
					}
					&:last-child {
						color: #A4AAB3;
						font-size: 12px;
						text-decoration: line-through;
					}
				}
			}
			.sendway {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				font-family: 'PingFangSC';
				font-weight: 'Regular';
				span{
					color: #7C7F88;
					&.self-support {
						font-size: 10px;
						color: #F34444;
						padding: 3px;
						border: 1px solid #F34444;
						border-radius: 2px;
					}
				}
				img {
					width: 22px;
					height: 20px;
				}
			}
		}
	}
}
</style>
