<!-- ProduceBody.vue -->
<template>
	<div class="ui-product-body">
		<div class="list">
			<img class="product-img" v-bind:src="item.photos[0].thumb">
			<span class="promos" v-if="item.activity && item.activity.display_time">促销</span>
			<div class="flex-right">
				<h3 class="title">{{ item.name }}</h3>
				<span class="sub-title">{{ item.desc }}</span>
				<div class="price">
					<span>{{ item.current_price }}</span>
					<span>{{ item.price }}</span>
				</div>
				<div class="sendway">
					<span v-if="item.self_employed">自营</span>
					<span>评论：{{ item.comment_count }}</span>
					<span>收藏：</span>
					<img src="../../../assets/image/change-icon/cart@2x.png">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{}
	},
	props: ['item']
}
</script>

<style lang='scss'>
.ui-product-body {
	.list {
		display: flex;
		width: auto;
		align-items: center;
		justify-content: space-between;
		margin: 11px 10px;
		img.product-img{
			width: 110px;
			height: 110px;
			flex-basis: 110px;
			border: 1px solid transparent;
		}
		span.promos {
			position: absolute;
			background: url('../../../assets/image/change-icon/label@2x.png') no-repeat;
			width: 36px;
			height: 19px;
			color: #FFFFFF;
			font-size: 10px;
			top: 0px;
			background-size: cover;
			font-weight: 100;
			line-height: 19px;
			text-align: left;
			padding-left: 5px;
		}
		.flex-right {
			padding-left: 14px;
			width: 100%;
			h3.title {
				color: #4E545D;
				font-size: 16px;
				font-weight: normal;
				font-family: 'PingFangSC';
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				margin-bottom: 8px;
			}
			.sub-title {
				color: #55595F;
				font-family: 'PingFangSC';
				font-weight: 'Light';
				font-size: 12px;
				display: block;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				margin-bottom: 8px;
			}
			.price {
				margin-bottom: 8px;
				span {
					font-family: 'PingFangSC';
					&:last-child {
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
					&:first-child {
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
