<!-- ProduceHeader.vue -->
<template>
	<div class="ui-product-header">
		<form action="#" v-on:submit.prevent="search($event)">
			<div class="search">
				<img src="../../../assets/image/change-icon/back@2x.png" class="ui-back" @click="goBack()">
				<input type="search" placeholder="请输入您要搜索的商品" v-model="keyword" autocomplete="off">
				<img src="../../../assets/image/change-icon/b2_cart@2x.png" class="ui-cart">
			</div>
		</form>
	</div>
</template>

<script>
	import { getSearch } from '../../../api/network/product';
	import { mapState, mapMutations } from 'vuex';
	export default {
		props:['item', 'value'],
		data() {
			return {
				keyword: this.value ? this.value : '',
				isAuto: false
			}
		},
		created(){
			if (this.value) {
				this.search();
			}
		},
		computed: mapState({
			isSearch: state => state.product.isSearch
		}),
		watch: {
			keyword: function(value) {
				if (value.length > 0) {
					this.changeSearch(true);
				} else {
					this.changeSearch(false);
				}
			}
		},
		methods: {
			...mapMutations({
				changeSearch: 'changeSearch'
			}),
			search(e) {
				// this.changeSearch(true);
				let data = {
					'isSearch': this.isSearch,
					'keyword': this.keyword
				};
				this.$parent.$emit('change-list', data);
				if (e) {
					this.utils.stopPrevent(e);
				}
			},
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-product-header {
		div.search {
			display: flex;
			width: auto;
			height: auto;
			padding: 6px;
			justify-content: space-around;
			align-content: center;
	    	align-items: center;
			img.ui-back {
				height: 16px;
			}
			input{
				flex-basis: 200px;
				border-radius: 16px;
				border: 0px;
				background: url('../../../assets/image/change-icon/search@2x.png') no-repeat 8px center;
				background-size: 16px;
				background-color: #E9ECF0;
				padding: 9px;
				padding-left: 30px;
				color: #A4AAB3;
				font-family: 'PingFangSC';
				font-size: 14px;
				height: 32px;
				border: 0px;
				padding-top: 0px;
				padding-bottom: 0px;
				&:focus {
					outline-offset: 0px;
					outline: none;
				}
			}
			img.ui-cart {
				width: 22px;
				height: 20px;
			}
		}
	}
</style>
