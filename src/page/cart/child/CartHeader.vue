<template>
	<div class="cart-header-wrapper ui-commmon-header">
		<img src="../../../assets/image/change-icon/back@2x.png" v-if="!issShowTabbar" @click="goBack()">
		<h3>购物车</h3>
		<span @click="changeFinishStatus()" v-if="!isFinish && !isEmpty">编辑</span>
		<span @click="changeFinishStatus()" v-if="isFinish">完成</span>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data(){
			return {
				isFinish: false //是否是完成状态 编辑-完成false  ： 完成 - 编辑 true  s - true - false
			}
		},

		props: {
			issShowTabbar: {
				type: Number,
				default: 0
			},
			isEmpty: {
				type: Boolean,
				default: false
			}
		},

		computed:{},

		methods: {

			/*
			 * goBack: 返回上一页
			 */
			goBack() {
				this.$router.go(-1);
			},

			/*
			 *  changeFinishStatus: 点击编辑和完成向父组件发送事件， 编辑状态， 列表默认全选， 完成状态默认全部不选中, 并改变是否是完成的状态
			 */
			changeFinishStatus() {
				this.isFinish = !this.isFinish;
				let data = {'isFinish': this.isFinish};
				this.$parent.$emit('change-list-selected', data);
			}
		}
	}
</script>

<style lang='scss' scoped>
	.cart-header-wrapper {
		position: fixed;
		width: -webkit-fill-available;
		span {
			position: absolute;
			font-size:15px;
			color:rgba(78,84,93,1);
			display: inline-block;
			height: 44px;
			line-height: 44px;
			top: 0px;
			right: 15px;
		}
	}
</style>
