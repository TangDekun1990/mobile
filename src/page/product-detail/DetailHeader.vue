<!-- DetailHeader.vue -->
<template>
	<div class="ui-detail-header">
		<img src="../../assets/image/change-icon/back@2x.png" v-on:click='goBack()'>
		<div v-for="(item, index) in data" v-bind:class="{'active': index == currentIndex}" v-on:click='changeEvent(index)'>{{ item.name}}</div>
		<!-- <img src="../../assets/image/change-icon/b0_share@2x.png"> -->
	</div>
</template>

<script>
import { header } from './static';
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			data: header,
			currentIndex: 0
		}
	},
	computed: mapState({
		currentSwiperIndex: state => state.detail.currentSwiperIndex
	}),
	created(){
		this.currentIndex = this.currentSwiperIndex;
	},
	watch: {
		currentSwiperIndex: function(index) {
			this.currentIndex = index;
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
		padding: 0px 20px;
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
	    flex-basis: auto;
	    width: auto;
	    z-index: 1;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    right: 0px;
		img {
			width: 24px;
			height: 24px;
			cursor: pointer;
			/*&:first-child {
				padding-left: 10px;
			}*/
			/*&:last-child {
				padding-right: 10px;
			}*/
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
