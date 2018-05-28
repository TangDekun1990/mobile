<!-- 商品详情 -->
<template>
	<div class="product-detail-wrapper" v-if="productDetail">
		<!-- header  -->
		<v-detail-nav></v-detail-nav>
		<!-- body -->
		<v-detail-swiper :isStock="productDetail.good_stock"></v-detail-swiper>
		<!-- footer -->
		<v-detail-footer></v-detail-footer>
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
						if (this.productDetail.photos) {
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
		position: relative;
	}
</style>
