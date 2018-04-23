<!-- promotions.vue -->

<template>
	<div class="ui-promotions-wrapper ui-detail-common" v-if="detailInfo && detailInfo.promos && detailInfo.promos.length > 0">
		<!-- header -->
		<div class="promotions-header header" v-on:click='openPopup()'>
			<h3>促销信息</h3>
			<img src="../../../assets/image/change-icon/enter@2x.png">
		</div>

		<!-- body -->
		<mt-popup v-model="popupvisible" position="bottom">
			<div class="promos-list">
				<div class="item">
					<div v-for="(list, index) in detailInfo.promos">
						<!-- <span class="title" v-show="index == 0">{{ item.name}}</span> -->
						<span class="name">{{ list.name }}</span>
						<span class="promo">{{list.promo}}</span>
					</div>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				popupvisible: false  //弹窗位置
			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		methods: {
			...mapMutations({
				setIsHasBottom: 'setIsHasBottom'
			}),

			/*
				openPopup:
			*/
			openPopup(){
				this.popupvisible = !this.popupvisible;
			}
		}
	}
</script>

<style lang="scss" scoped>
.ui-promotions-wrapper {
	.promotions-header {
		h3 {
			font-size:16px;
			color:rgba(78,84,93,1);
			padding: 0px;
    		margin: 0px;
		}
		img {
			width:5px;
			height:10px;
		}
	}
}
</style>
