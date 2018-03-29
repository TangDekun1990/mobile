<!-- 商品详情 -->
<template>
	<div class="ui-detail-swiper">
		<mt-swipe :auto="0" :show-indicators="false">
		 	<mt-swipe-item v-for="(item, index) in list" :key="index" :default-index='swiperIndex'>
		 		<keep-alive>
					<component :is="item.component">{{ item.component }}</component>
				</keep-alive>
		 	</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import commodity from './child/commodity';
	import aspect from './child/aspect';
	import review from './child/Evaluation';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				list: [
					{'path': '/commodity', component: commodity},
					{'path': '/aspect', component: aspect},
					{'path': '/review', component: review}
				]
			}
		},
		components: {
			commodity,
			aspect,
			review
		},
		computed: mapState({
			swiperIndex: state => state.detail.swiperIndex
		}),
		mounted() {},
		created(){},
		methods: {
		}
	}
</script>

<style lang='scss' scoped>
	.mint-swipe-items-wrap {
		overflow: auto;
	}
	.ui-detail-swiper {
		height: 100%;
		.mint-swipe {
			height: 100%;
			overflow: auto;
			.mint-swipe-item {
				overflow: auto;
			}
		}
	}
</style>
