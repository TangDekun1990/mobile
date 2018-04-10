<!-- Buy.vue -->
<template>
	<div class="ui-buy-wrapper ui-detail-common">
		<div class="buy-wrapper header" @click="changeCartState()">
			<p v-if='number <= 0'>请选择购买数量分类</p>
			<p v-if='number > 0'>已选数量{{number}}</p>
			<img src="../../../assets/image/change-icon/enter@2x.png">
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data(){
			return{}
		},

		computed: {
			...mapState({
		      	number: state => state.detail.number
		    })
		},

		methods: {
			...mapMutations({
				saveCartState: 'saveCartState',
				setIsHideCommodity: 'setIsHideCommodity'
			}),

			changeCartState() {
				this.saveCartState(true);
				this.setIsHideCommodity(true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-buy-wrapper {
		.buy-wrapper {
			p {
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:20px;
				padding: 0px;
				margin: 0px;
			}
			img {
				width:5px;
				height:10px;
				cursor: pointer;
			}
		}
	}
</style>
