<!-- ProductListFilter.vue -->
<template>
	<div class="ui-product-filter">
		<ul class="filter-list">
			<li class="item"
				v-for='(item, index) in SORTKEY'
				v-bind:key='item.id'
				v-on:click='setActiveSortkey(item, index)'
				v-bind:class="{'sortactive': item.id == currentSortKey.id, 'sortnormal' : item.id != currentSortKey.id}">
				<a v-if='!item.isMore'>{{item.name}}</a>
				<a v-if='item.isMore'>{{sort.name}}</a>
				<img src="../../../assets/image/change-icon/triangle_click@2x.png" v-if='item.isMore'>
			</li>
		</ul>

		<div class="sort-model" v-if='isShowMore' >
			<div v-for='(item, index) in childSort' v-bind:key='item.id' v-on:click='getSortChild(item)' v-bind:class="{'active': item.id == sort.id}">
				<a>{{item.name}}</a>
				<img src="../../../assets/image/change-icon/c1_choose@2x.png" v-if='item.id == sort.id'>
				<!-- <img src="../../../assets/image/change-icon/d1-yes@2x.png" v-if='item.id == sort.id'> -->
			</div>
		</div>
	</div>
</template>

<script>
import { SORTKEY } from '../static'
import { mapState, mapMutations } from 'vuex';
export default {
	data(){
		return {
			SORTKEY: SORTKEY,  //排序数据
			currentSortKey: {},  //当前选中的排序
			childSort: [],  //综合筛选
			sort: {},  //综合筛选子集
			isShowMore: false, // 是否显示筛选模态框
			isFrist: true //是否是第一次点击
		}
	},
	created(){
		this.currentSortKey = SORTKEY[0];
		this.childSort = this.currentSortKey.child;
		this.sort = this.childSort[0];
	},

	watch: {},

	computed: mapState({
		isSearch: state => state.product.isSearch
	}),

	methods: {
		...mapMutations({
			isShowProductModel: 'changeIsShowProductModel',
			changeSearch: 'changeSearch'
		}),

		/*
		 * closeFiler: 关闭下拉筛选模态框
		 */
		closeFiler() {
			this.isShowMore = false;
			this.isShowProductModel(this.isShowMore);
		},

		/*
		* isShowDroupMenu: 点击显示下拉框， 并且显示模态框
		*/
		isShowDroupMenu(){
			let item = this.currentSortKey;
			if (item.isMore) {
				this.isShowMore = true;
			} else {
				this.isShowMore = false;
			}
			this.isShowProductModel(this.isShowMore);
		},

		/*
		 * setActiveSortkey: 点击切换数据并设置选中的样式
		 * @param: item 当前选中的item
		*/
		setActiveSortkey(item, index) {
			this.currentSortKey = item;
			if (item.isMore) {
				if (this.isFrist) {
					this.isShowMore = !this.isShowMore;
					this.isShowProductModel(this.isShowMore);
				} else if( !this.isFrist && !this.isShowMore){
					this.getValue();
					this.isFrist = true;
				}
			} else {
				this.isFrist = false;
				this.closeFiler();
				this.getValue();
			}
		},

		/*
		 * getValue: 向父级组件发送改变列表事件， 并传递当前的sort_key， sort_value
		*/
		getValue(){
			let data = this.getSortValue();
			this.$parent.$emit('change-list', data);
		},

		/*
		 *  getSortValue: 获取排序值
		 */
		getSortValue() {
			let sort = this.currentSortKey,
				value = {'sort_key': '', 'sort_value':''};
			if (sort.isMore) {
				value.sort_key = this.sort.key;
				value.sort_value = this.sort.value;
			} else {
				value.sort_key = sort.key;
				value.sort_value = sort.value;
			}
			return value;
		},

		/*
		 *  getSortChild: 获取综合筛选的子集， 关闭父级的阴影模态框， 关闭子集， 获取列表数据
		 *  @param: item 模态框的item
		 */
		getSortChild(item){
			this.isShowProductModel(false);
			this.sort = item;
			this.isShowMore = !this.isShowMore;
			this.getValue();
		}
	}
}
</script>

<style scoped lang='scss'>
	.ui-product-filter {
		width: auto;
		ul.filter-list{
			display: flex;
			width: auto;
			justify-content: space-around;
			align-content: center;
    		align-items: center;
    		border: 0px;
    		border-bottom: 1px solid #E8EAED;
    		li{
    			font-size: 14px;
    			color: #4E545D;
    			border-bottom: 2px solid transparent;
    			position: relative;
    			flex-basis: 100px;
				text-align: center;
				height: 42px;
			    padding: 0px;
			    line-height: 42px;
			    a {
			    	height: 42px;
			    	display: inline-block;
			    }
				img {
					height: 4px;
				    width: 8px;
				    vertical-align: middle;
				}
    		}
    		li.sortactive {
    			border-bottom-color: #F23030;
    			a {
    				color: #F23030;
    			}
    		}
    		li.sortnormal {
    			border-bottom-color: transparent;
    			a {
    				color: #4E545D;
    			}
    		}
		}
		.sort-model {
			position: absolute;
			left: 0px;
			width: 100%;
			z-index: 10;
			div {
				color: #4E545D;
				padding: 15px;
				font-size: 13px;
				font-family: 'PingFangSC';
				background-color: #fff;
				margin: 0px;
				border-bottom: 1px solid #E8EAED;
				cursor: pointer;
				display: flex;
				width: auto;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				img {
					float: right;
					width: 16px;
					height: 16px;
				}
				&.active {
					color: #F23030;
				}
			}
		}
	}
</style>
