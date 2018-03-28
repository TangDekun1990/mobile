<!-- Buy.vue -->
<template>
	<div class="ui-buy-wrapper">
		<div class="buy-wrapper" v-on:click='changeCartState()'>
			<p>请选择购买数量分类</p>
			<img src="../../../assets/image/change-icon/enter@2x.png">
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { mapMutations } from 'vuex';
	export default {
		data(){
			return{}
		},
		methods: {
			...mapMutations({
				saveCartState: 'saveCartState'
			}),
			changeCartState() {
				this.saveCartState(true);
				// this.$parent.$emit('show-cart', {'isshow': true});
			}
		}
	}
</script>

<style lang="scss">
	.ui-buy-wrapper {
		padding: 15px;
		background-color: #ffffff;
		margin-top: 8px;
		.buy-wrapper {
			display: flex;
			width: auto;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			p {
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:20px;
			}
			img {
				width:5px;
				height:10px;
				cursor: pointer;
			}
		}
	}
</style>
