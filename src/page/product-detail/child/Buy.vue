<!-- Buy.vue -->
<template>
	<div class="ui-buy-wrapper ui-detail-common" v-if="detailInfo">
		<div class="buy-wrapper header" @click="changeCartState()" v-if="detailInfo.good_stock > 0">
			<p v-if='number <= 0 && chooseinfo.specification.length <= 0'>请选择购买数量分类</p>
			<p v-if='number > 0 || chooseinfo.specification.length > 0'>已选{{chooseinfo.specification.join(',') }},<i v-if="number > 0">数量{{number}}</i></p>
			<img src="../../../assets/image/change-icon/enter@2x.png">
		</div>
		<div class="buy-wrapper header isopacity" v-if="detailInfo.good_stock <= 0">
			<p v-if='number <= 0 && chooseinfo.specification.length < 0'>请选择购买数量分类</p>
			<p v-if='number > 0 || chooseinfo.specification.length > 0'>已选{{chooseinfo.specification.join(',') }},数量{{number}}</p>
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
		      	number: state => state.detail.number,
		      	detailInfo: state => state.detail.detailInfo,
		      	chooseinfo: state => state.detail.chooseinfo
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
			&.isopacity {
				opacity: 0.5;
			}
			p {
				font-size:16px;
				font-family:'PingFangSC-Regular';
				color:rgba(78,84,93,1);
				line-height:20px;
				padding: 0px;
				margin: 0px;
				i {
					font-weight: normal;
					font-style: normal;
				}
			}
			img {
				width:5px;
				height:10px;
				cursor: pointer;
			}
		}
	}
</style>
