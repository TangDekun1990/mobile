<!-- CategoryHeader.vue -->
<template>
	<div class="ui-category-header">
		<h3>分类</h3>
		<img src="../../../assets/image/change-icon/b0_search@2x.png">
	</div>
</template>

<script>
	export default {
		data(){
			return{}
		}
	}
</script>

<style scoped lang='scss'>
	.ui-category-header {
		@include wh(auto, 44px);
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    position: relative;
	    h3 {
			@include sc($mainFontSize, $subFontColor);
	    }
	    img {
	    	position: absolute;
		    right: 15px;
		    width: 13px;
		    height: 13px;
		    cursor: pointer;
	    }
	}
</style>
