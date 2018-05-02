<template>
	<div class="container">
		<div class="list">
			<card-group 
				class="section" 
				v-for="(item, index) in getCardGroups" 
				:key="index" 
				:item="item">
			</card-group>
		</div>	
		<home-header class="header"></home-header>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import tabBar from '../../components/common/Tabbar'
	import { HeaderItem } from '../../components/common'
	import { Header, Indicator, Toast } from 'mint-ui'
	import { cardpageGet } from '../../api/network/cardpage'
	import CardGroup from '../cardpage/group/CardGroup'
	import HomeHeader from './child/HomeHeader';
	export default {
		name: 'Home',
		data() {
			return {
				cardpage: null
			}
		},
		components: {
			tabBar,
			CardGroup,
			HomeHeader,
		},
		created: function () {
			Indicator.open()
			cardpageGet('index').then(
				(response) => {
					Indicator.close()
					if (response && response.cardpage) {
						this.cardpage = response.cardpage
						for (let i = 0; i < this.cardpage.groups.length; i++) {
							const element = this.cardpage.groups[i];
							let layout = element ? element.layout : null
							// console.log('====================================');
							// console.log('layout is :', layout);
							// console.log('====================================');
						}
					}
				}, (error) => {
					Indicator.close()
					Toast(error.errorMsg)
				})
		},
		computed: {
			getCardGroups: function () {
				let groups = this.cardpage ? this.cardpage.groups : []
				return groups
			}
		},
		methods: {						
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
	}
	.header {
		background-color: #ffffff;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		border-bottom: 1px solid $lineColor;
	}
	.list {
		margin-top: 44px;
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.section {
		margin-bottom: 10px;
	}
</style>
