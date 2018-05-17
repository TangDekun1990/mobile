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

		computed: mapState({
			isHideCart: state => state.detail.isHideCart,
			isHideHeader: state => state.detail.isHideHeader
		}),

		mounted() {
		},

		beforeRouteEnter(to, from, next) {
			next( (vm) => {
				if (to.name == 'detail' && from.name) {
					window.location.reload();
				}
			})
		},

		beforeRouteUpdate (to, from, next) {
			next();
			window.location.reload();
		},

		beforeRouteLeave (to, from , next) {
			if (from.name == 'detail' && to.name != 'recommend' && to.name != 'with') {
				window.location.reload();
			}
			next();
		},

		// watch: {
		//     $route (to, from) {
		//     	window.location.reload();
		//     }
		// },

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
