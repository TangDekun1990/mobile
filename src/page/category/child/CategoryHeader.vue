<!-- CategoryHeader.vue -->
<template>
	<div class="ui-category-header">
		<h3>分类</h3>
		<img src="../../../assets/image/change-icon/b0_search@2x.png" v-on:click='goState()'>
	</div>
</template>

<script>
	export default {
		data(){
			return{}
		},
		methods: {
			goState() {
				this.$router.push('/search');
			}
		}
	}
</script>

<style scoped lang='scss'>
	.ui-category-header {
		@include wh(auto, 44px);
	    display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
	    justify-content: space-between;
	    align-items: center;
	    padding: 0px 15px;
	    h3 {
			@include sc($mainFontSize, $subFontColor);
			flex-basis: 100%;
			text-align: center;
	    }
	    img {
		    width: 20px;
		    height: 20px;
		    cursor: pointer;
	    }
	}
</style>
