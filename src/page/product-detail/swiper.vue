<!-- 商品详情  -->
<template>
	<div class="ui-detail-swiper" v-bind:class="{'hide-promotion-bottom': ispromotion}">
		<commodity v-if="index == 0"></commodity>
		<aspect v-if="index == 1"></aspect>
		<review v-if="index == 2"></review>
	</div>
</template>

<script>
	import commodity from './child/commodity'
	import aspect from './child/aspect'
	import review from './child/Evaluation'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {}
		},

		props: ['isStock'],

		components: {
			commodity,
			aspect,
			review
		},

		computed: {
	      	...mapState({
				index: state => state.detail.index,
				ispromotion: state => state.detail.ispromotion
			})
		},

		watch: {},

		mounted() {},

		created() {},

		methods: {
			...mapMutations({})
		}
	}
</script>

<style lang='scss' scoped>
	.ui-detail-swiper {
		position: absolute;
		width: auto;
		top: 60px;
		bottom: 50px;
		left: 0px;
		right: 0px;
		overflow: auto;
		background: rgba(240,242,245,1);
		&.has-goods-stock {
			bottom: 82px;
		}
		&.hide-promotion-bottom {
			bottom: 0px;
		}
	}
	.swiper-container {
		height: 100%;
		.swiper-slide {
			overflow: auto;
		}
	}
</style>
