<template>
	<div class="product-wrapper">
		<!-- search cart@2x.png-->
		<form action="search()">
			<div class="product-search">
				<img src="../../assets/change-icon/back@2x.png" class="ui-back">
				<input type="search" placeholder="请输入您要搜索的商品">
				<img src="../../assets/change-icon/search@2x.png" class="ui-cart">
			</div>
		</form>
		
		<!-- header -->
		<div class="product-header">
			<ul class="header-list">
				<li class="item" 
					v-for='item in SORTKEY' 
					v-bind:key='item.id' 
					v-on:click='setActiveSortkey(item)' 
					v-bind:class="{'sortactive': item.id == currentSortKey.id, 'sortnormal' : item.id != currentSortKey.id}">
					<a v-if='!item.isMore'>{{item.name}}</a>
					<a v-if='item.isMore'>{{sortId.name}}</a>
				</li>
			</ul>

			<div class="sort-model" v-if='currentSortKey.isMore && isShowMore '>
				<div v-for='(item, index) in sortChild' v-bind:key='item.id' v-on:click='getSortChild(item)' v-bind:class="{'active': item.id == sortId.id}">
					<a>{{item.name}}</a>
					<img src="../../assets/change-icon/d1-yes@2x.png">
				</div>
			</div>
		</div>

		<!-- body -->
		<div class="product-body">
			<div class="flex-wrapper" v-infinite-scroll="getProductList" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
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
			<div class="loading-wrapper" v-if='loaded'>
				<p v-if='loading'>没有更多了</p>
				<mt-spinner type="fading-circle" color='#26a2ff' :size='60' v-if='!loading'></mt-spinner>
			</div>
		</div>

	</div>
</template>

<script>
	import productItem from '../../components/common/product.component'
	import { SORTKEY, SORTVALUE} from '../../config/const'
	import { getProductList } from '../../service/product'
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
				loading: false,
				loaded: true
			}
		},
		components: {
			productItem
		},
		created(){
			this.getUrlParams();
		},
		methods: {
			setActiveSortkey(item) {
				this.currentSortKey = item
				if (item.isMore) {
					this.isShowMore = !this.isShowMore;
					this.sortChild = this.currentSortKey.child;
				} else {
					this.isShowMore = false;
					this.sortChild = '';
				}
				this.getProductList();
			},
			getSortChild(item) {
				this.sortId = item;
				this.isShowMore = !this.isShowMore;
				this.getProductList();
			},
			getProductList() {
				// debugger;
				// let routerParams = this.$route.params;
				// this.params = Object.assign({}, this.params, routerParams);

				this.loading = false;
				this.loaded = true;
				this.params.page = ++this.params.page;
				let data = this.params;
				// 下拉框展示
				if (this.isShowMore) {
					data.sort_key = this.sortId.key;
					data.sort_value = this.sortId.value;
				} else {
					data.sort_key = this.currentSortKey.key;
					data.sort_value = this.currentSortKey.value;
				}
				console.log(data);
				getProductList(data).then(res => {
					if (res) {
						this.productList = this.productList.concat(res.products);
						if (res.paged.more) {
							this.loading = false;
						} else {
							this.loading = true;
						}
						this.loaded = false;
					}
				})
			},
			getUrlParams() {
				let routerParams = this.$route.params;
				this.params.category = routerParams.category;
				// this.params.brand = routerParams.brand;
				// this.params.shop = routerParams.shop;
				// debugger;
				// this.params = Object.assign({}, this.params, routerParams);
			},
			search() {
				
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
						width: 13px;
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
		}

	}
</style>