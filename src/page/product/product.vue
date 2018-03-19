<template>
	<div class="product-wrapper">
		<!-- search cart@2x.png-->
		<form  v-on:submit="search()">
			<div class="product-search">
				<img src="../../assets/change-icon/back@2x.png" class="ui-back">
				<input type="search" placeholder="请输入您要搜索的商品" v-model="keyword">
				<img src="../../assets/change-icon/b2_cart@2x.png" class="ui-cart">
			</div>
		</form>
		
		<!-- header -->
		<div class="product-header">
			<ul class="header-list">
				<li class="item" 
					v-for='(item, index) in SORTKEY' 
					v-bind:key='item.id' 
					v-on:click='setActiveSortkey(item)' 
					v-bind:class="{'sortactive': item.id == currentSortKey.id, 'sortnormal' : item.id != currentSortKey.id}">
					<a v-if='!item.isMore'>{{item.name}}</a>
					<a v-if='item.isMore'>{{sortId.name}}</a>
					<img src="../../assets/change-icon/triangle_click@2x.png" v-if='index == 0' v-on:click="isShowDroupMenu()">
				</li>
			</ul>

			<div class="sort-model" v-if='currentSortKey.isMore && isShowMore '>
				<div v-for='(item, index) in sortChild' v-bind:key='item.id' v-on:click='getSortChild(item)' v-bind:class="{'active': item.id == sortId.id}">
					<a>{{item.name}}</a>
					<img src="../../assets/change-icon/c1_choose@2x.png">
				</div>
			</div>
		</div>

		<!-- body -->
		<div class="product-body">
			<!-- list -->
			<div class="flex-wrapper" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div class="list" v-for='item in productList' v-bind:key='item.id'>
					<img class="product-img" v-bind:src="item.photos[0].thumb">
					<span class="promos" v-if="item.activity && item.activity.display_time">促销</span>
					<div class="flex-right">
						<h3 class="title">{{ item.name }}</h3>
						<span class="sub-title">{{ item.desc }}</span>
						<div class="price">
							<span>{{ item.current_price }}</span>
							<span>{{ item.price }}</span>
						</div>
						<div class="sendway">
							<span v-if="item.self_employed">自营</span>
							<span>评论：{{ item.comment_count }}</span>
							<span>收藏：</span>
							<img src="../../assets/change-icon/cart@2x.png">
						</div>
					</div>
				</div>
			</div>

			<!-- 下拉刷新没有更多 -->
			<div class="loading-wrapper" v-if='!loaded'>
				<p v-if='loading'>没有更多了</p>
				<mt-spinner type="fading-circle" color='#26a2ff' :size='60' v-if='!loading'></mt-spinner>
			</div>

			<!-- 商品列表为空 -->
			<div class="wrapper-list-empty" v-if='productList.length <= 0 && !loaded'>
				<div>
					<img src="../../assets/change-icon/goods_empty@2x.png">
					<p>暂无任何商品</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import productItem from '../../components/common/product.component'
	import { SORTKEY, SORTVALUE} from '../../config/const'
	import { getProductlist, getSearch } from '../../service/product'
	export default {
		data() {
			return {
				SORTKEY: SORTKEY,
				currentSortKey: SORTKEY[0],
				sortChild: [],
				sortId: SORTKEY[0].child[0],
				isShowMore: false,
				params: {
					'brand': '',
					'category': '',
					'shop': '',
					'sort_key': '',
					'sort_value': '',
					'page': 0,
					'per_page': 10
				},
				productList: [],
				loading: false,  //是否触发无限滚动， true 不触发， false： 触发
				loaded: true, // 是否加载完毕
				total: '',  //总共页数
				keyword: ""
			}
		},
		components: {
			productItem
		},
		created(){
			this.getUrlParams();
			this.getMore();
			this.getProductList();
		},
		methods: {
	/*
		isShowDroupMenu: 点击图片显示下拉菜单
		setActiveSortkey： 菜单切换
		getSortChild： 点击下拉菜单
		getProductList： 获取商品列表
		getUrlParams： 获取url参数
		search： 搜索
	*/
			setActiveSortkey(item) {
				this.currentSortKey = item
				this.getProductList();
			},
			isShowDroupMenu(){
				let item = this.currentSortKey;
				if (item.isMore) {
					this.isShowMore = !this.isShowMore;
					this.sortChild = this.currentSortKey.child;
				} else {
					this.isShowMore = false;
					this.sortChild = '';
				}
			},
			getSortChild(item) {
				this.sortId = item;
				this.isShowMore = !this.isShowMore;
				this.currentSortKey.selectid = item.id;
				this.getProductList();
			},
			getProductList(ispush) {
				this.loaded = false;
				let data = this.params;

				if(this.currentSortKey.selectid) {
					data.sort_key = this.currentSortKey.child[this.currentSortKey.selectid-1].key;
					data.sort_value = this.currentSortKey.child[this.currentSortKey.selectid-1].value;
				} else {
					data.sort_key = this.currentSortKey.key;
					data.sort_value = this.currentSortKey.value;
				}
				getProductlist(data).then(res => {
					// alert("u111111");
				})
				// getProductlist(data).then(res => {
				// 	if (res) {
				// 		alert("ufyrgfr");
				// 		if (ispush) {
				// 			this.productList = this.productList.concat(res.products);
				// 		} else {
				// 			this.productList = res.products;
				// 		}
				// 		this.total = Math.ceil(res.paged.total / 10);
				// 		this.loading = false;
				// 	}
				// })
			},
			getMore() {
				this.loading = true;
				this.params.page = ++this.params.page;
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
			search() {
				let keyword ={'keyword': this.keyword};
				let params = Object.assign({}, this.params, keyword);
				this.loaded = true;
				getSearch(params).then(res => {
					if (res) {
						this.productList = res.products;
						this.loaded = false;
					}
				})
				return false;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.product-wrapper {
		width: auto;
		height: 100%;
		.product-search {
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
				background: url('../../assets/change-icon/search@2x.png') no-repeat 8px center;
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
		.product-header {
			width: auto;
			ul.header-list{
				display: flex;
				width: auto;
				justify-content: space-around;
				align-content: center;
	    		align-items: center;
	    		border: 1px solid #E8EAED;
	    		border-left: 0px;
	    		border-right: 0px;
	    		li{
	    			padding: 15px 0px;
	    			font-size: 14px;
	    			color: #4E545D;
	    			font-family: 'PingFangSC';
	    			border-bottom: 2px solid transparent;
	    			position: relative;
	    			flex-basis: 100px;
    				text-align: center;
    				img {
    					height: 4px;
					    width: 8px;
					    vertical-align: middle;
    				}
	    		}
	    		li.sortactive {
	    			border-bottom-color: #F23030;
	    			a {
	    				color: #F23030;
	    			}
	    		}
	    		li.sortnormal {
	    			border-bottom-color: transparent;
	    			a {
	    				color: #4E545D;
	    			}
	    		}
			}
			.sort-model {
				position: absolute;
				left: 0px;
				width: 100%;
				z-index: 10;
				div {
					color: #4E545D;
					padding: 15px;
					font-size: 13px;
					font-family: 'PingFangSC';
					background-color: #fff;
					margin: 0px;
					border-bottom: 1px solid #E8EAED;
					cursor: pointer;
					display: flex;
    				width: auto;
    				justify-content: space-between;
    				align-content: center;
    				align-items: center;
					img {
						float: right;
						/*width: 13px;*/
						height: 9px;
					}
					&.active {
						color: #F23030;
					}
				}
			}
		}
		.product-body {
			width: auto;
			.flex-wrapper {
				div.list {
					display: flex;
					width: auto;
					align-items: center;
					justify-content: space-between;
					margin: 11px 10px;
					position: relative;
					img.product-img{
						width: 110px;
						height: 110px;
						flex-basis: 110px;
						position: relative;
					}
					span.promos {
						position: absolute;
						background: url('../../assets/change-icon/label@2x.png') no-repeat;
						width: 36px;
					    height: 19px;
					    color: #FFFFFF;
					    font-size: 10px;
					    top: 0px;
					    background-size: cover;
					    font-weight: 100;
					    line-height: 19px;
					    text-align: left;
    					padding-left: 5px;
					}
					div.flex-right {
						padding-left: 14px;
						width: 100%;
						h3.title {
							color: #4E545D;
							font-size: 16px;
							font-weight: normal;
							font-family: 'PingFangSC';
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							margin-bottom: 8px;
						}
						span.sub-title {
							color: #55595F;
							font-family: 'PingFangSC';
							font-weight: 'Light';
							font-size: 12px;
							display: block;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							margin-bottom: 8px;
						}
						div.price {
							margin-bottom: 8px;
							span {
								font-family: 'PingFangSC';
								&:last-child {
									color: #F23030;
									font-size: 16px;
								}
								&:last-child {
									color: #A4AAB3;
									font-size: 12px;
									text-decoration: line-through;
								}
							}
						}
						div.sendway {
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 12px;
							font-family: 'PingFangSC';
							font-weight: 'Regular';
							span{
								color: #7C7F88;
								&:first-child {
									font-size: 10px;
									color: #F34444;
									padding: 3px;
									border: 1px solid #F34444;
									border-radius: 2px;
								}
							}
							img {
								width: 22px;
								height: 20px;
							}
						}
					}
				}
			}
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