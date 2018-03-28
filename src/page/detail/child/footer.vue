<!-- footer.vue -->
<template>
	<div class="ui-detail-footer">
		<div class="footer-flex">
			<div class="left">
				<img src="../../../assets/image/change-icon/b0_cart@2x.png">
				<div class="price">
					<span>AED 149.74</span>
					<span>AED 49.25</span>
				</div>
			</div>
			<div class="right" v-on:click="addShopping()">加入购物车</div>
		</div>

		<shopping v-if='isShow' :info="productinfo"></shopping>
	</div>
</template>

<script>
	import shopping from './Shopping';
	export default {
		data() {
			return {
				isShow: false
			}
		},
		components: {
			shopping
		},
		props: ['productinfo'],
		created(){
			this.$on('close-add-shopping', (data) => {
				this.isShow = false;
			});
		},
		methods: {
			addShopping() {
				this.isShow = true;
			}
		}
	}
</script>

<style lang='scss'>
	.ui-detail-footer {
		background:rgba(255,255,255,1);
		box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1);
		width: auto;
		.footer-flex {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			height:50px;
		}
		div.left{
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
				padding: 0px 10px;
				/*box-shadow: 0px 0.5px 0px 0px rgba(232,234,237,1), -0.5px 0px 0px 0px rgba(232,234,237,1)*/
			}
			div.price {
				padding-left: 15px;
				border-left: 1px solid #E8EAED;
				span {
					display: block;
					font-weight: normal;
					&:first-child {
						font-size:16px;
						font-family:'HelveticaNeue';
						color:rgba(239,51,56,1);
						line-height:20px;
					}
					&:last-child {
						font-size:12px;
						font-family:'HelveticaNeue';
						color:rgba(164,170,179,1);
						line-height:20px;
						text-decoration: line-through;
					}
				}
			}
		}
		div.right {
			width:120px;
			height:50px;
			background:rgba(239,51,56,1);
			font-size:16px;
			font-family:'PingFangSC-Regular';
			color:rgba(255,255,255,1);
			text-align: center;
			line-height: 50px;
			cursor: pointer;
		}
	}
</style>
