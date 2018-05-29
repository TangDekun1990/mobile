<!-- 商品详情 -->
<template>
	<div class="product-detail-wrapper" v-if="productDetail">
		<!-- header  -->
		<v-detail-nav v-if='!isPreviewPicture'></v-detail-nav>
		<!-- body -->
		<v-detail-swiper :isStock="productDetail.good_stock"></v-detail-swiper>
		<!-- footer -->
		<v-detail-footer v-if="!isPreviewPicture"></v-detail-footer>
		<!-- 预览图片 -->
		<v-picture v-if="isPreviewPicture" :defaultindex="swipeId" :isshow="isPreviewPicture"></v-picture>
		<!-- 促销信息 -->
		<v-promotion-pop v-if="promoPopstatus" :promo-popstatus="promoPopstatus"></v-promotion-pop>
	</div>
</template>

<script>
	// header
	import detailHeader from './DetailHeader';
	// swiper
	import detailSwiper from './swiper';
	// footer
	import detailFooter from './footer';

	import PreviewPicture from './child/PreviewPicture';
	import PromotionPopup from './child/PromotionPopup'
	// 获取详情
	import { getProductDetail } from '../../api/network/product';
	import { mapState, mapMutations } from 'vuex';
	export default {
		data(){
			return {
				productId: this.$route.query.id ? this.$route.query.id : '',
				productDetail: {},
				hideFooter: false,
				popupVisible: true
			}
		},

		components: {
			'v-detail-nav': detailHeader,
			'v-detail-swiper': detailSwiper,
			'v-detail-footer': detailFooter,
			'v-picture': PreviewPicture,
			'v-promotion-pop': PromotionPopup
		},

		created(){
			this.getDetail();
			this.saveCartState(false);
		},

		computed: mapState({
			isPreviewPicture: state => state.detail.isPreviewPicture,
			swipeId: state => state.detail.swipeId,
			promoPopstatus: state => state.detail.promoPopstatus
		}),

		mounted() {
			this.$nextTick(() => {});
		},

		beforeRouteEnter(to, from, next) {
			next( (vm) => {
				if (to.name == 'detail' && from.name) {
					window.location.reload();
				}
			})
		},

		beforeRouteUpdate (to, from, next) {
			console.log('beforeRouteUpdate');
			next();
			window.location.reload();
		},

		beforeRouteLeave (to, from , next) {
			if (from.name == 'detail' && to.name != 'recommend' && to.name != 'with' && to.name != 'signin' && to.name != 'cart') {
				window.location.reload();
			}
			next();
		},

		methods: {
			...mapMutations({
				saveInfo: 'saveDetailInfo',
				saveCartState: 'saveCartState',
				setCurrentProductId: 'setCurrentProductId'
			}),

			/*
				getDetail: 获取商品详情， 并且存入状态管理
			*/
			getDetail() {
				this.setCurrentProductId(this.productId);
				getProductDetail(this.productId).then(res => {
					if (res) {
						this.productDetail = res.product;
						this.saveInfo(res.product);
						let title = this.productDetail.name;
						let imgUrl = '';
						let desc = '';
						if (this.productDetail.photos && this.productDetail.photos.length > 0 ) {
							imgUrl = this.productDetail.photos[0].thumb;
						}
						if(this.productDetail.desc) {
							desc = this.productDetail.desc;
						}
						this.wxApi.getConfigRes(title, imgUrl, desc);
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
	}
</style>
