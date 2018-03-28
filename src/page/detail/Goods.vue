<!-- Goods.vue -->
<template>
	<div class="ui-goods-wrapper">
		<!-- header -->
		<detail-header v-if='isHideHeader'></detail-header>
		<!-- 商品 -->
		<div class="goods" v-if="currentIndex == 0">
			<goods-swipe v-bind:photos='productDetail'></goods-swipe>
			<detail-info :productinfo="productDetail"></detail-info>
			<detail-buy></detail-buy>
			<detail-concat></detail-concat>
			<detail-like :detaillike="productDetail.collector"></detail-like>
			<goods-review></goods-review>
			<recommend></recommend>
		</div>

		<!-- 详情 -->
		<div class="ui-detail" v-if="currentIndex == 1">
			<detail :url="productDetail.intro_url" :unqie="detail"></detail>
		</div>

		<!-- 评价 -->
		<div class="ui-evaluation" v-if="currentIndex == 2">
			<review></review>
		</div>

		<!-- footer -->
		<div class="footer-wrapper" v-if='isHideCart'>
			<detail-footer :productinfo="productDetail" :showcart="showcart"></detail-footer>
		</div>

		<!-- 加入购物车显示动画 -->
		<!-- <div class="ui-cart-animation">
			<mt-spinner type="snake" color='rgb(239,51,56)'></mt-spinner>
		</div> -->

	</div>
</template>

<script>
import detailHeader from './child/DetailHeader';
import goodsSwipe from './child/GoodsSwipe';
import detail from './child/Details';
import review from './child/Evaluation';
import detailInfo from './child/Detailinfo';
import detailBuy from './child/Buy';
import detailConcat from './child/Concat';
import detailLike from './child/Like';
import goodsReview from './child/Goodsreview';
import recommend from './child/recommend';
import detailFooter from './child/footer';
import shopping from './child/Shopping';

import { getProductDetail } from '../../api/network/product';
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
export default {
	data(){
		return {
			productId: this.$route.params.id ? this.$route.params.id : '',
			productDetail: {},
			currentIndex: 0,
			detail: 'detail',
			showcart: false
		}
	},
	components: {
		goodsSwipe,
		detailHeader,
		detail,
		review,
		detailInfo,
		detailBuy,
		detailConcat,
		detailLike,
		goodsReview,
		recommend,
		detailFooter,
		shopping
	},
	computed: mapState({
			isHideCart: state => state.detail.isHideCart,
			isHideHeader: state => state.detail.isHideHeader
	}),
	created(){
		this.$on('nav-changed', (data) => {
			this.currentIndex = data;
		})
		this.$on('show-cart', (data) => {
			console.log(data);
			this.showcart = data.isshow;
		})
		this.getDetail();
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
	.ui-goods-wrapper {
		height: 100%;
		.goods {
			padding-top: 44px;
			height: 100%;
		}
		.ui-detail {
			height: 100%;
		}

		.footer-wrapper {
			position: fixed;
		    bottom: 0px;
		    width: 100%;
		}

		.ui-cart-animation {
			position: fixed;
		    top: 50%;
		    left: 50%;
		}
	}
</style>
