<!-- DetailHeader.vue -->
<template>
	<div class="ui-detail-header">
		<img src="../../assets/image/change-icon/back@2x.png" v-on:click='goBack()'>
		<div class="navbar-wrapper">
			<div v-for="(item, index) in data" v-bind:class="{'active': index == currentIndex}" v-on:click='changeEvent(index)'>{{ item.name}}</div>
		</div>
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
			currentIndex: this.$store.state.detail.currentSwiperIndex
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
		...mapMutations({
			'setSwiperIndex': 'setCurrentSwiperIndex',
			saveNumber: 'saveNumber',
			saveInfo: 'saveDetailInfo',
			saveChooseInfo: 'saveChooseInfo'
		}),

		changeEvent(index) {
			this.setSwiperIndex(index);
		},

		goBack() {
			this.$router.go(-1);
		}
	}
}

</script>

<style lang='scss'>
	.ui-detail-header {
		padding: 0px 9px;
		height:44px;
		background:rgba(255,255,255,1);
		box-shadow: 0px -0.5px 0px 0px rgba(232,234,237,1);
		color: #55595F;
		font-size: 17px;
		width: auto;

		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	    flex-basis: auto;

	    z-index: 1;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    right: 0px;
		img {
			width: 24px;
			height: 24px;
			cursor: pointer;
			position: absolute;
			left: 9px;
			top: 10px;
		}
		div.navbar-wrapper {
			div {
	    		line-height: 42px;
	    		border-bottom: 2px solid transparent;
	    		display: inline-block;
	    		cursor: pointer;
	    		margin-right: 48px;
				&.active {
					color: #FC2E39;
					border-bottom: 2px solid #FC2E39;
				}
				&:last-child {
					margin-right: 0px;
				}
			}
		}
	}
</style>
