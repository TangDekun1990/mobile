<!-- 商品详情  -->
<template>
	<div class="ui-detail-swiper" v-bind:class="{'height-wrapper': isHideCart, 'has-goods-stock': isStock <= 0}">
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

	// import { productGet } from '../../api/network/product'

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
	                direction:  'horizontal',
	                initialSlide: 0
	            },
	            productId: this.$route.params.id ? this.$route.params.id : '', //商品id
	            scroll: 0
			}
		},

		props: ['isStock'],

		components: {
			commodity,
			aspect,
			review
		},

		computed: {
	      	...mapState({
				isHideCart: state => state.detail.isHideCart,
				isHideHeader: state => state.detail.isHideHeader,
				isComment: state => state.detail.isComment,
				currentSwiperIndex: state => state.detail.currentSwiperIndex,
				detailInfo: state => state.detail.detailInfo
			}),

			swiper() {
	        	return this.$refs.mySwiper.swiper
	      	}
		},

		watch: {
			currentSwiperIndex: function(value) {
				this.$refs.mySwiper.swiper.slideTo(value, 1000, false);
			},

			isComment: function(value) {
				if (value) {
					this.$refs.mySwiper.swiper.slideTo(2, 1000, false);
					this.setIndex(2);
					this.commentStatus(false);
				}
			}
		},

		mounted() {
			this.$refs.mySwiper.swiper.on('slideChangeTransitionEnd', () => {
	            this.setIndex(this.$refs.mySwiper.swiper.activeIndex);
	        });
		},

		created() {
		},

		methods: {
			...mapMutations({
				'setSwiperIndex': 'setCurrentSwiperIndex',
				'saveDetailInfo': 'saveDetailInfo',
				'commentStatus': 'changeIsComment'
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
		background: rgba(240,242,245,1);
		&.has-goods-stock {
			bottom: 82px;
		}
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
