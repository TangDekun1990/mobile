<template>
	<div class="container">
		<home-header class="header"></home-header>
		<div class="list">
			<card-group
				class="section"
				v-for="(item, index) in getCardGroups"
				:key="index"
				:item="item">
			</card-group>
		</div>
		<back-top v-if="isshowBacktop" :target="target" :bottom="60"></back-top>
	</div>
</template>

<script>
	import { HeaderItem } from '../../components/common'
	import { Header, Indicator, Toast } from 'mint-ui'
	import { cardpageGet } from '../../api/network/cardpage'
	import CardGroup from '../cardpage/group/CardGroup'
	import HomeHeader from './child/HomeHeader';
	import BackTop from '../../components/common/BackTop'
	export default {
		name: 'Home',
		data() {
			return {
				cardpage: null,
				isshowBacktop: false
			}
		},
		components: {
			CardGroup,
			HomeHeader,
			BackTop
		},
		mounted() {
			var element = this.$el;
			var that = this;
			var dom = document.querySelector('.list');
			if (dom) {
				dom.addEventListener('scroll', (event) => {
		        	let params = {
		        		'top': dom.scrollTop,
		        		'height': dom.scrollHeight
		        	};
		        	if (params.top >= 100) {
		        		this.isshowBacktop = true;
		        	} else {
		        		this.isshowBacktop = false;
		        	}
	        	});
			}
			this.target = document.querySelector('.list');
		},
		created: function () {
			// Indicator.open()
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
		height: auto;
    	position: absolute;
	    bottom: 45px;
	    top: 0px;
	    width: 100%;
		// display: flex;
		// flex-direction: column;
		// justify-content: flex-start;
		// align-items: stretch;
		// background-color: $mainbgColor;
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
		position: absolute;
		top: 44px;
		bottom: 0px;
		overflow-y: auto;
		width: 100%;
		// margin-top: 44px;
		// margin-bottom: 50px;
		// display: flex;
		// flex-direction: column;
		// justify-content: flex-start;
		// align-items: stretch;
	}
	.section {
		margin-bottom: 10px;
	}
</style>
