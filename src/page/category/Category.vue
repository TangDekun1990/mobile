<template>
	<div class="category">
		<category-header></category-header>
		<category-body></category-body>
		<tab-bar></tab-bar>
	</div>
</template>

<script>
	import categoryHeader from './child/CategoryHeader';
	import categoryBody from './child/CategoryBody';
    import tabBar from '../../components/common/Tabbar';
    export default {
        components: {
        	categoryHeader,
        	categoryBody,
            tabBar
        }
    }
</script>

<style scoped lang='scss'>
</style>


