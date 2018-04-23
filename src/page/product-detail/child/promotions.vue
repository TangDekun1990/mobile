<!-- promotions.vue -->

<template>
	<div class="ui-promotions-wrapper ui-detail-common" v-if="detailInfo && detailInfo.promos && detailInfo.promos.length > 0">
		<!-- header -->
		<div class="promotions-header header" v-on:click='openPopup()'>
			<h3>促销信息{{detailInfo.promos.length}}</h3>
			<img src="../../../assets/image/change-icon/enter@2x.png">
		</div>
		<!-- 展示促销信息 -->
		<div class="promotions-body">
			<div class="body-list" v-for="(item, index) in detailInfo.promos" :key="index">
				<span class="name">{{ item.name }}</span>
				<span class="title">{{item.promo}}</span>
				<div class="content">
					<p>{{item.desc}}</p>
				</div>
			</div>
		</div>

		<!-- body -->
		<mt-popup v-model="popupvisible" position="bottom">
			<div class="detail-promotions">
				<div class="header">
					<h3>订单促销</h3>
					<img src="../../../assets/image/change-icon/close@2x.png" v-on:click="close()">
				</div>
				<div class="promotions-body">
					<div class="body-list" v-for="(item, index) in detailInfo.promos" :key="index">
						<span class="name">{{ item.name }}</span>
						<span class="title">{{item.promo}}</span>
						<div class="content">
							<p>{{item.desc}}</p>
						</div>
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
			},

			close() {
				this.popupvisible = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.ui-promotions-wrapper {
	height: auto;
	.promotions-header {
		border-bottom: 1px solid #E8EAED;
		height: 50px;
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
	.promotions-body {
		background:rgba(255,255,255,1);
		padding: 12px 0px;
		.body-list {
			span.name{
				background:rgba(255,255,255,1);
				border-radius: 2px ;
                font-size:10px;
                color:rgba(243,68,68,1);
                line-height:10px;
                padding: 3px 6px;
                display: inline-block;
    			border: 1px solid #F34444;
    			margin-right: 7px;
			}
			span.title{
				font-size:12px;
				color:rgba(71,76,82,1);
				line-height:12px;
			}
			div.content{
				background:rgba(255,244,244,1);
				border-radius: 1px ;
				margin: 10px 0px 0px 0px;
				p {
					padding:0px;
					margin:0px;
					font-size:11px;
					font-family:PingFangSC-Light;
					color:rgba(243,68,68,1);
					line-height:16px;
					display: -webkit-box;
				    -webkit-box-orient: vertical;
				    -webkit-line-clamp: 2;
				    overflow: hidden;
				}
			}
		}
	}

	.detail-promotions {
		padding: 0px 12px;
		div.header {
			position: relative;
			h3{
	    		font-size:15px;
				color:rgba(78,84,93,1);
				line-height:20px;
				padding: 0px;
				margin: 0px;
				height: 44px;
				line-height: 44px;
				text-align: center;
				border-bottom: 1px solid rgba(232,234,237,1);
	    	}
	    	img {
				position: absolute;
			    top: 14px;
			    right: 10px;
			    width: 16px;
			    height: 16px;
	    	}
		}
	}
}
</style>
