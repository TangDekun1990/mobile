<!-- SearchHeader.vue -->
<template>
	<div class="ui-search-header">
		<form v-on:submit="search()" action="#">
			<input type="search" placeholder="请输入您要搜索的商品" v-model="keywords">
			<span>取消{{this.value}}</span>
		</form>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				keywords: ''
			}
		},
		props:['value'],
		watch: {
			value: function (newValue, oldValue) {
				if (this.value) {
					this.keywords = this.value;
					this.search();
				}
			}
		},
		methods: {
			search() {
				let params = {'keywords': this.keywords};
				this.$router.push({'name': 'product', 'params': params});
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
	}
</style>
