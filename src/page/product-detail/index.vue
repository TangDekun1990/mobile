<!-- 商品详情 -->
<template>
	<div class="product-detail-wrapper">
		<!-- header -->
		<v-detail-nav></v-detail-nav>
		<!-- body -->
		<v-detail-swiper></v-detail-swiper>
		<!-- footer -->
		<v-detail-footer :productinfo="productDetail"></v-detail-footer>
	</div>
</template>

<script>
	// header
	import detailHeader from './DetailHeader';
	// swiper
	import detailSwiper from './swiper';
	// footer
	import detailFooter from './footer';

	import { getProductDetail } from '../../api/network/product';

	export default {
		data(){
			return {
				productId: this.$route.params.id ? this.$route.params.id : '',
				productDetail: {}
			}
		},
		components: {
			'v-detail-nav': detailHeader,
			'v-detail-swiper': detailSwiper,
			'v-detail-footer': detailFooter
		},
		created(){
			this.$on('nav-changed', (data) => {
				this.currentIndex = data;
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
	.product-detail-wrapper {
		height: 100%;
	}
</style>
