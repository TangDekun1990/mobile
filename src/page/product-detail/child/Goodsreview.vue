<!-- Goodsreview.vue -->
<template>
	<div class="ui-goods-review">
		<div class="goods-review-header">
			<p>评价</p>
		</div>
		<div class="goods-review-body">
			<list :list="reviewList"></list>
		</div>
	</div>
</template>

<script>
	import list from './List';
	import { getReviewList } from '../../../api/network/product';
	export default {
		data() {
			return{
				id: this.$route.params.id ? this.$route.params.id : '',
				reviewList: []
			}
		},
		components: {
			list
		},
		created(){
			this.getReviewList();
		},
		methods: {
			getReviewList() {
				let params = {
					"product": this.id,
                	"grade":'',
                	"page": 1,
					"per_page": 10
				};
				getReviewList(params).then(res => {
					if (res) {
						this.reviewList = res.reviews.slice(0, 2);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.ui-goods-review {
		padding: 0px 15px;
		background-color: #ffffff;
		margin-top: 8px;
		.goods-review-header {
			padding: 15px 0px;
			border-bottom: 1px solid #e8eaed;
			box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
			p{
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:20px;
				padding: 0px;
				margin: 0px;
			}
		}
	}
</style>
