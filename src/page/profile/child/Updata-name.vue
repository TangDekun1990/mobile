<!-- Updata-name.vue 修改昵称 -->
<template>
	<div class="ui-update-name">
		<div class="common-update-avatar">
			<span>修改昵称</span>
			<span class="info">{{user.nickname}}</span>
		</div>

		<mt-popup v-model="popupVisible" position="right">
		  	<div>
		  		<mt-header class="header" title="个人资料">
					<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack"></header-item>
				</mt-header>
		  	</div>
		</mt-popup>

	</div>
</template>

<script>
 	import { HeaderItem } from '../../../components/common/'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return{
				popupVisible: false

			}
		},

		computed: {
			...mapState({
				user: state => state.auth.user,
				config: state => state.config.config
			}),
		},

		components: {

		},

		methods: {
			...mapMutations({
				clearToken: 'signout',
				signin: 'signin'
			}),

			/*
			 *  返回上一页
			 */
			goBack() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
