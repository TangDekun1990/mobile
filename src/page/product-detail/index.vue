<!-- 商品详情 -->
<template>
	<div class="product-detail-wrapper">
		<!-- header  -->
		<v-detail-nav v-if='!isHideHeader'></v-detail-nav>
		<!-- body -->
		<v-detail-swiper :isStock="productDetail.good_stock"></v-detail-swiper>
		<!-- footer -->
		<v-detail-footer v-if='!isHideCart'></v-detail-footer>
	</div>
</template>

<script>
	// header
	import detailHeader from './DetailHeader';
	// swiper
	import detailSwiper from './swiper';
	// footer
	import detailFooter from './footer';
	// 获取详情
	import { getProductDetail } from '../../api/network/product';
	import { mapState, mapMutations } from 'vuex';
	export default {
		data(){
			return {
				productId: this.$route.params.id ? this.$route.params.id : '',
				productDetail: {},
				hideFooter: false
			}
		},

		components: {
			'v-detail-nav': detailHeader,
			'v-detail-swiper': detailSwiper,
			'v-detail-footer': detailFooter
		},

		created(){
			this.getDetail();
			this.saveCartState(false);
		},

		watch: {
		    // '$route': function (route) {
		    //    this.productId = route.params.id;
		    //    this.getDetail();
		    // }
		},

		computed: mapState({
			isHideCart: state => state.detail.isHideCart,
			isHideHeader: state => state.detail.isHideHeader
		}),

		mounted() {
		    // 计算内容高度
		    // const target = document.querySelector('.ui-detail-swiper')
		    // const totalHeight = 50 + 44;
		    // this.fillTheScreen({target, totalHeight})
		},

		methods: {
			...mapMutations({
				saveInfo: 'saveDetailInfo',
				saveCartState: 'saveCartState'
			}),

			/*
				getDetail: 获取商品详情， 并且存入状态管理
			*/
			getDetail() {
				this.saveInfo();
				getProductDetail(this.productId).then(res => {
					if (res) {
						this.productDetail = res.product;
						this.saveInfo(res.product);
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.product-detail-wrapper {
		height: 100%;
		width: auto;
		position: relative;
	}
</style>
