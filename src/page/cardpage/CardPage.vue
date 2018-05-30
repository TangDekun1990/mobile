<template>
	<div class="container">
		<mt-header class="header" fixed v-bind:title="getTitle" v-if="isShowHeader">
      <header-item slot="left" isBack v-on:onclick="leftClick">
      </header-item> 
			<div slot="right" class="right-item">
				<img src="../../assets/image/change-icon/b2_cart@2x.png" class="ui-cart" v-on:click='rightClick'>
				<span class="cart-number" v-if="cartNumber > 0 && cartNumber <= 100">{{ cartNumber }}</span>
				<span class="cart-number" v-if="cartNumber >= 100 ">99+</span>
			</div>              
    </mt-header>
		<div class="list" v-bind:style="getTopMargin">
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
	import { mapState } from 'vuex'
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
			...mapState({
				isOnline: state => state.auth.isOnline,
				cartNumber: state => state.tabBar.cartNumber,
			}),
      getTitle () {
        return this.cardpage ? this.cardpage.title : ''
      },
			getCardGroups: function () {
				let groups = this.cardpage ? this.cardpage.groups : []
				return groups
			},
			isShowHeader () {
				if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
					return false
				}
				return true
			},
			getTopMargin () {
				let margin = 44
				if (!this.isShowHeader) {
					margin = 0
				}
				return {
					'margin-top': margin + 'px'
				}
			}
		},
		methods: {
			leftClick() {
        this.$router.go(-1)
			},
			rightClick () {
				if (this.isOnline) {
					this.$router.push({ name: 'cart', params: { type: 0 } })
				} else {
					this.$router.push({ name: 'signin' })
				}
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
		border-bottom: 1px solid $lineColor;
	}
	.list {
		position: relative;	
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.section {
		margin-bottom: 10px;
	}
	.right-item {
		position: relative;
		display: flex;
		width: auto;
		height: auto;
		padding: 6px;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.ui-cart {
		width: 22px;
		height: 20px;
	}
	.cart-number {
		position: absolute;
		top: -1px;
		right: -5px;
		width: 18px;
		height: 14px;
		line-height: 14px;
	}
</style>
