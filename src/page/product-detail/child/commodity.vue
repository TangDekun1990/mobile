<template>
	<div class="commodity-wrapper">
		<v-goods-swipe v-bind:photos='productDetail'></v-goods-swipe>
		<v-goods-info :productinfo="productDetail"></v-goods-info>
		<v-goods-buy></v-goods-buy>
		<v-goods-concat></v-goods-concat>
		<v-goods-like :detaillike="productDetail.collector"></v-goods-like>
		<v-goods-review></v-goods-review>
		<v-goods-recommend></v-goods-recommend>
	</div>
</template>

<script>
	import goodsSwipe from './GoodsSwipe';
	import detailInfo from './Detailinfo';
	import detailBuy from './Buy';
	import detailConcat from './Concat';
	import detailLike from './Like';
	import goodsReview from './Goodsreview';
	import recommend from './recommend';

	//  todo
	import { getProductDetail } from '../../../api/network/product';
	export default {
		data() {
			return{
				productId: this.$route.params.id ? this.$route.params.id : '',
				productDetail: {}
			}
		},
		created(){
			this.getDetail();
		},
		components: {
			'v-goods-swipe': goodsSwipe,
			'v-goods-info': detailInfo,
			'v-goods-buy': detailBuy,
			'v-goods-concat': detailConcat,
			'v-goods-like': detailLike,
			'v-goods-review': goodsReview,
			'v-goods-recommend': recommend
		},
		methods: {
			getDetail() {
				getProductDetail(this.productId).then(res => {
					if (res) {
						this.productDetail = res.product;
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>
