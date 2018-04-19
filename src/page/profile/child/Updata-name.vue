<!-- Updata-name.vue 修改昵称 -->
<template>
	<div class="ui-update-name">
		<div class="common-update-avatar" @click="goStatus()">
			<span>修改昵称</span>
			<span class="info">{{username}}</span>
		</div>
	</div>
</template>

<script>
 	import { HeaderItem } from '../../../components/common/'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return{
				username: ''
			}
		},

		computed: {
			...mapState({
				user: state => state.auth.user
			}),
		},

		created(){
			this.setUserName();
		},

		methods: {
			goStatus() {
				this.$router.push({'name': 'updateinfo', 'params': {'type': 1}})
			},

			setUserName() {
				this.username = this.user.nickname ? this.user.nickname : this.user.username
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
