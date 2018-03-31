<!-- 商品详情  -->
<template>
	<div class="ui-detail-swiper" v-bind:class="{'height-wrapper': isHideCart}">
		<swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide v-for="(item, index) in list" :key="index">
            	<keep-alive>
					<component :is="item.component">{{ item.component }}</component>
				</keep-alive>
            </swiper-slide>
        </swiper>
	</div>
</template>

<script>
	import commodity from './child/commodity'
	import aspect from './child/aspect'
	import review from './child/Evaluation'

	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				list: [
					{component: commodity},
					{component: aspect},
					{component: review}
				],
				swiperOption: {
	                width: window.innerWidth,
	                direction:  'horizontal'
	            },
	            currentSwiperIndex: 0
			}
		},
		components: {
			commodity,
			aspect,
			review
		},
		computed: {
	      	...mapState({
				isHideCart: state => state.detail.isHideCart,
				isHideHeader: state => state.detail.isHideHeader
			}),
			swiper() {
	        	return this.$refs.mySwiper.swiper
	      	}
		},
		props: ['index'],
		watch: {
			index: function(value) {
				this.$refs.mySwiper.swiper.slideTo(value, 1000, false);
			}
		},
		mounted() {
			this.currentSwiperIndex = this.swiper.activeIndex;
			this.$refs.mySwiper.swiper.on('slideChangeTransitionEnd', () => {
	            this.setIndex(this.$refs.mySwiper.swiper.activeIndex);
	        });
		},
		created(){},
		methods: {
			...mapMutations({
				'setSwiperIndex': 'setCurrentSwiperIndex'
			}),
			setIndex(activeIndex) {
	            this.setSwiperIndex(activeIndex);
	        }
		}
	}
</script>

<style lang='scss' scoped>
	.ui-detail-swiper {
		position: absolute;
		width: auto;
		top: 44px;
		bottom: 50px;
		left: 0px;
		right: 0px;
		overflow: auto;
	}
	.swiper-container {
		height: 100%;
		.swiper-slide {
			overflow: auto;
		}
	}
	.height-wrapper {
		top: 0px;
		bottom: 0px;
	}
</style>
