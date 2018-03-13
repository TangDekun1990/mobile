<template>
	<div class="ui-tabbar-wrapper">
		<div class="tabbar-wrapper">
			<ul>
				<li class="item" v-for='item in staticData' v-bind:key="item.key">
					<img v-bind:src="item.bgurl">
					<a v-bind:href="item.link">{{item.name}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				staticData: [
					{
						'name': '首页', 
						'link':'/home', 
						'key': 0, 
						'bgurl': require('../../assets/tabbar-icon/tabbar_home_nor@2x.png'),
						'activeBgurl': require('../../assets/tabbar-icon/tabbar_home_sel@2x.png')
					},
					{
						'name': '分类', 
						'link': '/category', 
						'key': 1, 
						'bgurl': require('../../assets/tabbar-icon/tabbar_sort_nor@2x.png'),
						'activeBgurl': require('../../assets/tabbar-icon/tabbar_sort_sel@2x.png')
					},
					{
						'name': '购物车', 
						'link': '/cart', 
						'key': 2, 
						'bgurl': require('../../assets/tabbar-icon/tabbar_cart_nor@2x.png'),
						'activeBgurl': require('../../assets/tabbar-icon/tabbar_cart_sel@2x.png')
					},
					{
						'name': '我的', 
						'link': '/profile', 
						'key': 3, 
						'bgurl': require('../../assets/tabbar-icon/tabbar_profile_nor@2x.png'),
						'activeBgurl': require('../../assets/tabbar-icon/tabbar_profile_sel@2x.png')
					}
				]
			}
		},
		methods: {
			gotoPage(path) {
				this.$router.push(path)
			}
		}
	}
</script>

<style scoped lang='scss'>
	@import 'src/style/_variable.scss';
	@import 'src/style/mixin.scss';
	.ui-tabbar-wrapper {
		width: 100%;
		height: auto;
		padding: 0px;
		margin: 0px;
		background-color: $mainbgColor;
		@include pb();
		border-top: 1px solid #F0F2F5;
		.tabbar-wrapper {
			ul {
				display: flex;
				-webkit-display: flex;
				-moz-display: flex;
				width: auto;
				justify-content: space-around;
				align-content: center;
	    		align-items: center;
	    		height: 50px;
				li {
					font-family: $fontFamily;
					img {
						@include wh(20px, 20px);
						@include ilc();
						display: $block;
					}
					a {
						@include sc($fontSize, $fontColor);
					}
				}
			}
		}
	}
</style>

