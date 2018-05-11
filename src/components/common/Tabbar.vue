<template>
	<div class="ui-tabbar-wrapper">
		<div class="tabbar-wrapper">
			<ul>
				<li class="item" v-for='item in staticData' v-bind:key="item.key"  v-on:click='setCurrentActive(item)' v-bind:class="{'currentavtive': currentItem == item.link}">
					<img v-bind:src="item.bgurl" v-if='currentItem != item.link'>
					<img v-bind:src="item.activeBgurl" v-if='currentItem == item.link'>
					<span v-if="cartNumber <= 100 && cartNumber > 0 && item.link == 'cart'">{{ cartNumber }}</span>
					<span v-if="cartNumber >= 100  && cartNumber > 0 && item.link == 'cart'">99+</span>
					<a>{{item.name}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				staticData: [
					{
						'name': '首页',
						'link':'home',
						'key': 0,
						'bgurl': require('../../assets/image/tabbar-icon/tabbar_home_nor@2x.png'),
						'activeBgurl': require('../../assets/image/tabbar-icon/tabbar_home_sel@2x.png'),
						'isActive': true
					},
					{
						'name': '分类',
						'link': 'category',
						'key': 1,
						'bgurl': require('../../assets/image/tabbar-icon/tabbar_sort_nor@2x.png'),
						'activeBgurl': require('../../assets/image/tabbar-icon/tabbar_sort_sel@2x.png'),
						'isActive': false
					},
					{
						'name': '购物车',
						'link': 'cart',
						'params': {'type': 1},
						'key': 2,
						'bgurl': require('../../assets/image/tabbar-icon/tabbar_cart_nor@2x.png'),
						'activeBgurl': require('../../assets/image/tabbar-icon/tabbar_cart_sel@2x.png'),
						'isActive': false
					},
					{
						'name': '我的',
						'link': 'profile',
						'key': 3,
						'bgurl': require('../../assets/image/tabbar-icon/tabbar_profile_nor@2x.png'),
						'activeBgurl': require('../../assets/image/tabbar-icon/tabbar_profile_sel@2x.png'),
						'isActive': false
					}
				],
				currentItem: this.$store.state.tabBar.currentTabBar ? this.$store.state.tabBar.currentTabBar : 'home'
			}
		},

		computed: {
			...mapState({
				currentTabBar: state => state.tabBar.currentTabBar,
				cartNumber: state => state.tabBar.cartNumber
			})
		},

		watch: {
			currentTabBar: function(value){
	            let data = this.staticData;
	            for ( let i = 0; i <= data.length-1; i++) {
		    		if(value == data[i].link) {
			            this.currentItem = data[i].link;
			        }
		    	}
        	}
		},

		created(){},

		methods: {

			gotoPage(path) {
				this.$router.push(path)
			},

			setCurrentActive(item) {
				this.currentItem = item.link;
				this.$router.push({ 'name': item.link, 'params': item.params});
			}
		}
	}
</script>

<style scoped lang='scss'>
	.ui-tabbar-wrapper {
		position: fixed;
		left: 0px;
		right: 0px;
		bottom: 0px;
		width: 100%;
		height: auto;
		padding: 0px;
		margin: 0px;
		background-color: #ffffff;
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
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;
					position: relative;
					img {
						@include wh(30px, 30px);
						@include ilc();
						display: $block;
					}
					a {
						@include sc($fontSize, $mainFontColor);
					}
					span {
						position: absolute;
					    right: -5px;
					    background: rgba(242,16,0,1);
					    font-size: 10px;
					    color: #FFFFFF;
					    border-radius: 50%;
					    padding: 2px 4px;
					    top: 0px;
					}
				}
				li.currentavtive {
					a {
						color: #FC2E39;
					}
				}
			}
		}
	}
</style>

