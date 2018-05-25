<!-- Concat.vue -->
<template>
	<div class="ui-concat-wrapper ui-detail-common zhiCustomBtns" v-if="detailInfo" @click="openZhiChi()">
		<div class="header">
			<p>点击联系客服</p>
			<img src="../../../assets/image/change-icon/e5_service@2x.png">
		</div>
	</div>
</template>

<script>
 	import { mapState, mapMutations } from 'vuex';
	export default {
		data () {
			return{}
		},

		computed: {
			...mapState({
		      	detailInfo: state => state.detail.detailInfo,
		      	user: state => state.auth.user,
		      	isOnline: state => state.auth.isOnline
		    })
		},

		watch: {
			detailInfo: function(value) {
			}
		},

		mounted() {
			this.$nextTick( () => {});
		},

		created(){},

		methods: {
			openZhiChi() {
				if (this.isOnline) {
					this.utils.openZhichiManager(this.detailInfo, '', this.user, this.user.id);
				} else {
					this.$router.push({'name': 'signin'});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ui-concat-wrapper {
		p{
			font-size:16px;
			font-family:PingFangSC-Regular;
			color:rgba(78,84,93,1);
			line-height:20px;
			padding: 0px;
			margin: 0px;
		}
		img {
			width:16px;
			height:16px;
			cursor: pointer;
		}
	}
</style>
