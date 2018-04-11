<!-- Goodsreview.vue -->
<template>
	<div class="ui-goods-review" v-if='reviewList.length > 0'>
		<div class="ui-detail-common">
			<div class="header">
				<p>评价</p>
			</div>
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
		.header{
			border-bottom: 1px solid #e8eaed;
			p{
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:20px;
				padding: 0px;
				margin: 0px;
			}
		}
		.goods-review-body {
			padding: 0px 15px;
			background:rgba(255,255,255,1);
		}
	}
</style>
