<template>
	<!-- 商品 -->
	<div class="commodity-wrapper" v-bind:class="{'hide-commodity': isHideCommodity, 'sroller-commodity': !isHideCommodity}">
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
		<!-- 点赞 -->
		<v-goods-like></v-goods-like>
		<!-- 评论 -->
		<v-goods-review></v-goods-review>
		<!-- 推荐商品  -->
		<v-goods-recommend></v-goods-recommend>
		<!-- 详情 -->
		<!-- <v-goods-aspect v-if='isShowDetail'></v-goods-aspect> -->
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

	import aspect from './aspect';

	import { mapState, mapMutations } from 'vuex';
	//  todo
	import { getProductDetail } from '../../../api/network/product';
	export default {
		data() {
			return{
				productId: this.$route.params.id ? this.$route.params.id : ''
			}
		},
		created(){
			// this.getDetail();
		},
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
			'v-goods-aspect': aspect
		},
		computed: mapState({
			isHideCommodity: state => state.detail.isHideCommodity,
			isShowDetail: state => state.detail.isShowDetail
		}),

		mounted() {
			// 添加滚动事件
			var element = this.$el;
			var that = this;
	        element.addEventListener('scroll', (event) => {
	        	let params = {
	        		'top': element.scrollTop,
	        		'height': element.scrollHeight
	        	};
	        	if( params.height - (params.top + element.offsetHeight + 2) <  0) {
	        		this.changeStatus();
	        	}
	        });
		},

		methods: {
			...mapMutations({
				setCurrentSwiperIndex: 'setCurrentSwiperIndex'
			}),

			changeStatus() {
				this.setCurrentSwiperIndex(1);
			}
		}
	}
</script>

<style lang='scss' scoped>
	.hide-commodity{
		overflow: hidden;
		height: -webkit-fill-available;
	}
	.sroller-commodity{
		height: 100%;
		overflow: auto;
	}
</style>
