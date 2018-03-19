<template>
	<div class="search-wrapper">
		<form action>
			<input type="search" placeholder="请输入您要搜索的商品">
			<span>取消</span>
		</form>
		<div class="search-body">

			<div class="list current-search">
				<div class="list-header">
					<span>最近搜索</span>
					<img src="../../assets/change-icon/b1_delete@2x.png" v-on:click='deleteCurrent()'>
				</div>
				<ul>
					<li class="item">yfgrygfry</li>
					<li class="item">yfgrygfry</li>
				</ul>
			</div>
			
			<div class="list hot-wrapper">
				<div class="list-header">
					<span>热门搜索</span>
				</div>
				<ul>
					<li class="item" v-for='(item, index) in hotKeywords' v-bind:key='index' v-on:click='getCurrentKey(item)'>{{ item.content}}</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	import { getData} from '../../service/search'
	export default {
		data() {
			return {
				hotKeywords: [],
				currenKeywords: [],
				keywords:''
			}
		},
		created(){
			this.getKeywords();
		},
		methods: {
			getKeywords() {
				getData().then(res => {
					this.hotKeywords = res.keywords;
				})
			},
			deleteCurrent() {
				if (this.currenKeywords.length > 0) {
					this.currenKeywords = [];
				}
			},
			getCurrentKey(item) {
				this.keywords = item.name;
				this.goState(this.keywords);
			},
			goState(key) {
				// let params = {'keywords': this.keywords};
                this.$router.push({
                	'name': 'product', 
                	'params':{
                		'category': '',
                		'brand': '',
                		'shop': '',
                		'keywords': key
                	}
                });
			}
		}
	}
	
</script>

<style lang='scss' scoped>
	.search-wrapper{
		height: 100vh;
		width: auto;
		background-color: #F0F2F5;
		form {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			background-color: #FFFFFF;
			padding: 6px 15px;
			input {
				flex-basis: 200px;
				background-color: #E9ECF0;
				border-radius: 16px;
				color: #A4AAB3;
				font-size: 14px;
				padding: 9px 15px;
				border: 0px;
				&:focus {
					outline: none;
					outline-offset: 0px;
				}
			}
			span {
				font-size: 15px;
				color: #4E545D;
			}
		}
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
						background: url('../../assets/change-icon/b1_history@2x.png') no-repeat left center;
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
						background: url('../../assets/change-icon/b1_hot@2x.png') no-repeat left center;
						background-size: 16px;
					}
				}
			}
		}
	}
	::-webkit-search-cancel-button {
		display: none;
	}
</style>