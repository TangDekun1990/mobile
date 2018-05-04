<template>
	<div class="container">
		<div class="container-header">
			<mt-header class="header" title="我的优惠券">
				<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
				</header-item>
			</mt-header>
			<v-coupon-tab></v-coupon-tab>
		</div>
		<div class="list" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<coupon-item
			class="item"
			v-for="item in list"
			:key="item.id"
			:item="item">
			</coupon-item>
		</div>
		<v-coupon-empty v-if="list.length <= 0"></v-coupon-empty>
	</div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import couponItem from './child/CouponItem'
import couponTab from './child/CouponTab'
import EmptyPage from '../../components/common/EmptyPage'

import { couponList } from '../../api/network/coupon'
export default {
	data() {
		return {
			list: [],  //优惠券列表
			requestParams: {'page': 0, 'per_page': 10, 'status': 0},  //获取优惠券列表的接口
			loading: false,  //是否加载更多
			isMore: true,  //是否有更多
			currentIndex: this.$route.query.index,  //当前的tab
			icon: '../../assets/image/change-icon/e0_coupon@2x.png'
		}
	},

	created() {
		// CODE REVIEW
		this.$on('redener-coupon-list', (data) => {
			if (data) {
				this.requestParams.page = 1;
				this.currentIndex = data.id;
				this.getCouponList(false);
			}
		})
	},

	mounted(){
		// 计算内容高度
	    this.$nextTick( () => {
	    	this.target = document.querySelector('.list');
	    	let totalHeight = 100;
			const target = this.target;
	    	this.utils.fillTheScreen({target, totalHeight});
	    })
	},

	methods: {
		goBack() {
			this.$router.go(-1)
		},
    	/*
		 * getCouponList: 获取优惠券列表
		 */
		getCouponList(ispush) {
		 	let data = this.requestParams;
		 	data.status = this.currentIndex;
		 	couponList(data.page, data.per_page, data.status).then(res => {
		 		if (res) {
		 			if (ispush) {
		 				this.list = this.list.concat(res.coupons);
		 			} else {
		 				this.list = Object.assign([], res.coupons);
		 			}
		 			this.isMore = res.paged.more == 1 ? true : false;
		 		}
		 	});
		},
		/*
		 * getMore: 无限滚动加载
		 */
		getMore() {
			this.loading = true;
			this.requestParams.page = ++this.requestParams.page;
			if (this.isMore) {
				this.loading = false;
				this.getCouponList(true);
			}
		}

	},

	components: {
		couponItem,
		'v-coupon-tab': couponTab,
		'v-coupon-empty': EmptyPage
	},

}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	background-color: $mainbgColor;
	height: 100%;
	.container-header {
		position: fixed;
		top: 0px;
		width: 100%;
		height: 100px;
	}
	.list {
		position: absolute;
	    top: 100px;
	    width: 100%;
	    overflow-y: auto;
	    div.container {
	    	height: auto;
	    }
	}
}
.header {
	@include header;
}

.item {
	// height: 125px;
}
</style>

