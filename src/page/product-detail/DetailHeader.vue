<!-- DetailHeader.vue -->
<template>
	<div class="ui-detail-header">
		<img src="../../assets/image/change-icon/back@2x.png" v-on:click='goBack()'>
		<div class="navbar-wrapper">
			<div v-for="(item, key) in data" v-bind:class="{'navbar_active': key == index}" v-on:click='changeEvent(key)'>{{item.name}}</div>
		</div>
	</div>
</template>

<script>
import { header } from './static';
import { mapState, mapMutations } from 'vuex'
export default {
	data(){
		return {
			data: header
		}
	},

	computed: {
		...mapState({
			index: state => state.detail.index
		})
	},

	created(){},

	methods: {
		...mapMutations({
			'changeIndex': 'changeIndex',
		}),

		changeEvent(index) {
			this.changeIndex(index);
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
		border-bottom: 0.5px solid rgba(232,234,237,1);
		color: #55595F;
		font-size: 17px;
		width: auto;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	    flex-basis: auto;
	    z-index: 1;
	    position: fixed;
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
	    		margin-right: 48px;
	    		color: #55595F;
				&.navbar_active {
					color: #FC2E39;
					border-bottom: 2px solid #FC2E39;
				}
				&:last-child {
					margin-right: 0px;
				}
				&:focus {
					outline: none;
				}
			}
		}
	}
</style>
