<!-- SearchHeader.vue -->
<template>
	<div class="ui-search-header">
		<form v-on:submit.prevent="search($event)" action="#">
			<input type="search" placeholder="请输入您要搜索的商品" v-model="keywords">
			<span v-on:click='cancel()'>取消</span>
		</form>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				keywords: this.keyword ? this.keyword : ''
			}
		},
		props:['keyword'],
		methods: {
			// 分类列表进入到搜索，完成后跳转到商品列表页面
			search(e, value) {
				if (value) {
					this.keywords = value;
				}
				let params = {'keywords': this.keywords};
				this.$router.push({'name': 'product', 'params': params});
				if (e) {
					this.utils.stopPrevent(e);
				}
			},
			// 取消返回上一级
			cancel() {
				this.$router.push({'name': 'category'});
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
			input {
				flex-basis: 80%;
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
	}
</style>
