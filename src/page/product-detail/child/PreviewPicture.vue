<!-- PreviewPicture.vue -->
<template>
	<div class="preview-picture">
		<div class="picture-header" v-show='isShowHeader'>
			<span v-on:click='closeModel()'>{{ title }}</span>
			<span>{{currentIndex +1}} / {{ data.length }}</span>
		</div>

		<div class="picture-body">
			<mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :default-index="currentIndex" class='ui-common-swiper' :prevent=false :stop-propagation=true>
			  	<mt-swipe-item v-for="(item,index) in data" v-bind:key="index">
			  		<img v-bind:src="item.thumb" v-on:click='showHeader($event)'>
			  	</mt-swipe-item>
			</mt-swipe>
		</div>

		<div class="picture-footer" v-if='indicatorArray.length > 0'>
			<div class="ui-indicator">
				<div class="indicator-item" v-for='(item,index) in indicatorArray' v-bind:class="{'active': item.index == currentIndex}"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				indicatorArray: [],
				isShowHeader: true
			}
		},
		props: ['data', 'currentIndex', 'title'],
		created(){
			this.buildSwipeIndicators();
		},
		methods: {
			...mapMutations({
				change: 'changeStatus',
				hideCommodity: 'setIsHideCommodity'
			}),
			buildSwipeIndicators() {
				let photos = this.data;
				for (let i = 0, len = photos.length-1; i <= len; i++) {
					photos[i].index = i;
					this.indicatorArray.push(photos[i]);
				}
			},
			handleChange(index) {
				this.currentIndex = index;
				this.isShowHeader = false;
			},
			closeModel() {
				this.$parent.$emit('close-preview-picture');
				this.change(false);
				this.hideCommodity(false);
			},
			showHeader(ev) {
				ev.preventDefault();
				ev.stopPropagation();
				this.isShowHeader = !this.isShowHeader;
			}
		}
	}
</script>

<style lang='scss'>
	.preview-picture {
		position: fixed;
		width: 100%;
		height: 100%;
		background: #000;
		top: 0px;
		.picture-header{
			height: 44px;
		    background-color: #fff;
		    display: flex;
		    justify-content: center;
		    align-content: center;
		    align-items: center;
		    position: fixed;
		    width: 100%;
		    top: 0px;
		    span{
		    	font-size: 14px;
		    	font-family: 'PingFangSC';
		    	font-weight: normal;
		    	&:first-child {
		    		cursor: pointer;
		    		position: absolute;
    				left: 15px;
    				background: url('../../../assets/image/change-icon/back@2x.png') no-repeat 0px center;
    				background-size: 24px;
    				display: inline-block;
    				padding-left: 30px;
    				height: 44px;
    				line-height: 44px;
		    	}
		    }
		}
		.picture-body {
			height: 100%;
			width: 100%;
			display: flex;
			display: -webkit-flex;
			display: -moz-flex;
			justify-content: center;
			align-content: center;
			align-items: center;
		}
		.picture-footer {
			position: absolute;
			bottom: 10px;
			width: 100%;
			.ui-indicator {
				display: flex;
				display: -webkit-flex;
				display: -moz-flex;
				width: 100%;
				border: 1px solid;
				justify-content: center;
				align-content: center;
				align-items: center;
				.indicator-item {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #EFEFF4;
					margin-left: 10px;
					&.active {
						background-color: #EF3338;
					}
				}
			}
		}
	}
</style>
