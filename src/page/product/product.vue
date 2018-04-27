<template>
	<div class="ui-product">
		<div class="product-header">
			<!-- 商品头部 -->
			<product-header ref='header' :value="params.keyword"></product-header>
			<!-- 商品筛选 -->
			<product-filter ref='filter'></product-filter>
		</div>
		<!-- 商品列表 -->
		<div class="product-body"
			v-bind:class="{'hide-product-list': isShowProductModel, 'show-product-list': !isShowProductModel}"
		>
			<!-- 无限加载滚动列表 -->
			<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<product-body :item="item" v-for='(item, index) in productList' v-bind:key='item.id' :productId="item.id" :requestparams="params"></product-body>
				<div class="loading-wrapper">
					<p v-if='!isMore'>没有更多了</p>
					<mt-spinner type="fading-circle" color='#26a2ff' :size='60' v-if='isMore'></mt-spinner>
				</div>

				<div class="wrapper-list-empty" v-if='productList.length <= 0 && !isMore'>
					<div>
						<img src="../../assets/image/change-icon/goods_empty@2x.png">
						<p>暂无任何商品</p>
					</div>
				</div>
				<div class="show-product-model" v-if='isShowProductModel' @click="closeProductModel()"></div>
			</div>
		</div>
		<!-- 回到顶部 -->
		<v-back-top v-if="productList.length > 10" :target="target" ></v-back-top>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	import productHeader from './child/ProduceHeader';
	import productBody from './child/ProduceBody';
	import productFilter from './child/ProductFilter';

	import { productList } from '../../api/network/product';
	import { searchProductList } from '../../api/network/search';

	import BackTop from '../../components/common/BackTop';

	export default {
		components: {
			productHeader,
			productFilter,
			productBody,
			'v-back-top': BackTop
		},
		data(){
			return {
				params: {
					'brand': this.$route.query.brand ? this.$route.query.brand : '',
					'category': this.$route.query.category ? this.$route.query.category : '',
					'shop': this.$route.query.shop ? this.$route.query.shop : '',
					'sort_key': 0,
					'sort_value': 2,
					'page': 0,
					'per_page': 10,
					'keyword': this.$route.query.keywords ? this.$route.query.keywords : ''
				},
				productList: [],  //商品列表
				loading: false,  //是否加载更多
				isMore: true  //是否有更多
			}
		},


		computed: mapState({
			isShowProductModel: state => state.product.isShowProductModel
		}),

		created(){
			//todo
			this.getUrlParams();

			this.$on('change-list', (data) => {
				let res = data;
				this.params.page = 1;
				this.productList = [];
				this.loading = false;
				this.setParamsByData(res);
				this.getProductList();
			});

			this.$on('get-cart-quantity', () => {
				this.$refs.header.getCarNumber();
			})
		},

		mounted(){
			// 计算内容高度
		    this.$nextTick( () => {
		    	this.target = document.querySelector('.product-body');
		    	let totalHeight = 98;
				const target = this.target;
		    	this.utils.fillTheScreen({target, totalHeight});
		    });
		},

		methods: {

			...mapMutations({
				changeIsShowProductModel: 'changeIsShowProductModel'
			}),

			/*
			 * closeProductModel: 关闭筛选模态框
			 */
			closeProductModel() {
				this.changeIsShowProductModel(false);
				this.$refs.filter.closeFiler();
			},

			/*
			 * getMore: 无限滚动加载
			 */
			getMore() {
				this.loading = true;
				this.params.page = ++this.params.page;
				if (this.isMore) {
					this.loading = false;
					this.getProductList(true);
				}
			},

			/*
			 *  getUrlParams: 获取url上的参数
			 *  @param： category
			 *  @param: brand
			 *  @param: shop
			 *  @param: keywords
			 */
			getUrlParams() {
				console.log(this.$route.query);
				// this.params.brand = this.$route.query.brand ? this.$route.query.brand : '';
				// this.params.category = this.$route.query.category ? this.$route.query.category : '';
				// this.params.shop = this.$route.query.shop ? this.$route.query.shop : '';
				// this.params.keyword = this.$route.query.keywords ? this.$route.query.keywords : '';
			},

			/*
			 * getProductList: 获取商品列表
			 * @param：  ispush ？ true ：false 是否需要向商品列表追加数据
			 */
			getProductList(ispush) {
				let data = this.params;
				if (data.keyword) {
					searchProductList(data.brand, data.category, data.shop, data.keyword, data.sort_key, data.sort_value, data.page, data.per_page).then(res => {
						this.buildData(ispush, res);
					});
				} else {
					productList(data.brand, data.category, data.shop, data.sort_key, data.sort_value, data.page, data.per_page).then(res => {
						this.buildData(ispush, res);
					});
				}
			},

			/*
			 *  getList: 构建数据
			 *  @param: ispush 是否改变向元数据追加数据
			 *  @param: res 接口请求返回的数据
			 */
			buildData(ispush, res) {
				if (res) {
					if (ispush) {
						this.productList = this.productList.concat(res.products);
					} else {
						this.productList = res.products;
					}
					this.isMore = res.paged.more == 1 ? true : false;
				}
			},

			/*
				setLocal: 历史搜索
			 */
			setLocal(key) {
				let current = this.utils.fetch('keyword');
				current.push(''+ key+'');
				current = this.utils.arrayFilter(current);
				this.utils.save('keyword', current);
			},

			/*
			 * setParamsByData 根据事件传递的值来对请求列表重新赋值
			 * @param data 事件传递的参数
			 */
			setParamsByData(data) {
				let params = this.params;
				for (let item in params) {
					for (let list in data) {
						if ( item == list) {
							params[item] = data[list];
						}
					}
				}
				return params;
			}
		}
	}
</script>


<style lang='scss' scoped>
	.ui-product {
		width: auto;
		background-color: #ffffff;
		.product-header {
			background-color: #ffffff;
			position: absolute;
			top: 0px;
			width: 100%;
		}
		div.product-body{
			position: absolute;
			top: 98px;
			background-color: #ffffff;
			width: 100%;
			height: auto;
			overflow: auto;
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
	.hide-product-list{
		overflow: hidden;
		height: 80vh;
	}
	.show-product-list {
		height: 100%;
		overflow: auto;
	}
	.show-product-model {
		background: rgba(0, 0, 0, 0.5);
		overflow: hidden;
		height: 100%;
		position: fixed;
		top: 100px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}
</style>

