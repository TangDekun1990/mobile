<!-- DetailHeader.vue -->
<template>
	<div class="ui-detail-header">
		<img src="../../assets/image/change-icon/back@2x.png">
		<div v-for="(item, index) in data" v-bind:class="{'active': index == currentIndex}" v-on:click='changeEvent(index)'>{{ item.name}}</div>
		<img src="../../assets/image/change-icon/b0_share@2x.png">
	</div>
</template>

<script>
import { header } from './static';
export default {
	data(){
		return {
			data: header,
			currentIndex: 0
		}
	},
	methods: {
		changeEvent(index) {
			this.currentIndex = index;
			this.$parent.$emit('nav-changed', this.currentIndex);
		},
		goBack() {
			this.$router.go(-1);
		}
	}
}

</script>

<style lang='scss'>
	.ui-detail-header {
		height:44px;
		background:rgba(255,255,255,1);
		box-shadow: 0px -0.5px 0px 0px rgba(232,234,237,1);
		display: flex;
		display: -webkit-flex;
		display: -moz-flex;
		font-family: 'PingFangSC';
		color: #55595F;
		font-size: 17px;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		position: fixed;
	    flex-basis: 100%;
	    width: 100%;
	    z-index: 10;
		img {
			width: 24px;
			height: 24px;
			cursor: pointer;
			&:first-child {
				padding-left: 10px;
			}
			&:last-child {
				padding-right: 10px;
			}
		}
		div {
    		line-height: 42px;
    		border-bottom: 2px solid transparent;
    		cursor: pointer;
			&.active {
				color: #FC2E39;
				border-bottom: 2px solid #FC2E39;
			}
		}
	}
</style>
