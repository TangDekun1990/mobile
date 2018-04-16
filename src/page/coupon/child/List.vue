<template>
	<div class="ui-coupon-list" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		<!-- 优惠券列表 -->
		<div class="coupon-list" v-for="(item, index) in list" v-if="list.length > 0">
			<img src="../../../assets/image/change-icon/e7_coupon@2x.png" v-if="currentIndex == 0">
			<img src="../../../assets/image/change-icon/e7_coupon_gray@2x.png" v-if="currentIndex != 0">
			<h3>{{ item.name}}</h3>
			<h6>{{ item.name }}</h6>
			<div class="coupon-info">
				<span class="info-item" v-if="item.infos.length > 0">
					<i v-for="(name, index) in item.infos">{{name}}</i>
				</span>
				<span class="info-item">{{item.start_at}} ~ {{ item.end_at}}</span>
				<div v-bind:class="{'flex-end': currentIndex == 0}">
					<span v-if="currentIndex == 2">已使用</span>
					<span v-if="currentIndex == 1">已过期</span>
					<span>A12345678</span>
				</div>
			</div>
		</div>
		<!-- end -->
	</div>
</template>

<script>
// 接口
import { couponList } from '../../../api/network/coupon'

export default {
	data() {
		return {
			currentIndex: 0,  //当前的tab
			list: [],  //优惠券列表
			requestParams: {'page': 0, 'per_page': 10, 'status': 0},  //获取优惠券列表的接口
			loading: false,  //是否加载更多
			isMore: true,  //是否有更多
		}
	},

	computed: {
	},

	methods: {
		/*
		 * setCurrentIndex: 获取当前的tab的id
		 * @param data: tab 点击的数据
		 */
		setCurrentIndex(data) {
			this.currentIndex = data.id;
			this.getCouponList(false);
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

	}
}
</script>

<style lang="scss" scoped>
.ui-coupon-list {
	padding: 10px;
	.coupon-list {
		height: 115px;
		background:rgba(255,255,255,1);
		border-radius: 4px;
		padding: 13px 10px 10px 14px;
		position: relative;
		h3, h6, span {
			padding: 0px;
			margin: 0px;
		}
		img {
			position: absolute;
		    top: 0px;
		    left: 0px;
		    right: 0px;
		    width: 100%;
		}
		h3 {
			color: #F75F5F;
			font-size:18px;
			padding-bottom: 5px;
		}
		h6 {
			color: #8C8F93;
			padding-bottom: 6px;
		}
		div.coupon-info{
			span.info-item{
				color: #8C8F93;
				font-size:12px;
				display: block;
				text-align: right;
				padding-bottom: 6px;
				i {
					font-style: normal;
				}
			}
			div {
				display: flex;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				&.flex-end {
					justify-content: flex-end;
				}
				span {
					color: #8C8F93;
					font-size:12px;
				}
			}
		}
	}
}
</style>


