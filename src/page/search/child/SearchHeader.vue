<!-- SearchHeader.vue -->
<template>
	<div class="ui-search-header">
		<form v-on:submit.prevent="search($event, keywords)" action="#">
			<div>
				<input type="search" placeholder="请输入您要搜索的商品" v-model="keywords">
				<img src="../../../assets/image/change-icon/e2_delete@2x.png" @click="clear()" v-if="keywords.length > 0">
			</div>
			<span v-on:click='cancel()'>取消</span>
		</form>
	</div>
</template>

<script>
   import { Toast, Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				keywords: this.keyword ? this.keyword : '',
				currenKeywords: this.utils.fetch('keyword')
			}
		},
		props:['keyword'],
		methods: {
			// 分类列表进入到搜索，完成后跳转到商品列表页面
			search(e, value) {
				if (value.replace(/\s+/g,"").length <= 0) {
					Toast("请输入您要搜索的关键字");
					return false;
				} else {
					this.keywords = value;
				}
				if (value) {
					this.currenKeywords.push(value);
					let data = this.utils.arrayFilter(this.currenKeywords);
					this.utils.save('keyword', data);
				}
				this.$router.push({'name': 'product', 'query': {'keywords': this.keywords}});
				if (e) {
					this.utils.stopPrevent(e);
				}
			},

			// 取消返回上一级
			cancel() {
				let isFromHome = this.$route.params.isFromHome
				if (isFromHome) {
					this.$router.go(-1)
				} else {
					this.$router.push({'name': 'category'});
				}				
			},

			clear() {
				this.keywords = '';
			}

		}
	}
</script>

<style scoped lang="scss">
	.ui-search-header{
		form {
			display: flex;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			background-color: #FFFFFF;
			padding: 6px 15px;
			div{
				flex-basis: 80%;
				position: relative;
				input {
					width: 100%;
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
				img{
					position: absolute;
					top: 9px;
					right: 5px;
					width: 16px;
					height: 16px;
					line-height: 16px;
					cursor: pointer;
					bottom:9px;
				}
			}
			span {
				font-size: 15px;
				color: #4E545D;
			}
		}
	}
</style>
