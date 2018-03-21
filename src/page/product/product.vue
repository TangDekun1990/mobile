<template>
	<div class="ui-product">
		<product-header v-bind:item="params" :list="productList" ref='header' :value="keyword"></product-header>

		<product-filter :keyword="keyword"></product-filter>

		<div class="product-body">

			<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<product-body :item="item" v-for='(item, index) in productList' v-bind:key='item.id'></product-body>
			</div>

			<div class="loading-wrapper">
				<p v-if='!isMore && productList.length > 0'>没有更多了</p>
				<mt-spinner type="fading-circle" color='#26a2ff' :size='60' v-if='!loading'></mt-spinner>
			</div>

			<div class="wrapper-list-empty" v-if='productList.length <= 0 && loading'>
				<div>
					<img src="../../assets/image/change-icon/goods_empty@2x.png">
					<p>暂无任何商品</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import productHeader from './child/ProduceHeader';
	import productBody from './child/ProduceBody';
	import productFilter from './child/ProductFilter';
	import { getproductList, getSearch } from '../../api/network/product';
	export default {
		components: {
			productHeader,
			productFilter,
			productBody
		},
		data(){
			return {
				params: {'brand': '', 'category': '', 'shop': '', 'sort_key': 0, 'sort_value': 2, 'page': 0, 'per_page': 10},
				productList: [],
				loading: false,
				isMore: true,
				total: 1,
				isSearch: false,
				keyword: null
			}
		},
		created(){
			this.getUrlParams();
			this.$on('change-list', (data) => {
				let res = data;

				this.params.page = 1;
				this.total = 1;
				this.isSearch = res.isSearch;
				this.productList = [];

				if (res.keyword) {
					this.keyword = res.keyword;
				} else {
					this.keyword = '';
				}

				if (!data.isSearch) {
					this.params = Object.assign({}, this.params, data.value);
				}

				this.loading = false;
				this.getProductList();
			});
		},
		methods: {
			getMore() {
				this.loading = true;
				this.params.page = ++this.params.page;
				// console.log(this.params.page);
				if (this.params.page <= this.total) {
					this.loading = false;
					this.getProductList(true);
				}
			},
			getUrlParams() {
				let routerParams = this.$route.params;
				this.params.category = routerParams.category;
				if (routerParams.keywords) {
					this.keyword = routerParams.keywords;
				}
			},
			getProductList(ispush) {
				let data = this.params;
				if (this.isSearch) {
					data = Object.assign({}, data, {'keyword': this.keyword});
					getSearch(data).then(res => {
						this.getList(ispush, res);
					});
					this.setLocal(data.keyword);
				} else {
					getproductList(data).then(res => {
						this.getList(ispush, res);
					});
				}
			},
			getList(ispush, res) {
				if (res) {
					if (ispush) {
						this.productList = this.productList.concat(res.products);
					} else {
						this.productList = res.products;
					}
					if (res.paged.more) {
						this.isMore = true;
						this.loading = false;
					} else {
						this.isMore = false;
						this.loading = true;
					}
					this.total = res.paged.total;
				}
			},
			setLocal(key) {
				let current = this.utils.fetch('keyword');
				current.push(''+ key+'');
				this.utils.save('keyword', current);
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-product {
		width: auto;
		height: 100%;
		div.product-body{
			.loading-wrapper {
				text-align: center;
				margin-top: 24px;
				p{
					color: #7C7F88;
					font-size: 12px;
					font-family: 'PingFangSC';
					font-weight: 'Regular';
					padding: 0px;
					margin: 0px;
				}
				span {
					display: inline-block;
				}
			}
			.wrapper-list-empty {
				display: flex;
			    justify-content: center;
			    align-content: center;
			    align-items: center;
			    padding-top: 25%;
				div{
				    p {
				    	text-align: center;
				    }
				}
			}
		}
	}
</style>

