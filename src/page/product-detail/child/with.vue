<!-- with.vue -->
<template>
	<div class="ui-recommend-wrapper" v-if="list.length > 0">
		<div class="wrapper-swipe">
			<mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :default-index="currentIndex" :stop-propagation='true' :speed='100'>
			  	<mt-swipe-item v-for="(item, index) in list" :key="index">
			  		<div class="image-swipe-wrapper">
						<div v-for="image in item[0]" @click="goDetail(image.id)">
							<img :src="image.photos[0].thumb" v-if="image.photos.length > 0">
							<img src="../../../assets/image/change-icon/default_image_02@2x.png" v-if="image.photos.length <= 0">
							<span>AED {{image.current_price}}</span>
						</div>
			  		</div>
			  	</mt-swipe-item>
			</mt-swipe>
		</div>

		<div class="swiper-indicators" v-if="list.length > 1">
			<div class="ui-indicator">
				<div class="indicator-item" v-for='(item,index) in indicatorArray' v-bind:class="{'active': item.index == currentIndex}"></div>
			</div>
		</div>

		<div class="ui-recommend-all" v-on:click='goRecommend()'>
			查看全部
		</div>

	</div>
</template>

<script>
	import { productAccessoryList } from '../../../api/network/product';
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return{
				list: [],
				indicatorArray: [],
				currentIndex: 0
			}
		},

		created() {
			this.getRecommendList();
		},

		computed: {
	      	...mapState({
				currentProductId: state => state.detail.currentProductId
			})
		},

		methods: {
			/*
				getRecommendList: 获取推荐商品
			*/
			getRecommendList() {
				let params = {
					"product": this.currentProductId ? this.currentProductId : '',
					"page": 1,
					"per_page": 10
				};
				productAccessoryList(params.product, params.page, params.per_page).then(res => {
					if (res) {
						this.list =  this.buildList(res.products);
						this.buildSwipeIndicators();
					}
				});
			},

			/*
				buildList：构建促销展示商品的数据
				@params： res 接口数据返回的促销商品
			*/
			buildList(res) {
				let index = Math.ceil(res.length / 3 );
				let newArray = [];
				if (index) {
					for (let i = 0; i <= index-1; i++) {
						let subArray = [];
						subArray.push(res.slice(i * 3, i * 3 +3));
						newArray.push(subArray);
					}
				}
				return newArray;
			},

			/*
				buildSwipeIndicators: 根据轮播图的长度计算位于底部的按钮的个数
			*/
			buildSwipeIndicators() {
				let photos = this.list;
				for (let i = 0, len = photos.length-1; i <= len; i++) {
					photos[i].index = i;
					this.indicatorArray.push(photos[i]);
				}
			},

			/*
				handleChange: 查看大图的时候滑动大图设置位于底部的按钮的选中状态同时隐藏查看大图的头部信息
				@params: index 当前滑动的图片的index
			 */
			handleChange(index) {
				this.currentIndex = index;
			},

			/*
				goRecommend: 跳转到相关商品页面
			 */
			goRecommend() {
				let params = {};
				params.product = this.currentProductId
				this.$router.push({'name': 'with', 'query': params});
			},

			goDetail(id) {
				let data = Object.assign({}, {'id':id});
				this.$router.push({'name': 'product', 'query': {'id':id}});
			}
		}
	}
</script>

<style lang='scss' scoped>
	.ui-recommend-wrapper {
		padding: 15px 15px 0px 15px;
		background:rgba(255,255,255,1);
		margin-top: 8px;
		margin-bottom: 20px;
		.wrapper-swipe {
			.mint-swipe {
				height: 105px;
				.mint-swipe-items-wrap {
					.mint-swipe-item{
					}
				}
			}
		}

		.swiper-indicators {
			position: relative;
			margin: 25px 0px 10px 0px;
		}

		.ui-recommend-all {
			height:44px;
			background:rgba(255,255,255,1);
			border-top: 1px solid rgba(232,234,237,1);
			font-size:15px;
			font-family:'PingFangSC-Regular';
			color:rgba(78,84,93,1);
			width: 100%;
			flex-basis: 100%;
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
		}

		div.image-swipe-wrapper{
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			div {
				position: relative;
				height: 105px;
				min-width: 90px;
				flex-basis: 105px;
				border: 1px solid #EFEFF4;
				border-radius: 2px;
				img {
					width: 100%;
					height: 100%;
					padding: 0px;
					margin:  0px;
				}
				span {
					position: absolute;
					bottom: 0px;
					width: 100%;
					display: inline-block;
					height: 24px;
					line-height: 24px;
					text-align: center;
					font-size:16px;
					font-family:'PingFangSC-Regular';
					color:rgba(255,255,255,1);
					background:rgba(0,0,0,1);
					opacity:0.5;
					border-radius: 0px 0px 2px 2px ;
				}
			}
		}
	}
</style>
