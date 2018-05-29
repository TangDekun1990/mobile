<!-- Buy.vue -->
<template>
	<div class="ui-buy-wrapper ui-detail-common" v-if="detailInfo">
		<div class="buy-wrapper header" @click="changeCartState()" v-if="detailInfo.good_stock > 0">
			<p v-if='number <= 0 && chooseinfo.ids.length <= 0'>请选择购买{{chooseinfo.specification.join(',')}}数量分类</p>
			<p v-if='number <= 0 && chooseinfo.ids.length > 0 '>已选{{chooseinfo.specification.join(',') }},数量{{number+1}}</p>
			<p v-if='number > 0 && chooseinfo.ids.length <= 0'>已选数量{{number}}</p>
			<p v-if='number > 0 && chooseinfo.ids.length > 0 '>已选{{chooseinfo.specification.join(',') }},数量{{number}}</p>
			<img src="../../../assets/image/change-icon/enter@2x.png">
		</div>
		<div class="buy-wrapper header isopacity" v-if="detailInfo.good_stock <= 0">
			<p v-if='number <= 0 && chooseinfo.ids.length <= 0'>请选择购买{{chooseinfo.specification.join(',')}}数量分类</p>
			<p v-if='number <= 0 && chooseinfo.ids.length > 0 '>已选{{chooseinfo.specification.join(',') }},数量{{number+1}}</p>
			<p v-if='number > 0 && chooseinfo.ids.length <= 0'>已选数量{{number}}</p>
			<p v-if='number > 0 && chooseinfo.ids.length > 0 '>已选{{chooseinfo.specification.join(',') }},数量{{number}}</p>
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

		created() {},

		watch: {
			detailInfo: function(value) {
				this.setSpecification();
			}
		},

		methods: {
			...mapMutations({
				saveCartState: 'saveCartState',
				saveChooseInfo: 'saveChooseInfo',
				changeType: 'changeType'
			}),

			changeCartState() {
				this.saveCartState(true);
				this.changeType('加入购物车');
			},

			setSpecification() {
				if (this.detailInfo && this.detailInfo.properties) {
					let data = this.detailInfo.properties;
					let arrays = [];
					for (let i = 0; i <= data.length -1; i++) {
						arrays.push(data[i].name);
					}
					this.saveChooseInfo({'specification': arrays, 'ids': []});
				}
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
