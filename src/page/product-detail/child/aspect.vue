<template>
	<div class="ui-detail" v-if="detailInfo">
		<v-aspect-detail :url="detailInfo.intro_url" :unqie="detail" v-if='detailInfo'></v-aspect-detail>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import detail from './Detail';
	export default {
		data(){
			return{
				detail: 'detail'
			}
		},
		components: {
			'v-aspect-detail': detail
		},
		computed: mapState({
			detailInfo: state => state.detail.detailInfo
		}),
		methods: {
		}

	}
</script>

<style lang="scss" scoped>
	.ui-detail {
		height: 100%;
		overflow: auto;
	}
</style>
