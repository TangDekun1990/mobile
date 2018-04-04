<template>
	<div class="cart-header-wrapper">
		<h3>购物车</h3>
		<span v-if='!isShowHeader' @click="changeStatus(false, true)">编辑</span>
		<span v-if='isShowHeader' @click="changeStatus(true, false)">完成</span>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data(){
			return {}
		},
		computed: mapState({
			isSelectedAll: state => state.cart.isSelectedAll,
			isShowHeader: state => state.cart.isShowHeader
		}),
		methods: {
			...mapMutations({
				changedAll: 'changedSelectedAll',
				changedHeader: 'changedIsShowHeader'
			}),
			changeStatus(value, isheader) {
				this.changedAll(value);
				this.changedHeader(isheader);
				if (!isheader) {
					this.$parent.$emit('redener-cart-list', true);
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.cart-header-wrapper {
		display: relative;
		height: 44px;
		line-height: 44px;
		top: 0px;
		left: 0px;
		right: 0px;
		width: auto;
		text-align: center;
		background-color: #fff;
		margin-bottom: 6px;
		h3 {
			padding: 0px;
			margin: 0px;
			font-size:17px;
			font-family:'PingFangSC-Regular';
			color:rgba(78,84,93,1);
		}
		span {
			position: absolute;
			right: 15px;
			font-size:15px;
			font-family:'PingFangSC-Regular';
			color:rgba(78,84,93,1);
			display: inline-block;
			height: 44px;
			line-height: 44px;
			top: 0px;
		}
	}
</style>
