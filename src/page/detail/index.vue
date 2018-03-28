<!-- 商品详情 -->
<template>
	<div>
		<!-- header -->
		<v-detail-nav></v-detail-nav>
		<!-- body -->
		<v-detail-swiper></v-detail-swiper>
		<!-- footer -->
	</div>
</template>

<script>
	// header
	import detailHeader from './child/DetailHeader';
	// swiper
	import detailSwiper from './child/swiper';
	// footer
	import detailFooter from './child/footer';
	export default {
		data(){
			return {

			}
		},
		components: {
			'v-detail-nav': detailHeader,
			'v-detail-swiper': detailSwiper,
			'v-detail-footer': detailFooter
		}
	}
</script>

<style lang='scss' scoped>

</style>
