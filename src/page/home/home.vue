<template>
	<div class="container">
		<mt-header class="header" title="首页">
      <header-item slot="left" :icon="require('../../assets/image/change-icon/b0_scan@2x.png')" v-on:onclick="leftClick">
      </header-item> 
      <header-item slot="right" :icon="require('../../assets/image/change-icon/b0_message@2x.png')" v-on:onclick="rightClick">
      </header-item>        
    </mt-header>
		<card-group v-for="(item, index) in getCardGroups" :key="index" :item="item">
		</card-group>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import tabBar from '../../components/common/Tabbar'
	import { HeaderItem } from '../../components/common'
	import { Header, Indicator, Toast } from 'mint-ui'
	import { cardpageGet } from '../../api/network/cardpage'
	import CardGroup from '../cardpage/group/CardGroup'
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
			leftClick() {

			},
			rightClick() {

			},
			isCardItemByStyle(item, itemStyle) {
      let style = item ? item.style : null
      if (style === itemStyle) {
        return true
      }
      return false
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
	}
	.header {
		@include header;
	}
</style>
