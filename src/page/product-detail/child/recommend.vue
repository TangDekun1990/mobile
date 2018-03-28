<!-- recommend.vue -->
<template>
	<div class="ui-recommend-wrapper">
		<div class="wrapper-swipe">
			<mt-swipe :auto="0" >
			  	<mt-swipe-item v-for="(item, index) in list" :key="item">
			  		<div class="image-swipe-wrapper">
						<div v-for="image in item[0]">
							<img :src="image.photos[0].thumb">
							<span>AED {{image.price}}</span>
						</div>
			  		</div>
			  	</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="ui-recommend-all">
			查看全部
		</div>
	</div>
</template>

<script>
	import { getRecommendProduct } from '../../../api/network/product';
	export default {
		data() {
			return{
				list: []
			}
		},
		created() {
			this.getRecommendList();
		},
		methods: {
			getRecommendList() {
				let params = {
					"brand": this.$route.params.brand ? this.$route.params.brand : '',
                	"category": this.$route.params.category ? this.$route.params.category : '',
                	"shop": this.$route.params.shop ? this.$route.params.shop : '',
                	"product": this.$route.params.id ? this.$route.params.id : '',
                	"page": 1,
                	"per_page": 10
				};
				getRecommendProduct(params).then(res => {
					if (res) {
						this.list =  this.buildList(res.products);
					}
				});
			},
			buildList(res) {
				let index = Math.ceil(res.length / 3 );
				let newArray = [];
				if (index) {
					for (let i = 0; i <= index-1; i++) {
						let subArray = [];
						subArray.push(res.slice(i * 3, i * 3 +3));
						newArray.push(subArray);
					}
				}
				console.log(newArray);
				return newArray;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-recommend-wrapper {
		padding: 15px 15px 0px 15px;
		background:rgba(255,255,255,1);
		margin-top: 8px;
		.wrapper-swipe {
			.mint-swipe {
				height: 105px;
				padding-bottom: 40px;
				.mint-swipe-items-wrap {
					.mint-swipe-item{
					}
				}
			}
		}
		.ui-recommend-all {
			height:44px;
			background:rgba(255,255,255,1);
			border-top: 1px solid rgba(232,234,237,1);
			font-size:15px;
			font-family:'PingFangSC-Regular';
			color:rgba(78,84,93,1);
			width: 100%;
			flex-basis: 100%;
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
		}

		div.image-swipe-wrapper{
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			div {
				position: relative;
				height: 105px;
				min-width: 90px;
				flex-basis: 105px;
				border: 1px solid #EFEFF4;
				border-radius: 2px;
				&:nth-child(2) {
					border-left: 0px;
				}
				&:nth-child(3) {
					border-left: 0px;
				}
				img {
					width: 100%;
					height: 100%;
					padding: 0px;
					margin:  0px;
				}
				span {
					position: absolute;
					bottom: 0px;
					width: 100%;
					display: inline-block;
					height: 24px;
					line-height: 24px;
					text-align: center;
					font-size:16px;
					font-family:'PingFangSC-Regular';
					color:rgba(255,255,255,1);
					background:rgba(0,0,0,1);
					opacity:0.5;
					border-radius: 0px 0px 2px 2px ;
				}
			}
		}
	}
</style>
