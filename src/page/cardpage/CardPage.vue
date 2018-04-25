<template>
	<div class="container">
		<mt-header class="header" fixed :title="getTitle">
      <header-item slot="left" isBack v-on:onclick="leftClick">
      </header-item>               
    </mt-header>
		<div class="list">
			<card-group 
				class="section" 
				v-for="(item, index) in getCardGroups" 
				:key="index" 
				:item="item">
			</card-group>
		</div>			
	</div>
</template>

<script>
	import { HeaderItem } from '../../components/common'
	import { Header, Indicator, Toast } from 'mint-ui'
	import { cardpagePreview } from '../../api/network/cardpage'
	import CardGroup from '../cardpage/group/CardGroup'
	export default {
    name: 'CardPage',
		data() {
			return {        
				cardpage: null
			}
		},
		components: {			
			CardGroup
    },
    computed: {
      getTitle () {
        return this.cardpage ? this.cardpage.title : ''
      }
    },
		created: function () {
      Indicator.open()
      let name = this.$route.params.name
			cardpagePreview(name).then(
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
        this.$router.go(-1)
			},
			rightClick() {
			},			
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
