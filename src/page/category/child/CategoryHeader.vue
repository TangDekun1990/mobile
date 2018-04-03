<!-- CategoryHeader.vue -->
<template>
	<mt-header class="header" title="分类">      
    <header-item slot="right" :icon="require('../../../assets/image/change-icon/b0_search@2x.png')" v-on:onclick="goState()"></header-item>
  </mt-header>
</template>

<script>
	import { Header } from 'mint-ui'
	import { HeaderItem } from '../../../components/common'
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
  .header {
		@include header;
		border-bottom: 1px solid $lineColor;
  }
</style>
