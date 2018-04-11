<!-- Recommend.vue -->
<template>
	<div class="recommend-wrapper">
		<div class="ui-commmon-header">
			<img src="../../assets/image/change-icon/back@2x.png" v-on:click='goBack()'>
			<h3>相关商品</h3>
		</div>
		<div class="ui-recommend-body" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<v-recommend-list v-for="(item, index) in recommendList" :item="item" :productId="item.id" v-bind:key="index"></v-recommend-list>
			<!-- <v-recommend-list v-for="(item, index) in recommendList" :key="index" :item="item" :productId="item.id"></v-recommend-list> -->
			<p class="recommend-no-more" v-if='!isMore'>没有更多了</p>
		</div>
	</div>
</template>

<script>
	import { recommendProductList } from '../../api/network/recommend';
	import productList from '../product/child/ProduceBody';
	export default {
		data() {
			return {
				recommendList: [],
				listParams: {
					"brand": this.$route.params.brand ? this.$route.params.brand : '',
                	"category": this.$route.params.category ? this.$route.params.category : '',
                	"shop": this.$route.params.shop ? this.$route.params.shop : '',
                	"product": this.$route.params.product ? this.$route.params.product : '',
                	"page": 0,
                	"per_page": 10
				},
				loading: false,
				isMore: true
			}
		},

		components: {
			'v-recommend-list': productList
		},

		created(){
			// this.recommendProductList()
		},

		methods: {
			/*
				goBack: 返回到上一页
			 */
			goBack() {
				this.$router.go(-1);
			},

			/*
				recommendProductList: 获取相关商品列表
			 */
			recommendProductList() {
				let params = this.listParams;
				recommendProductList(params.brand, params.category, params.shop, params.product, params.page, params.per_page).then(res => {
					if (res) {
						// Object.assign([], this.recommendList, res.products
						this.recommendList = this.recommendList.concat(res.products);
						this.isMore = res.paged.more;
					}
				})
			},

			/*
				getMore: 无限滚动
			 */
			getMore() {
				this.loading = true;
				this.listParams.page = ++this.listParams.page;
				if (this.isMore) {
					this.loading = false;
					this.recommendProductList(true);
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
.recommend-wrapper {
	background-color: #ffffff;
	.recommend-no-more {
		color: #7C7F88;
		font-size: 12px;
		padding: 0px;
		margin: 0px;
		text-align: center;
    	padding: 10px 0px;
	}
}
/*.ui-recommend-body {
	background-color: #ffffff;
}*/
</style>
