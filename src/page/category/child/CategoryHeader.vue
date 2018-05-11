<!-- CategoryHeader.vue -->
<template>
	<mt-header class="header" title="分类">
		<header-item v-if="isShowBack" slot="left" isBack v-on:onclick="leftClick"></header-item>
    <header-item slot="right" :icon="require('../../../assets/image/change-icon/b0_search@2x.png')" v-on:onclick="goState()" :minIcon="true"></header-item>
  </mt-header>
</template>

<script>
	import { Header } from 'mint-ui'
	import { HeaderItem } from '../../../components/common'
	export default {
		data(){
			return{}
		},
		computed: {
			isShowBack () {
				let isFromHome = this.$route.params.isFromHome
				if (isFromHome) {
					return true
				}
				return false
			}
		},
		methods: {
			leftClick() {
        this.$router.go(-1)
			},
			goState() {
				this.$router.push('/search');
			}
		}
	}
</script>

<style scoped lang='scss'>
  .header {
		@include header;
		border-bottom: 0.5px solid #E8EAED;
  }
</style>
