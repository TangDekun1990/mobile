<!-- Evaluation.vue -->
<template>
	<div class="ui-evaluation">
		<div class="ui-evaluation-header">
			<div class="flex-header">
				<div
					v-for="(item, index) in staticData"
					v-bind:key="item.id"
					v-bind:class="{'active': currentTag == item.value}"
					v-on:click="changeTab(item.value, item.grade)">{{ item.name }}({{subTotal[item.value]}})</div>
			</div>
		</div>
		<div class="ui-evaluation-body" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<div class="list" v-for="(item, index) in reviewList" v-if="reviewList.length > 0">
				<div>
					<span>
						{{ utils.replaceStr(item.author.username)}}
						<span v-bind:class="{'good-review': item.grade == 3, 'medium-review': item.grade == 2, 'bad-review': item.grade == 1}">{{ getGrade(item.grade) }}</span>
					</span>

					<span>{{ getTime(item.created_at)}}</span>
				</div>
				<p> {{ item.content }}</p>
			</div>

			<div class="list-empty" v-if='reviewList.length <= 0'>
				<img src="../../../assets/image/change-icon/goods_evaluation_empty@2x.png">
				<p>本商品暂无评价</p>
			</div>
		</div>
	</div>
</template>

<script>
    import { evaluation } from '../static';
    import { getReviewList, getReviewsubtotal } from '../../../api/network/product';
	export default {
		data() {
			return{
				staticData: evaluation,
				id: this.$route.params.id ? this.$route.params.id : '',
				currentTag: "total",
				grade: 0,
				subTotal: {},
				reviewList: [],
				page: 0,
				loading: false,
				total: 1
			}
		},
		created() {
			this.getReviewTotal();
		},
		methods: {
			getReviewTotal() {
				getReviewsubtotal(this.id).then(res => {
					if (res) {
						this.subTotal = res.subtotal;
					}
				});
			},
			loadMore() {
				this.loading = true;
				this.page = ++this.page;
				if (this.page <= this.total) {
					this.loading = false;
					this.getReviewList(true);
				}
			},
			getReviewList(ispush) {
				let params = {
					"product": this.id,
                	"grade": this.grade,
                	"page": this.page,
					"per_page": 10
				};
				getReviewList(params).then(res => {
					if (res) {
						if (ispush) {
							this.reviewList = this.reviewList.concat(res.reviews);
							// this.productList = this.productList.concat(res.products);
						} else {
							this.reviewList = res.reviews;
						}
						// this.reviewList = res.reviews;
						if (res.paged.more) {
							this.loading = false;
						} else {
							this.loading = true;
						}
						this.total = res.paged.total;
					}
				})
			},
			changeTab(value, grade) {
				this.currentTag = value;
				this.grade = grade;
				this.getReviewList(false);
			},
			getGrade(grade) {
				if (grade == 1) {
					return '差评';
				} else if (grade == 2) {
					return '中评';
				} else {
					return '好评';
				}
			},
			getTime(timestamps) {
				let date = new Date(timestamps * 1000);
				let year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate();
				return  year + '-' + month + '-' + day;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-evaluation {
		.ui-evaluation-header {
			background: #ffffff;
			.flex-header {
				width: auto;
				display: flex;
				display: -webkit-flex;
				display: -moz-flex;
				flex-basis: 100%;
				justify-content:space-around;
				align-content: center;
				align-items: center;
				height: 44px;
				div {
					color: #5C5958;
					font-size: 14px;
					height: 24px;
					border: 0.5px solid #4E545D;
					padding: 0px 9px;
					line-height: 24px;
					text-align: center;
					&.active {
						color: #FFFFFF;
						background: #EF3338;
						border: 0.5px solid transparent;
					}
				}
			}
		}
		.ui-evaluation-body {
			padding: 0px 15px;
			background:rgba(255,255,255,1);
			.list{
				padding: 15px 0px;
				border-bottom: 0.5px solid rgba(232,234,237,1);
				color: #4E545D;
				font-size: 15px;
				div {
					overflow: hidden;
					padding-bottom: 15px;
					display: flex;
				    justify-content: space-between;
				    align-content: center;
				    align-items: center;
					span {
						&:first-child {
							display: flex;
						    justify-content: space-around;
						    align-content: center;
						    align-items: center;
							span {
								margin-left: 15px;
								color: #FFFFFF;
								font-size: 12px;
							}
						}
						&:last-child {
							color:#8F8E94;
							font-size: 12px;
						}
						&.good-review {
							background: url('../../../assets/image/change-icon/b0_comment_good@2x.png') no-repeat;
							width:36px;
						    height:16px;
						    text-align:center;
						    background-size:cover;
						    line-height: 16px;
						}
						&.medium-review {
							background: url('../../../assets/image/change-icon/b0_comment_middle@2x.png') no-repeat;
							width:36px;
						    height:16px;
						    text-align:center;
						    background-size:cover;
						    line-height: 16px;
						}
						&.bad-review {
							background: url('../../../assets/image/change-icon/b0_comment_bad@2x.png') no-repeat;
							width:36px;
						    height:16px;
						    text-align:center;
						    background-size:cover;
						    line-height: 16px;
						}
					}
				}
				p {
					padding: 0px;
					margin: 0px;
					flex-basis: 100%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
			.list-empty {
				position: absolute;
			    top: 50%;
			    left: 50%;
			    transform: translate(-50%, -50%);
			    text-align: center;
			    img {
			    	width: 55px;
			    }
			    p {
			    	color: #7C7F88;
			    	font-size:17px;
			    	padding: 0px;
			    	margin: 0px;
			    	font-weight: normal;
			    }
			}
		}
	}
</style>
