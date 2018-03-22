<template>
	<div class="search-wrapper">
		<search-header ref='header' :value="keywords"></search-header>
		<div class="search-body">
			<div class="list current-search" v-if='currenKeywords.length > 0'>
				<div class="list-header">
					<span>最近搜索</span>
					<img src="../../assets/image/change-icon/b1_delete@2x.png" v-on:click='deleteCurrent()'>
				</div>
				<ul>
					<li class="item" v-for="item in currenKeywords" v-on:click='getKey(item)'>{{item}}</li>
				</ul>
			</div>
			<div class="list hot-wrapper">
				<div class="list-header">
					<span>热门搜索</span>
				</div>
				<ul>
					<li class="item" v-for='(item, index) in hotKeywords' v-bind:key='index' v-on:click='getKey(item)'>{{ item.content}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import searchHeader from './child/SearchHeader';
	import { getKeywords } from '../../api/network/search'
	export default {
		data(){
			return{
				hotKeywords: [],
				currenKeywords: [],
				keywords:''
			}
		},
		components: {
			searchHeader
		},
		created(){
			this.getHotKeywords();
			this.getCurrentKey();
		},
		methods: {
			getHotKeywords() {
				getKeywords().then(res => {
					this.hotKeywords = Object.assign([], res.keywords, this.hotKeywords);
				});
			},
			getKey(item) {
				if (item.content) {
					this.keywords = item.content;
				} else {
					this.keywords = item;
				}
			},
			deleteCurrent() {
				this.utils.save('keyword', []);
				this.currenKeywords = this.utils.fetch('keyword');
			},
			getCurrentKey() {
				this.currenKeywords = this.utils.fetch('keyword');
			}
		}
	}
</script>

<style lang='scss' scoped>
	.search-wrapper{
		height: auto;
		width: auto;
		background-color: #F0F2F5;
		.search-body {
			padding: 15px;
			div.list {
				margin-bottom: 30px;
				.list-header {
					display: flex;
		    		justify-content: space-between;
		    		align-content: center;
		    		align-items: center;
					span {
						color: #4E545D;
						font-size: 14px;
						font-family: 'PingFangSC';
						background: url('../../assets/image/change-icon/b1_history@2x.png') no-repeat left center;
						background-size: 16px;
		    			padding-left: 25px;
		    			align-self: flex-end;
					}
					img {
						width: 24px;
						height: 24px;
						cursor: pointer;
					}
				}
				ul {
		    		display: flex;
		    		padding-top: 13px;
		    		flex-wrap: wrap;
		    		li {
		    			padding: 8px;
		    			background-color: #fff;
		    			color: #4E545D;
		    			font-size: 12px;
		    			font-family: 'PingFangSC';
		    			border:  1px solid #FDFDFD;
		    			margin-right: 15px;
		    			margin-bottom: 15px;
		    			cursor: pointer;
		    		}
		    	}
			}
			div.hot-wrapper {
				.list-header{
					span{
						background: url('../../assets/image/change-icon/b1_hot@2x.png') no-repeat left center;
						background-size: 16px;
					}
				}
			}
		}
	}
</style>
