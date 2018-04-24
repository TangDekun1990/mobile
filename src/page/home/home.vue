<template>
	<div class="container">
		<mt-header class="header" fixed title="首页">
      <header-item slot="left" :icon="require('../../assets/image/change-icon/b0_scan@2x.png')" v-on:onclick="leftClick">
      </header-item> 
      <header-item slot="right" :icon="require('../../assets/image/change-icon/b0_message@2x.png')" v-on:onclick="rightClick">
      </header-item>        
    </mt-header>
		<div class="list">
			<card-group 
				class="section" 
				v-for="(item, index) in getCardGroups" 
				:key="index" 
				:item="item" v-on:onClick="onClick">
			</card-group>
		</div>	
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import tabBar from '../../components/common/Tabbar'
	import { HeaderItem } from '../../components/common'
	import { Header, Indicator, Toast } from 'mint-ui'
	import { cardpageGet } from '../../api/network/cardpage'
	import CardGroup from '../cardpage/group/CardGroup'
	import Bus from '../cardpage/bus'
	export default {
		name: 'Home',
		data() {
			return {
				cardpage: null
			}
		},
		components: {
			tabBar,
			CardGroup
		},
		created: function () {
			Indicator.open()
			cardpageGet('index').then(
				(response) => {
					Indicator.close()
					if (response && response.cardpage) {
						this.cardpage = response.cardpage
						// for (let i = 0; i < this.cardpage.groups.length; i++) {
						// 	const element = this.cardpage.groups[i];
						// 	let layout = element ? element.layout : null
						// 	console.log('====================================');
						// 	console.log('layout is :', layout);
						// 	console.log('====================================');
						// }
					}
				}, (error) => {
					Indicator.close()
					Toast(error.errorMsg)
				})
			
			Bus.$on('onClick', item => {
				console.log('====================================');
				console.log('onClick item deeplink is: ', item.link);
				console.log('====================================');
			})
		},
		computed: {
			getCardGroups: function () {
				let groups = this.cardpage ? this.cardpage.groups : []
				return groups
			}
		},
		methods: {
			leftClick() {

			},
			rightClick() {

			},
			onClick() {
				console.log('====================================');
				console.log('onClick');
				console.log('====================================');
			}
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
		margin-bottom: 50px;
	}
	.header {
		@include header;
		border-bottom: 1px solid $lineColor;
	}
	.list {
		margin-top: 44px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.section {
		margin-bottom: 10px;
	}
</style>
