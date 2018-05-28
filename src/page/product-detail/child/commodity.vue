<template>
	<!-- 商品 -->
	<div class="commodity-wrapper">
		<!-- 轮播图 -->
		<v-goods-swipe></v-goods-swipe>
		<!-- 商品信息 -->
		<v-goods-info></v-goods-info>
		<!-- 促销信息 -->
		<v-goods-promotions></v-goods-promotions>
		<!-- 促销商品的活动结束时间 -->
		<v-goods-time></v-goods-time>
		<!-- 购买 -->
		<v-goods-buy></v-goods-buy>
		<!-- 联系客服-->
		<v-goods-concat></v-goods-concat>
		<!-- 评论 -->
		<v-goods-review></v-goods-review>
		<!-- 点赞 -->
		<v-goods-like></v-goods-like>
		<!-- 推荐商品  -->
		<v-goods-recommend></v-goods-recommend>
		<!-- 商品搭配 -->
		<v-goods-with></v-goods-with>
	</div>
</template>

<script>
	import goodsSwipe from './GoodsSwipe';
	import detailInfo from './Detailinfo';
	import promotions from './promotions';
	import promotionTime from './Time';
	import detailBuy from './Buy';
	import detailConcat from './Concat';
	import detailLike from './Like';
	import goodsReview from './Goodsreview';
	import recommend from './recommend';
	import withproduct from './with'

	import { mapState, mapMutations } from 'vuex';

	export default {
		data() {
			return{}
		},

		created(){},

		components: {
			'v-goods-swipe': goodsSwipe,
			'v-goods-info': detailInfo,
			'v-goods-promotions': promotions,
			'v-goods-time': promotionTime,
			'v-goods-buy': detailBuy,
			'v-goods-concat': detailConcat,
			'v-goods-like': detailLike,
			'v-goods-review': goodsReview,
			'v-goods-recommend': recommend,
			'v-goods-with': withproduct
		},

		computed: mapState({}),

		mounted() {},

		methods: {}
	}
</script>

<style lang='scss' scoped>
	.commodity-wrapper {
		height: 100%;
	}
</style>
